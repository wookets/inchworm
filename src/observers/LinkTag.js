
import { Subject } from 'rxjs'

export default class LinkTagObserver extends Subject {

	constructor () {
		super()
	}

	selector ($) {
		return $('link')
	}

}