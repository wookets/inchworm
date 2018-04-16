
import { Subject } from 'rxjs'

export default class AnchorTagObservable extends Subject {

	constructor () {
		super()
	}

	selector ($) {
		return $('a[href]')
	}

}