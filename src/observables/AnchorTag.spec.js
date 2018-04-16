
import AnchorTagSubject from './AnchorTag'
import { load } from 'cheerio'

describe('AnchorTag', () => {

	const html = `<div><a href='#'>Link</a><div><a href='#anc'>Link2</a></div></div>`

	it('should be able to find all a[href]s in an html doc', () => {
		const $ = load(html)
		const anchorTag = new AnchorTagSubject()
		const $anchors = anchorTag.selector($)
		expect($anchors.length).toEqual(2)
	})

	it('should have a next function', () => {
		const anchorTag = new AnchorTagSubject()
		expect(anchorTag.next).toBeDefined()
	})

})