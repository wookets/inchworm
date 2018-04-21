
import { Subject } from 'rxjs'

export default class AnchorTagSubject extends Subject {

	selector (document) {
		return document.querySelectorAll('a[href]')
	}

}