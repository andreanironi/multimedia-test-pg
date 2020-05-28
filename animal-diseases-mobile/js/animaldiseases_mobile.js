(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-23121873-1', 'auto');
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');

jQuery.scrollDepth({
	elements: ['#intro', '#food', '#contact-with-animals', '#bites-from-insects', '#how-to-reduce-the-risk'],
	percentage: false,
	eventHandler: function(data) {
		console.log(data)
	}
});

var efsaMobile = {
	init: function() {
		this.setBindings();
	},
	setBindings: function() {
		$('.bind-click-video').on('click', function(e) {
			e.preventDefault();
			$('body').addClass('modal-visible');
			_gaq.push(['_trackEvent','Animal Diseases video','Video opened: ' + $(this).data("videoid")]);
			$('#modal-content-placeholder').append("<iframe width='100%' height='100%' src='" + $(this).data("video") + "' frameborder='0' allowfullscreen>");
			$('.bind-click-close').attr('data_videoid', $(this).data("videoid"));
		});
		$('.bind-click-close').on('click', function(e) {
			e.preventDefault();
			_gaq.push(['_trackEvent','Animal Diseases video','Video closed: ' + $(this).data("videoid")]);
			$('body').removeClass('modal-visible');
			$('#modal-content-placeholder').empty();
		});
		$('.bind-click-info').on('click', function(e) {
			e.preventDefault();
			$('body').addClass('modal-visible');
			$('#modal-content-placeholder').append("<iframe width='100%' height='100%' src='" + $(this).data("info") + "' frameborder='0' allowfullscreen>");
		});
		$('.bind-click-image').on('click', function(e) {
			e.preventDefault();
			$('body').addClass('modal-visible');
			$('#modal-content-placeholder').append("<div style='width:100%;height:100%;overflow-y:auto;background: #fff'><img style='width: 100%;margin:auto' src='" + $(this).data("image") + "'>");
		});
	}
};
$(document).ready(function() {
	efsaMobile.init();
	function doOnOrientationChange() {
		$('#section-1').css({'height': window.innerHeight + 'px'});
	}
	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();
});