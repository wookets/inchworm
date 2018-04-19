
import { Subject } from 'rxjs'

export default class AnchorTagObservable extends Subject {

	constructor () {
		super()
	}

	selector (document) {
		return document.querySelectorAll('a[href]')
	}

}