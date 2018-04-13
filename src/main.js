
import fetch from './fetch'
import { Observable, Subject } from 'rxjs'
import { load } from 'cheerio'

const URL = 'https://wookets.github.io'

const stylesheetStream = new Subject()
stylesheetStream.subscribe( (value) => {
	console.log('steam css', value)
})

function pageLoaded (html) {
	let $ = load(html)
	$('link[rel=stylesheet]').each( function (i, e) {
		stylesheetStream.next($(this).attr('href'))
	})
	$('script[src]').each( function (i, e) {
		stylesheetStream.next($(this).attr('src'))
	})
	$('a[href]').each( function (i, e) {
		stylesheetStream.next($(this).attr('href'))
	}) 
}

fetch(URL)
.subscribe(pageLoaded)

