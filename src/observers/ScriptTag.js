
import { Subject } from 'rxjs'

export default class ScriptTagObserver extends Subject {

	constructor () {
		super()
	}

	selector ($) {
		return $('script')
	}

}