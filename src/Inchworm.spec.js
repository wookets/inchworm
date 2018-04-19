
import Inchworm from './Inchworm'

describe('Inchworm', () => {

	describe('constructor', () => {

		it('should construct properly', () => {
			const worm = new Inchworm()
			expect(worm).toBeDefined()
		})

	})

	describe('config', () => {

		it('should by default set loadStylesheets to false', () => {
			const worm = new Inchworm()
			expect(worm.loadStylesheets).toBeFalsy()
		})

		it('should set loadStylesheets to true', () => {
			const worm = new Inchworm({ loadStylesheets: true })
			expect(worm.loadStylesheets).toBeTruthy()
		})

		it('should by default set loadJavascriptFiles to false', () => {
			const worm = new Inchworm()
			expect(worm.loadJavascriptFiles).toBeFalsy()
		})

		it('should set loadJavascriptFiles to true', () => {
			const worm = new Inchworm({ loadJavascriptFiles: true })
			expect(worm.loadJavascriptFiles).toBeTruthy()
		})

	})

	describe('api', () => {

		it('should expose a page observable', () => {
			const worm = new Inchworm()
			expect(worm.page).toBeDefined()
		})

	})


	describe('crawl', () => {

		it('should expose a page observable that we can subscribe to', (done) => {
			const worm = new Inchworm()
			worm.page.subscribe(({url, content}) => {
				expect(url).toEqual('https://mock.com')
				expect(content).toBeDefined()
				done()
			})
			worm.crawl('https://mock.com')
		})

	})

	describe('crawler events', () => {
		
		it('should trigger subscribe on finding an anchor tag', (done) => {
			const worm = new Inchworm()
			const subscription = worm.anchorTags.subscribe( el => {
				expect(el.textContent).toEqual('Wookets Wove')
				subscription.unsubscribe()
				done()
			})
			worm.crawl('https://mock.com')
		})

		it('should trigger subscribe on finding a link tag', (done) => {
			const worm = new Inchworm()
			const subscription = worm.linkTags.subscribe( el => {
				expect(el.getAttribute('title')).toEqual('Wookets Wove')
				subscription.unsubscribe()
				done()
			})
			worm.crawl('https://mock.com')
		})

		it('should trigger subscribe on finding a script tag', (done) => {
			const worm = new Inchworm()
			const subscription = worm.scriptTags.subscribe( el => {
				expect(el.getAttribute('src')).toEqual('/js/jquery-2.1.4.min.js')
				subscription.unsubscribe()
				done()
			})
			worm.crawl('https://mock.com')
		})

		it('should trigger subscribe on finding a style tag', (done) => {
			const worm = new Inchworm()
			const subscription = worm.styleTags.subscribe( el => {
				expect(el.textContent).toMatch('.someMadeUpClass')
				subscription.unsubscribe()
				done()
			})
			worm.crawl('https://mock.com')
		})

	})

})