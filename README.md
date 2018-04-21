
# inchworm [![Build Status](https://travis-ci.org/wookets/inchworm.svg?branch=master)](https://travis-ci.org/wookets/inchworm) [![Coverage Status](https://coveralls.io/repos/github/wookets/inchworm/badge.svg)](https://coveralls.io/github/wookets/inchworm)

<a href="http://worldartsme.com/cartoon-inchworm-clipart.html" title="Clipart from WorldArtsMe"><img title="Cartoon Inchworm Clipart" width="350" src="http://worldartsme.com/images/cartoon-inchworm-clipart-1.jpg"/> </a>

This library will crawl a web page using [jsdom](https://github.com/jsdom/jsdom) and produce different observable [rxjs](http://reactivex.io/rxjs/) streams that allow you to subscribe to various page elements, stylesheets and scripts. 

## Installation

For integrated usage where you can add your own subscriptions (observers) to the crawling, install it as a dependency in your node project.

```bash
npm i -S inchworm
```

## Quick Example

```javascript
import Inchworm from './Inchworm'

const worm = new Inchworm()
worm.page.subscribe(({url, content}) => {
	console.log(content) // will spit out the webpage html
})
worm.anchorTags.subscribe( el => {
	console.log(el.getAttribute('href')) // fired for every links on the page
})
worm.crawl('https://wookets.github.io')
```

## Subscribing to Crawler Events

When you crawl() a document, inchworm will load the HTML document into Cheerio and crawl for various (e.g. link, script) tags. When it encounters one of these, it will push an event out to any subscribers. Inchworm passes back to you a Cheerio-wrapped DOM Element. 

### Anchor Tags

```javascript
cont worm = new Inchworm()
// for every anchor tag we find, we emit an observer
worm.anchorTags.subscribe( el => {
	// el is just a DOM element (mdn)[https://developer.mozilla.org/en-US/docs/Web/API/Element]
})
worm.crawl(url)
```

### Image tags

Inline css.

```javascript 
const worm = new Inchworm()
worm.imgTags.subscribe( el => {})
worm.crawl(url)
```
### Link tags

Remember that a <link> tag doesn't automatically mean stylesheet.

```javascript 
const worm = new Inchworm()
worm.linkTags.subscribe( el => {
	if (this.loadStylesheets && linkEl.getAttribute('rel') === 'stylesheet') {
		let href = linkEl.getAttribute('href')
	}
})
worm.crawl(url)
```

### Script tags

Can be an inline script or an external sheet.

```javascript 
const worm = new Inchworm()
worm.scriptTags.subscribe( el => {})
worm.crawl(url)
```

### Style tags

Inline css.

```javascript 
const worm = new Inchworm()
worm.styleTags.subscribe( el => {})
worm.crawl(url)
```

## Subscribing to Document Loading

Inchworm surfaces up document loading to provide you the opportunity to go with your own processing. You can even handle the first page crawl and do something completely different from what Inchworm provides out of the box. Or if you want Inchworm to load CSS and JS files and expose their contents when they are loaded, you can do that as well. It should be noted that while Inchworm uses jsdom to parse the HTML page for you, CSS and JS files are left to you - maybe one day I'll find some parsers that would be meaningful, but really it would amount to AST-type parsing given how complex JS and CSS can become. 

### page

When you invoke the crawl command, it will download the html document from the passed in url. If you want to access the raw html in string form, you can subscribe to the page observable.  

```javascript
const worm = new Inchworm()
worm.page.subscribe( {url, content} => {})
worm.crawl('https://wookets.github.io')
```

### stylesheets

Inchworm by default will not load stylesheets from the links on the html doc. When a stylesheet is loaded, next() will be called
on the Stylesheet Observer so you can listen for it. 

```javascript
const worm = new Inchworm({
	loadStylesheets: true
})
worm.stylesheets.subscribe( {url, content} => {
	if (content.match(/.hello-class/)) {
		throw new Error('.hello-class is deprecated')
	}
})
worm.crawl('https://wookets.github.io')
```

### javascript files

Inchworm by default will not load external javascript files from script tags. When a javascript is loaded, next() will be called on the Javascript FIle Observer so you can listen for it. 

```javascript
const worm = new Inchworm({
	loadJavascriptFiles: true
})
worm.javascriptFiles.subscribe( {url, content} => {})
worm.crawl('https://wookets.github.io')
```

## Notes

* Requires Node 8.x+
* "JSDOM doesn't do stream parsing, so it doesn't gain much from rxjs" - true... but it could be one day. And if it does, the API won't have to change. 