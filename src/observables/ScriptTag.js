
import { Subject } from 'rxjs'

export default class ScriptTagObservable extends Subject {

	constructor () {
		super()
	}

	selector (document) {
		return document.querySelectorAll('script')
	}

}