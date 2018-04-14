
import AnchorTag from './AnchorTag'
import { load } from 'cheerio'

describe('AnchorTag', () => {

	it('should be able to find all a[href]s in an html doc', () => {
		const html = `<div><a href='#'>Link</a><div><a href='#anc'>Link2</a></div></div>`
		const $ = load(html)
		const anchorTag = new AnchorTag()
		const $anchors = anchorTag.selector($)
		expect($anchors.length).toEqual(2)
	})

})