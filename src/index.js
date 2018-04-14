
import fetch from 'cross-fetch'
import { Observable, Subject } from 'rxjs'
import { load } from 'cheerio'

// built in observers
import AnchorTag from './observers/AnchorTag'
export const anchorTag = new AnchorTag()
import LinkTag from './observers/LinkTag'
export const linkTag = new LinkTag()
import ScriptTag from './observers/ScriptTag'
export const scriptTag = new ScriptTag()
import StyleTag from './observers/StyleTag'
export const styleTag = new StyleTag()

/** 
 * Built-in observers that can be added to if needed. 
 */
export const observers = [
	anchorTag,
	linkTag,
	scriptTag,
	styleTag
]

/**
 * Will load a patch using cross-fetch and turn that into an observable stream that a user can hook into 
 * and also for our own internal processing needs
 * 
 * @export loadPage method for loading a new page to crawl
 * @param {any} urlOrConfig this is passed directly to cross-fetch
 * @returns an rxjs Observable
 */
export function loadPage (urlOrConfig) {
	const fetchPromise = fetch(urlOrConfig).then((response) => response.text())
	const fetchObservable = Observable.fromPromise(fetchPromise)
	fetchObservable.subscribe(onPageLoad)
	return fetchObservable
}

/**
 * After a page is crawled, we end up here with the raw dom for cheerio to parse and create new subjects using 
 * either the built-in observers or user defined observers.
 * 
 * @export
 * @param {any} html A raw string of html that was fetched by loadPage
 */
export function onPageLoad (html) {
	const $ = load(html)
	observers.forEach( (observer) => {
		observer.selector($).each( (i, e) => {
			observer.next($(e))
		})
	})
}

