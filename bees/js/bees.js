var deviceAgent = navigator.userAgent.toLowerCase();
var isTouchDevice = (deviceAgent.match(/(iphone|ipod|ipad)/) ||
deviceAgent.match(/(android)/)  || 
deviceAgent.match(/(iemobile)/) || 
deviceAgent.match(/iphone/i) || 
deviceAgent.match(/ipad/i) || 
deviceAgent.match(/ipod/i) || 
deviceAgent.match(/blackberry/i) || 
deviceAgent.match(/bada/i));

if (isTouchDevice) {
	window.location = "/interactive_pages/bees/BeesUnderAttack_mobile";
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-23121873-1', 'auto');
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');

jQuery.scrollDepth({
  elements: ['#intro', '#biological', '#chemicals-and-contaminants', '#environmental'],
  percentage: true,
  userTiming: false,
  pixelDepth: false,
});

window.efsa = window.efsa || {};
efsa.cache = {
	screenW: 0,
	screenH: 0,
	scrollTop: 0,
	scrollDirection: 'down',
	locateAnchors: [],
	active: 0,
	newActive: 0,
	disableScrollAnchors: false
}
efsa.screenWatch = {
	init: function() {
		this.setData();
		this.updateDom();
		this.setAnchors();
		this.setBindings();
	},
	setData: function() {
		var cache = efsa.cache;
		cache.screenW = window.innerWidth;
		cache.screenH = window.innerHeight;
	},
	setAnchors: function() {
		var cache = efsa.cache;
		$('.section-anchor').each(function(i, elem) {
			var $this = $(this);
			cache.locateAnchors.push([$this.offset().top, $this.attr('id')]);
		});
	},
	setBindings: function() {
		var self = this,
			cache = efsa.cache,
			navSmall = false,
			currentURL = '',
			resizeApplied = false;
		$(window).on('resize', function() {
			currentURL = window.location;
			if(!resizeApplied) {
				resizeApplied = true;
				window.location = 'https://www.efsa.europa.eu/interactive_pages/bees/BeesUnderAttack';
				setTimeout(function() {
				}, 500);
			}
		});
		$(window).on('scroll', function() {
			var scrollTop = $(window).scrollTop();
			if(cache.scrollTop < scrollTop) {
				cache.scrollDirection = "down";
			} else {
				cache.scrollDirection = "up";
			}
			cache.scrollTop = scrollTop;
			// Navigation compact
			if(cache.scrollTop > 30 && navSmall === false) {
				navSmall = true;
				$('body').addClass('nav-small');
			} else if(cache.scrollTop === 0 && navSmall === true) {
				navSmall = false;
				$('body').removeClass('nav-small');
			}
			//anchors
			if(cache.scrollDirection === 'down') {
				for(var i = 0; i < cache.locateAnchors.length; i += 1) {
					if(scrollTop > cache.locateAnchors[i][0]) {
						if(i < cache.locateAnchors.length-1) {
							if(scrollTop < cache.locateAnchors[i+1][0]) {
								cache.newActive = i;
							}
						} else {
							cache.newActive = i;
						}
					}
				}
			} else {
				for (var i = cache.locateAnchors.length - 1; i >= 0; i--) {
					if(i < cache.locateAnchors.length - 1) {
						if(scrollTop < cache.locateAnchors[i+1][0]) {
							cache.newActive = i;
						}
					}
				}
			}
			if(cache.newActive !== cache.active) {
				$('body').removeClass('active-section-' + cache.locateAnchors[cache.active][1]).addClass('active-section-' + cache.locateAnchors[cache.newActive][1]);
				cache.active = cache.newActive;
				if(cache.scrollDirection === 'down') {
					if(!efsa.cache.disableScrollAnchors) {
						window.location.hash = '#' + cache.locateAnchors[cache.active][1];
					}
				}
				$('#nav').find('li').removeClass('active');
				$('#nav').find('a[href="#'+ cache.locateAnchors[cache.newActive][1] +'"]').parent().addClass('active');
			}
		});
	},
	updateDom: function() {
		var cache = efsa.cache;
		$('.section-fill').css({'height': cache.screenH + 'px'});
		$('.section-pin-amount-2').css({'height': (cache.screenH*2) + 'px'});
		$('.section-pin-amount-3').css({'height': (cache.screenH*3) + 'px'});
		$('.section-pin-amount-4').css({'height': (cache.screenH*4) + 'px'});
		$('.section-footer').css({'height': (cache.screenW*.62) + 'px'});
	}
}
efsa.animations = {
	init: function() {
		var self = this;
		self.scrollorama = $.superscrollorama({playoutAnimations:false,triggerAtCenter:false});
		self.section2();
		self.section3();
		self.section4();
		self.section5();
		self.section6();
		self.section7();
		self.section8();
		self.section9();
		self.section10();
		self.section11();
		self.section13();
		self.section14();
		self.section15();
	},
	section2: function() {
		var self = this,
			scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite(),
			pinAnimations3 = new TimelineLite();
		scrollorama.addTween('#section-1', (new TimelineLite()).append([TweenMax.fromTo($('#s-2-px-1'), 1, {css: {top: (efsa.cache.screenH*.36)},immediateRender: true}, {css: {top: (efsa.cache.screenH*.41)}})]),efsa.cache.screenH); //41 --5
		scrollorama.addTween('#section-1', (new TimelineLite()).append([TweenMax.fromTo($('#s-2-px-2'), 1, {css: {top: (efsa.cache.screenH*.43)},immediateRender: true}, {css: {top: (efsa.cache.screenH*.48)}})]),efsa.cache.screenH); //48 --5
		scrollorama.addTween('#section-1', (new TimelineLite()).append([TweenMax.fromTo($('#s-2-px-3'), 1, {css: {top: (efsa.cache.screenH*.56)},immediateRender: true}, {css: {top: (efsa.cache.screenH*.66)}})]),efsa.cache.screenH); //66 --10
		scrollorama.addTween('#section-1', (new TimelineLite()).append([TweenMax.fromTo($('#s-2-px-4'), 1, {css: {top: (efsa.cache.screenH*.07)},immediateRender: true}, {css: {top: (efsa.cache.screenH*.27)}})]),efsa.cache.screenH); //66 --20
		scrollorama.addTween('#section-1', (new TimelineLite()).append([TweenMax.fromTo($('#s-2-px-5'), 1, {css: {top: (efsa.cache.screenH*-.2)},immediateRender: true}, {css: {top: (efsa.cache.screenH*.10)}})]),efsa.cache.screenH); //10 --30
		scrollorama.addTween('#section-1', (new TimelineLite()).append([TweenMax.fromTo($('#s-2-px-6'), 1, {css: {top: (efsa.cache.screenH*.06)},immediateRender: true}, {css: {top: (efsa.cache.screenH*.46)}})]),efsa.cache.screenH); //46 -- 40

		scrollorama.addTween(efsa.cache.screenH*1, TweenMax.fromTo( $('#s-2-px-5'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),efsa.cache.screenH/2);
		scrollorama.addTween(efsa.cache.screenH*1.2, TweenMax.fromTo( $('#s-2-px-4'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),efsa.cache.screenH/2);
		scrollorama.addTween(efsa.cache.screenH*1.4, TweenMax.fromTo( $('#s-2-px-6'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),efsa.cache.screenH/2);
		scrollorama.addTween(efsa.cache.screenH*1.6, TweenMax.fromTo( $('#s-2-px-2'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),efsa.cache.screenH/2);
		scrollorama.addTween(efsa.cache.screenH*1.6, TweenMax.fromTo( $('#s-2-px-1'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),efsa.cache.screenH/2);
		scrollorama.addTween(efsa.cache.screenH*1.8, TweenMax.fromTo( $('#s-2-px-3'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),efsa.cache.screenH/2);
		scrollorama.addTween(efsa.cache.screenH*1.8, TweenMax.fromTo( $('#s-2-img-1'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),efsa.cache.screenH/2);

		scrollorama.addTween((efsa.cache.screenH*.6), TweenMax.from( $('#s-2-txt-1'), .3, {css:{opacity: 0, top: -300}, immediateRender: true}));
		scrollorama.addTween((efsa.cache.screenH*2)+(efsa.cache.screenH*.8), TweenMax.from( $('#s-2-txt-2'), .3, {css:{opacity: 0, top: -300}, immediateRender: true}));
		scrollorama.addTween((efsa.cache.screenH*2)+(efsa.cache.screenH*1.2), TweenMax.from( $('#s-2-txt-3'), .3, {css:{opacity: 0, top: -300}, immediateRender: true}));
		scrollorama.addTween((efsa.cache.screenH*3)+(efsa.cache.screenH*.9), TweenMax.from( $('#s-2-txt-4-p'), .3, {css:{opacity: 0, top: 300}, immediateRender: true}));


		scrollorama.addTween(efsa.cache.screenH*4, TweenMax.fromTo( $('#s-2-sub-3-bg-2'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),efsa.cache.screenH/2);
		scrollorama.addTween(efsa.cache.screenH*4.3, TweenMax.fromTo( $('#s-2-sub-3-bg-3'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),efsa.cache.screenH/2);
		scrollorama.addTween(efsa.cache.screenH*4.6, TweenMax.fromTo( $('#s-2-sub-3-bg-4'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),efsa.cache.screenH/2);

		pinAnimations.append([
								TweenMax.to( $('#s-4-txt-0'), .3, {css:{opacity: 0}}) //not active
							],.1);
		pinAnimations3.append([
								TweenMax.to( $('#s-4-txt-0'), .3, {css:{opacity: 0}}) //not active
							],.1)
		scrollorama.pin($('#section-2-pin-1'), efsa.cache.screenH, {anim:pinAnimations});
		scrollorama.pin($('#section-2-pin-3'), efsa.cache.screenH, {anim:pinAnimations3});
	},
	section3: function() {
		var self = this,
			scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite();
		pinAnimations.append([
			TweenMax.to( $('#s-4-txt-0'), .3, {css:{opacity: 0}})
		],.1)
		scrollorama.pin($('#section-3-pin'), efsa.cache.screenH, {anim:pinAnimations});
	},
	section4: function() {
		var self = this,
			scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite();
		scrollorama.addTween("#section-4", TweenMax.fromTo( $('#s-4-txt-1'), .3, {css:{opacity: 0}}, {css:{opacity: 1}}),600);
		pinAnimations.append([
								TweenMax.to( $('#s-4-txt-1'), .3, {css:{opacity: 0}}),
								TweenMax.fromTo( $('#s-4-txt-2'), .3, {css:{opacity: 0}}, {css:{opacity: 1}})
							],.1)
		scrollorama.pin($('#section-4-pin'), efsa.cache.screenH, {anim:pinAnimations});
	},
	section5: function() {
		var self = this,
			scrollorama = this.scrollorama;
		scrollorama.addTween(efsa.cache.screenH*9, TweenMax.to( $('#section-5 .hidden'), .3, {css:{opacity: 0}}), efsa.cache.screenH*2);
	},
	section6: function() {
		var self = this,
			scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite();
		scrollorama.addTween("#section-5", TweenMax.fromTo( $('#section-6-sub-1'), .3, {css:{opacity: 0, left: efsa.cache.screenW/2}}, {css:{opacity: 1, left: 0}}),efsa.cache.screenH);

		pinAnimations.append([
								TweenMax.to( $('#section-6-sub-1'), .3, {css:{opacity: 0, left: -efsa.cache.screenW}}),
								TweenMax.fromTo( $('#section-6-sub-2'), .3, {css:{opacity: 0, left: efsa.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1).append([
								TweenMax.to( $('#section-6-sub-2'), .3, {css:{opacity: 0, left: -efsa.cache.screenW}}),
								TweenMax.fromTo( $('#section-6-sub-3'), .3, {css:{opacity: 0, left: efsa.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1).append([
								TweenMax.to( $('#section-6-sub-3'), .3, {css:{opacity: 0, left: -efsa.cache.screenW}}),
								TweenMax.fromTo( $('#section-6-sub-4'), .3, {css:{opacity: 0, left: efsa.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1)
		scrollorama.pin($('#section-6-pin'), efsa.cache.screenH*3, {anim:pinAnimations});
	},
	section7: function() {
		var self = this,
			scrollorama = this.scrollorama;
		scrollorama.addTween(efsa.cache.screenH*14, TweenMax.to( $('#section-7 .hidden'), .3, {css:{opacity: 0}}), efsa.cache.screenH*1.5);
	},
	section8: function() {
		var self = this,
			scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite();
		scrollorama.addTween("#section-7", TweenMax.fromTo( $('#section-8-sub-1'), .3, {css:{opacity: 0, left: efsa.cache.screenW/2}}, {css:{opacity: 1, left: 0}}),efsa.cache.screenH);

		pinAnimations.append([
								TweenMax.to( $('#section-8-sub-1'), .3, {css:{opacity: 0, left: -efsa.cache.screenW}}),
								TweenMax.fromTo( $('#section-8-sub-2'), .3, {css:{opacity: 0, left: efsa.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1).append([
								TweenMax.to( $('#section-8-sub-2'), .3, {css:{opacity: 0, left: -efsa.cache.screenW}}),
								TweenMax.fromTo( $('#section-8-sub-3'), .3, {css:{opacity: 0, left: efsa.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1)
		scrollorama.pin($('#section-8-pin'), efsa.cache.screenH*2, {anim:pinAnimations});
	},
	section9: function() {
		var self = this,
			scrollorama = this.scrollorama;
		scrollorama.addTween(efsa.cache.screenH*18, TweenMax.to( $('#section-9 .hidden'), .3, {css:{opacity: 0}}), efsa.cache.screenH*2);
	},
	section10: function() {
		var self = this,
			scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite();
		scrollorama.addTween("#section-9", TweenMax.fromTo( $('#section-10-sub-1'), .3, {css:{opacity: 0, left: efsa.cache.screenW/2}}, {css:{opacity: 1, left: 0}}),efsa.cache.screenH);

		pinAnimations.append([
								TweenMax.to( $('#section-10-sub-1'), .3, {css:{opacity: 0, left: -efsa.cache.screenW}}),
								TweenMax.fromTo( $('#section-10-sub-2'), .3, {css:{opacity: 0, left: efsa.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1).append([
								TweenMax.to( $('#section-10-sub-2'), .3, {css:{opacity: 0, left: -efsa.cache.screenW}}),
								TweenMax.fromTo( $('#section-10-sub-3'), .3, {css:{opacity: 0, left: efsa.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1)
		scrollorama.pin($('#section-10-pin'), efsa.cache.screenH, {anim:pinAnimations});
	},
	section11: function() {
		var self = this,
			scrollorama = this.scrollorama;
		scrollorama.addTween(efsa.cache.screenH*21, (new TimelineLite()).append([TweenMax.fromTo($('#section-11-layer'), 1, {css: {top: efsa.cache.screenH, left: -(efsa.cache.screenH/2)},immediateRender: true}, {css: {top: 0, left: 0}})]),efsa.cache.screenH*1.2); //41 --5
		scrollorama.addTween(efsa.cache.screenH*21, (new TimelineLite()).append([TweenMax.fromTo($('#section-11-layer-2'), 1, {css: {top: efsa.cache.screenH},immediateRender: true}, {css: {top: 0}})]),efsa.cache.screenH*1.2); //41 --5
	},
	section13: function() {
	},
	section14: function() {
		var self = this,
			scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite();
		pinAnimations.append([
			TweenMax.to( $('#s-4-txt-0'), .3, {css:{opacity: 0}})
		],.1)
		scrollorama.pin($('#section-14-pin'), efsa.cache.screenH, {anim:pinAnimations});
	},
	section15: function() {
		var self = this,
			scrollorama = this.scrollorama;
		scrollorama.addTween("#section-15", TweenMax.to( $('#social'), .3, {css:{opacity: 0}, immediateRender: true}));
	}
};
efsa.bindings = {
	init: function() {
		$('#nav').find('a').on('click', function(e) {
			e.preventDefault();
			var location = $(this).attr('href'),
				elemOffset = ($(location).offset().top);
			efsa.cache.disableScrollAnchors = true;
			TweenLite.to(window, .7, {scrollTo:elemOffset, onComplete: changeLocation, onCompleteParams: [location]});
			$('#nav').find('li').removeClass('active');
			$('#nav').find('a[href="'+ location +'"]').parent().addClass('active');
		});
		function changeLocation(location) {
			window.location.hash = location;
			efsa.cache.disableScrollAnchors = false;
		}
	}
};
efsa.videos = {
	cache: {
		video1Images: [],
		video2Images: [],
		video3Images: [],
		curLocation: 0,
		curLocation2: 0,
		newLocation: 0,
		newLocation2: 0
	},
	init: function() {
		this.video1();
	},
	video1: function() {
		var self = this,
			cache = this.cache,
			count = 0
		self.preload('video1', 100);
		startPoint = $('#section-2-sub-3').offset().top;
		$(window).on('scroll', function() {
			if(efsa.cache.scrollTop > startPoint && efsa.cache.scrollTop < (startPoint+(efsa.cache.screenH*2))) {
				cache.newLocation = Math.floor(-(100/(efsa.cache.screenH*2))*(startPoint-efsa.cache.scrollTop));
				if(cache.curLocation !== cache.newLocation) {
					count++;
					$('#video1-' + cache.newLocation).css({'display': 'block', 'z-index': count});
					cache.curLocation = cache.newLocation;
				}
			}
		});
	},
	video2: function() {
		var self = this,
			cache = this.cache,
			count2 = 0
		self.preload('video2', 90);
		startPoint2 = $('#section-3').offset().top;
		$(window).on('scroll', function() {
			if(efsa.cache.scrollTop > startPoint2 && efsa.cache.scrollTop < (startPoint2+(efsa.cache.screenH*2))) {
				cache.newLocation2 = Math.floor(-(100/(efsa.cache.screenH*2))*(startPoint2-efsa.cache.scrollTop));
				if(cache.curLocation2 !== cache.newLocation2) {
					count2++;
					$('#video2-' + cache.newLocation2).css({'display': 'block', 'z-index': count2});
					cache.curLocation2 = cache.newLocation2;
				}
			}
		});
	},
	preload: function(prefix, totalImages) {
		var self = this,
			cache = this.cache;
		for(var i = 1; i < totalImages; i++) {
			var filename = 'images/bela_' + prefix + (('00' + i).slice(-3)) + '.jpg'; // Filename of each image
			var img = new Image;
			img.src = filename;
			$('#' + prefix + '-' + (i+1)).css({'background-image': 'url(' + img.src + ')'});
		}
	}
}
efsa.video = {
	cache: {
		videoLength: 0,
		videoDistance: 0,
		video1Start: 0,
		video2Start: 0,
		video3Start: 0
	},
	init: function() {
		this.setData();
		this.video();
	},
	setData: function() {
		var cache = this.cache;
		cache.video1Start = $('#bg-video-1').offset().top;
		cache.video2Start = $('#bg-video-2').offset().top;
		cache.video3Start = $('#bg-video-3').offset().top;
	},
	video: function() {
		var cache = this.cache,
			$video1 = $('#bg-video-1-video');
			$video2 = $('#bg-video-2-video');
			$video3 = $('#bg-video-3-video');
		setInterval(function() {
			if(efsa.cache.scrollTop > (cache.video1Start-efsa.cache.screenH) && efsa.cache.scrollTop < (cache.video1Start+(efsa.cache.screenH*2))) {
				$video1[0].currentTime =(window.pageYOffset-cache.video1Start+efsa.cache.screenH)/500;
			}
			if(efsa.cache.scrollTop > (cache.video2Start-efsa.cache.screenH) && efsa.cache.scrollTop < (cache.video2Start+(efsa.cache.screenH*2))) {
				$video2[0].currentTime =(window.pageYOffset-cache.video2Start+efsa.cache.screenH)/500;
			}
			if(efsa.cache.scrollTop > (cache.video3Start-efsa.cache.screenH) && efsa.cache.scrollTop < (cache.video3Start+efsa.cache.screenH*2)) {
				$video3[0].currentTime =(window.pageYOffset-cache.video3Start+efsa.cache.screenH)/500;
			}
		}, 160);
	}
}
efsa.preload = {
	config: {},
	cache: {
		sectionsAmount: 14,
		sectionsLoaded: 0,
		folder: 'images/besm_'
	},
	init: function() {
		if(window.innerWidth > 1400) {
			this.cache.folder = 'images/bela_';
		} else {
			this.cache.folder = 'images/besm_';
		}
		this.getFiles();
	},
	getFiles: function() {
		var self = this,
			files = [];
		$('#section-' + (this.cache.sectionsLoaded+1)).find('.preload').each(function() {
			files.push(self.cache.folder + $(this).data('preload'));
		});
		if(files[0]) {
			this.images(files, function(images) {
				$('#section-' + (self.cache.sectionsLoaded+1)).find('.preload').each(function() {
					$(this).attr('src',self.cache.folder + $(this).data('preload'));
				});
				self.cache.sectionsLoaded += 1;
				$('#section-' + (self.cache.sectionsLoaded)).addClass('section-preloaded');
				if(self.cache.sectionsLoaded <= self.cache.sectionsAmount) {
					self.getFiles();
				} else {
					setTimeout(function() {
						$("#preload").animate({'opacity':'0'},{duration: 300, complete: function() {
							$('html').addClass('page-ready').trigger('efsa:preloaded');
						}});
					}, 200);
				}
			});
		} else {
			self.cache.sectionsLoaded += 1;
			$('#section-' + (self.cache.sectionsLoaded)).addClass('section-preloaded');
			if(self.cache.sectionsLoaded < self.cache.sectionsAmount) {
				self.getFiles();
			} else {
				setTimeout(function() {
					$("#preload").animate({'opacity':'0'},{duration: 300, complete: function() {
						$('html').addClass('page-ready').trigger('efsa:preloaded');
					}});
				}, 200);
			}
		}
	},
	images: function (imgs, callback) {
	    var loaded = 0,
	        images = [],
	        i;
	    function inc() {
	        loaded += 1;
	        if (loaded === imgs.length && callback) {
	            callback(images);
	        }
	    }
	    imgs = Object.prototype.toString.apply(imgs) === '[object Array]' ? imgs : [imgs];
	    for (i = 0; i < imgs.length; i += 1) {
	        images[i] = new Image();
	        images[i].onabort = inc;
	        images[i].onerror = inc;
	        images[i].onload = inc;
	        images[i].src = imgs[i];
	    }
	}
};
$(document).ready(function() {
	efsa.screenWatch.init();
	efsa.preload.init();
	efsa.animations.init();
	efsa.bindings.init();
	efsa.video.init();
});