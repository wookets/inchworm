
import Crawler from 'crawler'

const c = new Crawler({
	maxConnections : 10
})

const BASE_URL = 'https://wookets.github.io'

function loadStylesheet (path) {
	return {
		uri: `${BASE_URL}${path}`,
		callback: (err, res, done) => {
			console.log('res.', res.body)
			done()
		}
	}
}
const base = 

c.queue([{
	uri: BASE_URL,
	callback: (err, res, done) => {
		const $ = res.$
		$('script[src], link[rel=stylesheet]').each(function (i, e) {
			const item = ((e.name == 'link') ? $(this).attr('href') : $(this).attr('src'))
			loadStylesheet(item)
		})
		done()
	}
}])
