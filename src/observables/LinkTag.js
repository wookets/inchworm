
import { Subject } from 'rxjs'

export default class LinkTagObservable extends Subject {

	constructor () {
		super()
	}

	selector ($) {
		return $('link')
	}

}