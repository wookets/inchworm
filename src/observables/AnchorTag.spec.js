
import AnchorTagSubject from './AnchorTag'
import { JSDOM } from 'jsdom'

describe('AnchorTag', () => {

	const html = `<div><a href='#'>Link</a><div><a href='#anc'>Link2</a></div></div>`

	it('should be able to find all a[href]s in an html doc', () => {
		const frag = JSDOM.fragment(html)
		const anchorTag = new AnchorTagSubject()
		const $anchors = anchorTag.selector(frag)
		expect($anchors).toHaveLength(2)
	})

	it('should have a next function', () => {
		const anchorTag = new AnchorTagSubject()
		expect(anchorTag.next).toBeDefined()
	})

})