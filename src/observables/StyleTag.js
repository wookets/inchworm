
import { Subject } from 'rxjs'

export default class StyleTagSubject extends Subject {
	
	selector (document) {
		return document.querySelectorAll('style')
	}

}