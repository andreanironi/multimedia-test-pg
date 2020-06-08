var efsaMobile = {
	init: function() {
		this.setBindings();
	},
	setBindings: function() {
		$('.bind-click-video').on('click', function(e) {
			e.preventDefault();
			$('body').addClass('modal-visible');
			$('#modal-content-placeholder').append("<iframe width='100%' height='100%' src='" + $(this).data("video") + "' frameborder='0' allowfullscreen>");
			$('.bind-click-close').attr('data_videoid', $(this).data("videoid"));
		});
		$('.bind-click-close').on('click', function(e) {
			e.preventDefault();
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