
import fetch from 'cross-fetch'
import { Observable, Subject } from 'rxjs'
import { JSDOM } from 'jsdom'
import { URL } from 'url'

import * as Selectors from './DomSelectors'

export default class Inchworm {

	constructor (config) {
		this.config = config || {}

		// if we should follow urls we parse from the initial document
		this.loadStylesheets = this.config.loadStylesheets || false
		this.loadJavascriptFiles = this.config.loadJavascriptFiles || false

		// save to dir support
		this.saveToDir = this.config.saveToDir || false
		// this.saveHtmlToDir = this.config.saveHtmlToDir || false
		// this.saveStylesheetsToDir = this.config.saveStylesheetsToDir || false
		// this.saveJavascriptFilesToDir = this.config.saveJavascriptFilesToDir || false

		// setup document observable api - allows end user to hook into these
		this.page = new Subject()
		this.stylesheets = new Subject()
		this.javascriptFiles = new Subject()

		// on page load, these observables will trigger by default - allow a user to append to these
		this.pageObservables = [] // Object.values(Selectors)

		// setup parse observable api - allows end user to hook into these
		Object.keys(Selectors).forEach( key => {
			const name = key.replace('Selector', 's')
			this[name] = new Subject()
			this[name].selector = Selectors[key] // eslint-disable-line
			this.pageObservables.push(this[name])
		})
		
		// if config.loadStylesheets = true, load the stylesheet and fire a next for users
		this.linkTags.subscribe(this.onLinkTagObservation.bind(this))
		this.scriptTags.subscribe(this.onScriptTagObservation.bind(this))
	}

	/**
	 * Will load a page using cross-fetch and return an observable stream that a user can chain.
	 * This method also executes internal observables.
	 * 
	 * @param {any} urlOrConfig this is passed directly to cross-fetch
	 * @returns an rxjs Observable
	 */
	crawl (url, config = {}) {
		const fetchPromise = fetch(url, config).then((response) => response.text())
		const fetchObservable = Observable.fromPromise(fetchPromise)
		config.headers = config.headers || {}
		const contentType = config.headers['Content-Type']
		switch (contentType) {
			case 'application/javascript':
				fetchObservable.subscribe((content) => this.javascriptFiles.next({url, content}))
				break
			case 'text/css':
				fetchObservable.subscribe((content) => this.stylesheets.next({url, content}))
				break
			default:
				this.url = new URL(url) // we need to save the url for later if we want to load stylesheets and scripts which dont have an absolute url
				fetchObservable.subscribe((content) => this.onPageLoadObservation(url, content)) // subscribe for internal observers
				fetchObservable.subscribe((content) => this.page.next({url, content})) // subscribe for an external observer
		}
		//return fetchObservable
	}

	/**
	 * After a page is crawled, we end up here with the raw dom for cheerio to parse and create new subjects using 
	 * either the built-in observers or user defined observers.
	 * 
	 * @param {url} url The url of the document that was loaded
	 * @param {string} content A raw string of html
	 * @param {array of observables} observables An array of observables that has a selector function we will use to find specific tags in the html doc
	 */
	onPageLoadObservation (url, content) {
		const { window: { document } } = new JSDOM(content)
		
		this.pageObservables.forEach( observable => {
			Array.apply(null, observable.selector(document)).forEach( e => {
				observable.next((e))
			})
		})
	}

	onLinkTagObservation (linkEl) {
		if (this.loadStylesheets && linkEl.getAttribute('rel') === 'stylesheet') {
			let href = linkEl.getAttribute('href')
			if (href.indexOf('http') === -1) {
				href = this.url.origin + href
			}
			this.crawl(href, { headers: { 'Content-Type': 'text/css' } }) // load the stylesheet
		}
	}

	onScriptTagObservation (scriptEl) {
		const src = scriptEl.getAttribute('src')
		if (this.loadJavascriptFiles && src) {
			let javascriptFileUrl = src
			if (javascriptFileUrl.indexOf('http') === -1) {
				javascriptFileUrl = this.url.origin + javascriptFileUrl
			}
			this.crawl(javascriptFileUrl, { headers: { 'Content-Type': 'application/javascript' } }) // load the javascript files
		}
	}
}