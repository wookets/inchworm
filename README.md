
[![Build Status](https://travis-ci.org/wookets/inchworm.svg?branch=master)](https://travis-ci.org/wookets/inchworm)

# inchworm

<a href="http://worldartsme.com/cartoon-inchworm-clipart.html" title="Clipart from WorldArtsMe"><img title="Cartoon Inchworm Clipart" width="350" src="http://worldartsme.com/images/cartoon-inchworm-clipart-1.jpg"/> </a>

This library will crawl a web page and produce different observable [rxjs](http://reactivex.io/rxjs/) streams that you can subscribe to handle various page elements, stylesheets and scripts the crawler will encounter. 

## Installation

For integrated usage where you can add your own subscriptions (stream processors) to the crawling,

```bash
npm i -S inchworm
```

There is also a command line version which you could use. Documentation for the CLI is at the bottom of this document.

## Subscribing to Crawler Events

When you crawl() a document, inchworm will load the HTML document into Cheerio and crawl for various (e.g. link, script) tags. When it encounters one of these, it will push an event out to any subscribers. Inchworm passes back to you a Cheerio-wrapped DOM Element. 

### Anchor Tags

```javascript
cont worm = new Inchworm()
// for every anchor tag we find, we emit an observer
worm.anchorTags.subscribe( $e => {
	// $e is just a cheerio-wrapped DOM element (e.g. $(<a href="#">...</a>))
})
worm.crawl(url)
```

### Link tags

Remember that a <link> tag doesn't automatically mean stylesheet.

```javascript 
const worm = new Inchworm()
worm.linkTags.subscribe( $e => {})
worm.crawl(url)
```

### Script tags

Can be an inline script or an external sheet.

```javascript 
const worm = new Inchworm()
worm.scriptTags.subscribe( $e => {})
worm.crawl(url)
```

### Style tags

Inline css.

```javascript 
const worm = new Inchworm()
worm.styleTags.subscribe( $e => {})
worm.crawl(url)
```

## Subscribing to Document Loading

Inchworm surfaces up document loading to provide you the opportunity to handle these events. You can even handle the first page crawl and do something completely different from what Inchworm provides out of the box. Or if you want Inchworm to load CSS and JS files and expose their contents when they are loaded, you can do that as well. 

### page

When you invoke the crawl command, it will download the html document from the passed in url. If you want to access the raw html in string form, you can subscribe to the page observable.  

```javascript
const worm = new Inchworm()
worm.page.subscribe( html => {})
worm.crawl('https://wookets.github.io')
```

### stylesheets

Inchworm by default will not load stylesheets from the links on the html doc. When a stylesheet is loaded, next() will be called
on the Stylesheet Observer so you can listen for it. 

```javascript
const worm = new Inchworm({
	loadStylesheets: true
})
worm.stylesheets.subscribe( stylesheet => {
	if (stylesheet.match(/.hello-class/)) {
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
worm.javascriptFiles.subscribe( js => {})
worm.crawl('https://wookets.github.io')
```

## CLI Usage

```bash
npm i -g inchworm
crawl https://wookets.github.io
```

## Notes

* Requires Node 8.x+