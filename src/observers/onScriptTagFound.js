
/**
 * When a script tag is found, if the user requested to loadJavascriptFiles in Inchworm, this observer will be used. 
 * 
 * @param {cheero-wrapped dom element} $e A cheero wrapped dom element representing the script tag
 */
export default function onScriptTagFound ($e) {
	const url = $e.attr('src')
	if (url) {
		
	}
}