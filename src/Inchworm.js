
import fetch from 'cross-fetch'
import { Observable, Subject } from 'rxjs'

import { AnchorTagSubject, LinkTagSubject, ScriptTagSubject, StyleTagSubject } from './observables'
import { onPageLoad } from './observers'

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

		// setup parse observable api - allows end user to hook into these
		this.anchorTags = new AnchorTagSubject()
		this.linkTags = new LinkTagSubject()
		this.scriptTags = new ScriptTagSubject()
		this.styleTags = new StyleTagSubject()
		this.observables = [
			this.anchorTags,
			this.linkTags,
			this.scriptTags,
			this.styleTags
		]
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
		const contentType = config || config.headers || config.headers['Content-Type']
		switch (contentType) {
			case 'application/javascript':
				fetchObservable.subscribe((content) => this.javascriptFiles.next({url, content}))
				break
			case 'text/css':
				fetchObservable.subscribe((content) => this.stylesheets.next({url, content}))
				break
			default:
				fetchObservable.subscribe((content) => onPageLoad(url, content, this.observables)) // subscribe for internal observers
				fetchObservable.subscribe((content) => this.page.next({url, content})) // subscribe fro external observers
		}
		//return fetchObservable
	}

}