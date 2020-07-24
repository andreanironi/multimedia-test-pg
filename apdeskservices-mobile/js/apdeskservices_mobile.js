var deviceAgent = navigator.userAgent.toLowerCase();
var isTouchDevice = (deviceAgent.match(/(iphone|ipod|ipad)/) ||
  deviceAgent.match(/(android)/) ||
  deviceAgent.match(/(iemobile)/) ||
  deviceAgent.match(/iphone/i) ||
  deviceAgent.match(/ipad/i) ||
  deviceAgent.match(/ipod/i) ||
  deviceAgent.match(/blackberry/i) ||
  deviceAgent.match(/bada/i));

if (!isTouchDevice) {
  window.location = "/interactive_pages/apdeskservices/ApdeskServices";
}

$(document).ready(function() {

	$("html").addClass("js");
	$.fn.accordion.defaults.container = false;
	$(function() {
   $("#acc3").accordion({initShow: "#current"});
   $("#acc1").accordion({
     el: ".h",
     head: "h4, h5",
     next: "div",
     showMethod: "slideFadeDown",
     hideMethod: "slideFadeUp",
     initShow : "div.shown",
   });
   $("#acc2").accordion({
     obj: "div",
     wrapper: "div",
     el: ".h",
     head: "h4, h5",
     next: "div",
     showMethod: "slideFadeDown",
     hideMethod: "slideFadeUp",
     initShow : "div.shown",
     elToWrap: "sup, img"
   });
   $("html").removeClass("js");
 });
});
