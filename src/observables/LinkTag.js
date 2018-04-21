
import { Subject } from 'rxjs'

export default class LinkTagSubject extends Subject {

	selector (document) {
		return document.querySelectorAll('link')
	}

}