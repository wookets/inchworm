
import { Subject } from 'rxjs'

export default class StyleTagObserver extends Subject {

	constructor () {
		super()
	}

	selector ($) {
		return $('style')
	}

}