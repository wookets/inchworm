
import { Subject } from 'rxjs'

export default class ScriptTagSubject extends Subject {

	selector (document) {
		return document.querySelectorAll('script')
	}

}