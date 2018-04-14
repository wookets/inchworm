
import { Subject } from 'rxjs'

export default class AnchorTagObserver extends Subject {

	constructor () {
		super()
	}

	selector ($) {
		return $('a[href]')
	}

}