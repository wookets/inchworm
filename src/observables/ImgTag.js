
import { Subject } from 'rxjs'

export default class ImgTagSubject extends Subject {

	selector (document) {
		return document.querySelectorAll('img')
	}

}