
import Crawler from 'crawler'

const c = new Crawler({
	maxConnections : 10
})

const BASE_URL = 'https://wookets.github.io'

function loadStylesheet (path) {
	c.queue([{
		uri: `${BASE_URL}${path}`,
		jquery: false,
		callback: (err, res, done) => {
			const fontRegex = /Lato-Light\.woff/i
			const found = res.body.match(fontRegex)
			console.log('found', !!found)
			done()
		}
	}])
}

c.queue([{
	uri: BASE_URL,
	callback: (err, res, done) => {
		const $ = res.$
		$('link[rel=stylesheet]').each(function (i, e) {
			loadStylesheet($(this).attr('href'))
		})
		console.log('done')
	}
}])
