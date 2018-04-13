
import { Observable } from 'rxjs'
import fetch from 'cross-fetch'

export default function (config) {
	return Observable.fromPromise(fetch(config).then((response) => response.text()))
}
