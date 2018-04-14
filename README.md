
# inchworm

<a href="http://worldartsme.com/cartoon-inchworm-clipart.html" title="Clipart from WorldArtsMe"><img title="Cartoon Inchworm Clipart" width="350" src="http://worldartsme.com/images/cartoon-inchworm-clipart-1.jpg"/> </a>

This library will crawl a web page and produce different observable [rxjs](http://reactivex.io/rxjs/) streams that you can subscribe to handle various page elements, stylesheets and scripts the crawler will encounter. 

## Installation

For integrated usage where you can add your own subscriptions (stream processors) to the crawling,

```bash
npm i -S inchworm
```

There is also a command line version which you could use. 

```bash
npm i -g inchworm
```


## CLI Usage

```bash
crawl https://wookets.github.io
```

## Notes

* Requires Node 8.x+