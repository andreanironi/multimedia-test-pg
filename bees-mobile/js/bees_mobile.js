var deviceAgent = navigator.userAgent.toLowerCase();
var isTouchDevice = (deviceAgent.match(/(iphone|ipod|ipad)/) ||
deviceAgent.match(/(android)/)  || 
deviceAgent.match(/(iemobile)/) || 
deviceAgent.match(/iphone/i) || 
deviceAgent.match(/ipad/i) || 
deviceAgent.match(/ipod/i) || 
deviceAgent.match(/blackberry/i) || 
deviceAgent.match(/bada/i));

if (!isTouchDevice) {
	window.location = "/interactive-pages/bees/BeesUnderAttack";
}

jQuery(document).ready(function() {
	function doOnOrientationChange() {
		jQuery('#section-1').css({'height': window.innerHeight + 'px'});
	}
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
});