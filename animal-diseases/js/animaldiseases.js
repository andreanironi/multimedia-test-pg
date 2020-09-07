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
	window.location = "/interactive-pages/animaldiseases/AnimalDiseases_mobile";
}

window.efsa = window.efsa || {};
efsa.preload = {
	config: {},
	cache: {
		sectionsAmount: 9,
		sectionsLoaded: 0,
		folder: 'images/preload/adsm_'
	},
	init: function() {
		this.getFiles();

		if(window.innerWidth > 1700) {
			this.cache.folder = 'images/preload/adla_';
		} else {
			this.cache.folder = 'images/preload/adsm_';
		}
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
				}
				if(self.cache.sectionsLoaded === 1) {
					setTimeout(function() {
						$("#preload").animate({'opacity':'0'},{duration: .3, complete: function() {
							$('html').addClass('page-ready').trigger('efsa:preloaded');
							if(location.hash) {
								$('.menu').find('a[href="'+ location.hash +'"]').trigger('click');
							}
						}});
					}, 200);
				}
			});
		} else {
			self.cache.sectionsLoaded += 1;
			$('#section-' + (self.cache.sectionsLoaded)).addClass('section-preloaded');
			if(self.cache.sectionsLoaded < self.cache.sectionsAmount) {
				self.getFiles();
			}
			if(self.cache.sectionsLoaded === 1) {
				$('html').trigger('efsa:preloaded');
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
efsa.screenWatch = {
	cache: {
		screenW: 0,
		screenH: 0,
		scrollTop: 0,
		status: 0,
		sectionPos: [],
		sectionPosActive: 1
	},
	init: function() {
		this.resize();
		this.setBindings();
		setTimeout(function() {
			window.scroll(0,0);
		}, 200);
	},
	setBindings: function() {
		var self = this,
			cache = this.cache;
		$(window).on('resize', function() {
			self.resize();
		});
		$(window).on('scroll', function() {
			cache.scrollTop = $(window).scrollTop();
			if(cache.scrollTop > 100) {
				$('body').addClass('nav-minimize');
			} else {
				$('body').removeClass('nav-minimize');
			}
		});
		$('.menu').find('a').on('click', function(e) {
			e.preventDefault();
			efsa.anchorTag.cache.activeTag = false;
			var location = $(this).attr('href');
			var elemOffset = $(location).offset().top;
			TweenLite.to(window, .7, {scrollTo:elemOffset, onComplete: changeLocation, onCompleteParams: [location]});
			$('.menu').find('li').removeClass('active');
			$('.menu').find('a[href="'+ location +'"]').parent().addClass('active');
		});
		function changeLocation(location) {
			window.location.hash = location;
			efsa.anchorTag.cache.activeTag = true;
		}
	},
	resize: function() {
		var self = this,
			cache = this.cache;
		this.cache.screenW = efsa.animations.cache.screenW = window.innerWidth;
		this.cache.screenH = efsa.animations.cache.screenH = window.innerHeight;
		if(this.cache.status === 0) {
			if(this.cache.screenW >= 1700) {
				this.cache.status = 'large';
			} else {
				this.cache.status = 'small';
			}
		}
		else {
			if(this.cache.screenW >= 1700 && this.cache.status == 'small') {
				this.cache.status = 'large';
				efsa.preload.cache.sectionsLoaded = 0;
				efsa.preload.init();
			} else if(this.cache.screenW < 1700 && this.cache.status == 'large') {
				this.cache.status = 'small';
				efsa.preload.cache.sectionsLoaded = 0;
				efsa.preload.init();
			}
		}
		$('.fit-screen').css({'height': this.cache.screenH + 'px'});
		$('.section-pin').parent().css({'height': (this.cache.screenH+1200) + 'px'}); // 1200 === pinned animation length
		$('html').trigger('efsa:resize', {w: this.cache.screenW, h: this.cache.screenH});
		/* Get sections position */
		cache.sectionPos = [];
		$('.section').each(function(i,elem) {
			cache.sectionPos.push($(elem).offset().top);
		});
	}
};
efsa.animations = {
	cache: {
		screenW: 0,
		screenH: 0
	},
	init: function() {
		var self = this;
		$('html').on('efsa:preloaded', function() {
			self.scrollorama = $.superscrollorama({playoutAnimations:false});
			self.section1();
			self.section2();
			self.section3();
			self.section4();
			self.section5();
			self.section6();
			self.section7();
			self.section8();
			self.section9();
		});
	},
	section1: function() {

	},
	section2: function() {
		var self = this,
			scrollorama = this.scrollorama;
		scrollorama.addTween(200, TweenMax.from( $('#s-2-elem-1-anim'), .3, {css:{top: -220}, immediateRender: true}));
		scrollorama.addTween('#section-1', (new TimelineLite()).append([TweenMax.fromTo($('#px-s-2-1-anim'), 1, {css: {top: -800},immediateRender: true}, {css: {top: 800}})]),4600);
		scrollorama.addTween('#section-2', (new TimelineLite()).append([TweenMax.fromTo($('#px-s-2-2-anim'), 1, {css: {top: -600},immediateRender: true}, {css: {top: 600}})]),4600);
		scrollorama.addTween('#section-2', (new TimelineLite()).append([TweenMax.fromTo($('#px-s-2-3-anim'), 1, {css: {top: -600},immediateRender: true}, {css: {top: 600}})]),4600);
		scrollorama.addTween('#section-2', (new TimelineLite()).append([TweenMax.fromTo($('#px-s-2-4-anim'), 1, {css: {top: -400},immediateRender: true}, {css: {top: 400}})]),4600);
		scrollorama.addTween('#section-2', (new TimelineLite()).append([TweenMax.fromTo($('#px-s-2-5-anim'), 1, {css: {top: -400},immediateRender: true}, {css: {top: 400}})]),4600);
		scrollorama.addTween('#section-2', (new TimelineLite()).append([TweenMax.fromTo($('#px-s-2-6-anim'), 1, {css: {top: -200},immediateRender: true}, {css: {top: 200}})]),4600);
		scrollorama.addTween('#section-2', (new TimelineLite()).append([TweenMax.fromTo($('#px-s-2-7-anim'), 1, {css: {top: -200},immediateRender: true}, {css: {top: 200}})]),4600);
		scrollorama.addTween('#section-2', (new TimelineLite()).append([TweenMax.fromTo($('#px-s-2-9-anim'), 1, {css: {top: 600},immediateRender: true}, {css: {top: -600}})]),4600);

		var startPoint1 = this.cache.screenH - (this.cache.screenH*.15);
		if(efsa.screenWatch.cache.status == 'small') {
			var startPoint1sub = this.cache.screenH + (800-this.cache.screenH);
			var startPoint1sub2 = this.cache.screenH + (900-this.cache.screenH);
			var startPoint2 = this.cache.screenH + (1400-this.cache.screenH);
			var startPoint2sub = this.cache.screenH + (1750-this.cache.screenH);
			var startPoint3 = this.cache.screenH + (2200-this.cache.screenH);
		} else {
			var startPoint1sub = this.cache.screenH + (1200-this.cache.screenH);
			var startPoint1sub2 = this.cache.screenH + (1600-this.cache.screenH);
			var startPoint2 = this.cache.screenH + (2300-this.cache.screenH);
			var startPoint2sub = this.cache.screenH + (2900-this.cache.screenH);
			var startPoint3 = this.cache.screenH + (3500-this.cache.screenH);
		}

		scrollorama.addTween(startPoint1, TweenMax.from( $('#txt-s-2-1-anim'), .3, {css:{opacity: 0, top: 300}, onStart: function() {}, onReverseComplete: function() {}, immediateRender: true}));
		scrollorama.addTween(startPoint2, TweenMax.from( $('#txt-s-2-2-anim'), .3, {css:{opacity: 0, top: 300}, onStart: function() {}, onReverseComplete: function() {}, immediateRender: true}));
		scrollorama.addTween(startPoint3, TweenMax.from( $('#txt-s-2-3-anim'), .3, {css:{opacity: 0, top: -300}, onStart: function() {}, onReverseComplete: function() {}, immediateRender: true}));
		var scrollTop = 0,
			active1 = false,
			active1sub = false,
			active1sub2 = false,
			active2 = false,
			active2sub = false,
			active3 = false;
		$(window).on('scroll', function() {
			scrollTop = $(window).scrollTop();
			if(scrollTop < startPoint1) {
				if(active1) {
					$('#dot-1,#tweet-s-2-1').removeClass('visible');
					active1 = false;
				}
			} else if(scrollTop > startPoint1) {
				if(!active1) {
					$('#dot-1,#tweet-s-2-1').addClass('visible');
					active1 = true;
				}
			}
			if(scrollTop < startPoint1sub) {
				if(active1sub) {
					$('#dot-2').addClass('hidden').removeClass('visible');
					active1sub = false;
				}
			} else if(scrollTop > startPoint1sub) {
				if(!active1sub) {
					$('#dot-2').removeClass('hidden').addClass('visible');
					active1sub = true;
				}
			}
			if(scrollTop < startPoint1sub2) {
				if(active1sub2) {
					$('#dot-3').addClass('hidden').removeClass('visible');
					active1sub2 = false;
				}
			} else if(scrollTop > startPoint1sub2) {
				if(!active1sub2) {
					$('#dot-3').removeClass('hidden').addClass('visible');
					active1sub2 = true;
				}
			}
			if(scrollTop < startPoint2) {
				if(active2) {
					$('#dot-4,#tweet-s-2-2').addClass('hidden').removeClass('visible');
					active2 = false;
				}
			} else if(scrollTop > startPoint2) {
				if(!active2) {
					$('#dot-4,#tweet-s-2-2').removeClass('hidden').addClass('visible');
					active2 = true;
				}
			}
			if(scrollTop < startPoint2sub) {
				if(active2sub) {
					$('#dot-5').addClass('hidden').removeClass('visible');
					active2sub = false;
				}
			} else if(scrollTop > startPoint2sub) {
				if(!active2sub) {
					$('#dot-5').removeClass('hidden').addClass('visible');
					active2sub = true;
				}
			}
			if(scrollTop < startPoint3) {
				if(active3) {
					$('#dot-6,#tweet-s-2-3').addClass('hidden').removeClass('visible');
					active3 = false;
				}
			} else if(scrollTop > startPoint3) {
				if(!active3) {
					$('#dot-6,#tweet-s-2-3').removeClass('hidden').addClass('visible');
					active3 = true;
				}
			}
		});
	},
	section3: function() {
		var scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite(),
			start = 100,
			number = 315;

		numberSpin = function() {
			start += 5;
			$("#txt-s-3-2-spin").html(start);
			if(start < number) {
				setTimeout(function() {
					numberSpin();
				}, 60);
			}
		};
		triggerNumberSpin = function() {
			start = 100;
			numberSpin();
		};

		scrollorama.addTween("#section-3", TweenMax.from( $('#section-title-s-3-anim'), .3, {css:{opacity: 0, left: -300}, immediateRender: true}));
		scrollorama.addTween("#section-3", TweenMax.from( $('#ui-s-3-dish-anim'), .3, {css:{opacity: 0, left: -200}, immediateRender: true}),400);
		scrollorama.addTween("#section-3", TweenMax.from( $('#ui-s-3-tools-anim'), .3, {css:{opacity: 0, left: 200}, immediateRender: true}),400);

		pinAnimations.append([
								TweenMax.to( $('#ui-s-3-cover-green'), .3, {css:{opacity: 0}, immediateRender: true}),
								TweenMax.from( $('#txt-s-3-1-anim'), .3, {css:{opacity: 0}, immediateRender: true}),
								TweenMax.from( $('#tweet-s-3-1'), .3, {css:{opacity: 0}, immediateRender: true})
							]).append([
								TweenMax.to( $('#ui-s-3-cover-blue'), .3, {css:{opacity: 1}, immediateRender: true}),
								TweenMax.from( $('#txt-s-3-2-anim'), .3, {css:{opacity: 0}, immediateRender: true, onStart: triggerNumberSpin}),
								TweenMax.from( $('#tweet-s-3-2'), .3, {css:{opacity: 0}, immediateRender: true}),
								TweenMax.fromTo( $('#txt-s-3-1-anim'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),
								TweenMax.fromTo( $('#tweet-s-3-1'), .3, {css:{opacity: 1}}, {css:{opacity: 0}})
							],.2)

		scrollorama.pin($('#section-3-pin'), 1200, {anim:pinAnimations});
	},
	section4: function() {
		var scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite();

		scrollorama.addTween("#section-4", TweenMax.from( $('#section-title-s-4-anim'), .3, {css:{opacity: 0, left: -300}, immediateRender: true}));

		scrollorama.addTween("#section-4", TweenMax.fromTo( $('#section-4-sub-1'), .3, {css:{opacity: 0, left: this.cache.screenW/2}}, {css:{opacity: 1, left: 0}}),600);
		pinAnimations.append([
								TweenMax.to( $('#section-4-sub-1'), .3, {css:{opacity: 0, left: -this.cache.screenW}}),
								TweenMax.fromTo( $('#section-4-sub-2'), .3, {css:{opacity: 0, left: this.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1).append([
								TweenMax.to( $('#section-4-sub-2'), .3, {css:{opacity: 0, left: -this.cache.screenW}}),
								TweenMax.fromTo( $('#section-4-sub-3'), .3, {css:{opacity: 0, left: this.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1)

		scrollorama.pin($('#section-4-pin'), 1200, {anim:pinAnimations});
	},
	section5: function() {
		var scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite();

		scrollorama.addTween("#section-5", TweenMax.from( $('#section-title-s-5-anim'), .3, {css:{opacity: 0, left: -300}, immediateRender: true}));

		scrollorama.addTween("#section-5", TweenMax.fromTo( $('#txt-s-5-1'), .3, {css:{opacity: 0}}, {css:{opacity: 1}}),600);
		pinAnimations.append([
								TweenMax.to( $('#section-5-sub-1'), .3, {css:{opacity: 0}})
							],.2).append([
								TweenMax.fromTo( $('#s-5-elem-1-anim'), .3, {css:{opacity: 0, left: -300}}, {css:{opacity: 1, left: 0}}),
								TweenMax.fromTo( $('#txt-s-5-2-anim'), .3, {css:{opacity: 0}}, {css:{opacity: 1}})
							]).append([
								TweenMax.to( $('#txt-s-5-2-anim'), .3, {css:{opacity: 0}}),
								TweenMax.to( $('#s-5-elem-1-anim'), .3, {css:{opacity: 0, left: -200}})
							],.2).append([
								TweenMax.fromTo( $('#s-5-elem-2-anim'), .3, {css:{opacity: 0, left: 300}}, {css:{opacity: 1, left: 0}}),
								TweenMax.fromTo( $('#txt-s-5-3-anim'), .3, {css:{opacity: 0}}, {css:{opacity: 1}})
							]).append([
								TweenMax.to( $('#txt-s-5-3-anim'), .3, {css:{opacity: 0}}),
								TweenMax.to( $('#s-5-elem-2-anim'), .3, {css:{opacity: 0, left: 300}})
							],.2).append([
								TweenMax.fromTo( $('#section-5-sub-4'), .3, {css:{opacity: 0}}, {css:{opacity: 1}})
							])

		scrollorama.pin($('#section-5-pin'), 1200, {anim:pinAnimations});
	},
	section6: function() {
		var scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite();

		scrollorama.addTween("#section-6", TweenMax.from( $('#section-title-s-6-anim'), .3, {css:{opacity: 0, left: -300}, immediateRender: true}));

		scrollorama.addTween("#section-6", TweenMax.fromTo( $('#section-6-sub-1'), .3, {css:{opacity: 0, left: this.cache.screenW/2}}, {css:{opacity: 1, left: 0}}),600);
		pinAnimations.append([
								TweenMax.to( $('#section-6-sub-1'), .3, {css:{opacity: 0, left: -this.cache.screenW}}),
								TweenMax.fromTo( $('#section-6-sub-2'), .3, {css:{opacity: 0, left: this.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1)

		scrollorama.pin($('#section-6-pin'), 1200, {anim:pinAnimations});
	},
	section7: function() {
		var scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite();

		scrollorama.addTween("#section-7", TweenMax.from( $('#section-title-s-7-anim'), .3, {css:{opacity: 0, left: -300}, immediateRender: true}));

		scrollorama.addTween("#section-7", TweenMax.fromTo( $('#section-7-sub-1'), .3, {css:{opacity: 0, left: this.cache.screenW/2}}, {css:{opacity: 1, left: 0}}),600);

		pinAnimations.append([
								TweenMax.to( $('#section-7-sub-1'), .3, {css:{opacity: 0, left: -this.cache.screenW}}),
								TweenMax.fromTo( $('#section-7-sub-2'), .3, {css:{opacity: 0, left: this.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1).append([
								TweenMax.to( $('#section-7-sub-2'), .3, {css:{opacity: 0, left: -this.cache.screenW}}),
								TweenMax.fromTo( $('#section-7-sub-3'), .3, {css:{opacity: 0, left: this.cache.screenW}}, {css:{opacity: 1, left: 0}}),
							],.1)

		scrollorama.pin($('#section-7-pin'), 1200, {anim:pinAnimations});
	},
	section8: function() {
		var scrollorama = this.scrollorama,
			pinAnimations = new TimelineLite();

//		scrollorama.addTween("#section-8", TweenMax.from( $('#section-8-sub-1'), .3, {css:{opacity: 0}, immediateRender: true}));

		scrollorama.addTween("#section-8", TweenMax.from( $('#section-title-s-8-anim'), .3, {css:{opacity: 0, left: -300}, immediateRender: true}));


		scrollorama.addTween("#section-8", TweenMax.from( $('#section-8-sub-1'), .3, {css:{opacity: 0, left: this.cache.screenW/2}}, {css:{opacity: 1, left: 0}}),600);

		pinAnimations.append([
								TweenMax.fromTo( $('#tweet-s-8-1'), .3, {css:{opacity: 1}}, {css:{opacity: 0}}),
								TweenMax.fromTo( $('#section-title-s-8-anim'), .3, {css:{opacity: 0}}, {css:{opacity: 1}}),
								TweenMax.fromTo( $('#section-8-sub-2'), .3, {css:{opacity: 0}}, {css:{opacity: 1}}),
							],.1).append([
								TweenMax.fromTo( $('#section-8-sub-3'), .3, {css:{opacity: 0}}, {css:{opacity: 1}}),
							],.1).append([
								TweenMax.fromTo( $('#section-8-sub-4'), .3, {css:{opacity: 0}}, {css:{opacity: 1}}),
							],.1).append([
								TweenMax.fromTo( $('#section-8-sub-5'), .3, {css:{opacity: 0}}, {css:{opacity: 1}}),
							],.1)

		scrollorama.pin($('#section-8-pin'), 1200, {anim:pinAnimations});
	},
	section9: function() {
		var scrollorama = this.scrollorama;
		scrollorama.addTween("#section-9", TweenMax.to( $('#social'), .3, {css:{opacity: 0}, immediateRender: true}));
	}
};
efsa.actions = {
	init: function() {
		this.setBindings();
	},
	setBindings: function() {
		$('.bind-click-video').on('click', function(e) {
			e.preventDefault();
			$('body').addClass('modal-visible');
			$('#modal-content-placeholder').append("<iframe width='100%' height='100%' src='" + $(this).data("video") + "' frameborder='0' allowfullscreen></iframe>");
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
			$('#modal-content-placeholder').append("<iframe width='100%' height='100%' src='" + $(this).data("info") + "' frameborder='0' allowfullscreen></iframe>");
		});
		$('.bind-click-image').on('click', function(e) {
			e.preventDefault();
			$('body').addClass('modal-visible');

			$('#modal-content-placeholder').append("<div style='width:100%;height:100%;overflow-y:auto;background: #fff'><img style='margin:auto' src='" + $(this).data("image") + "'>");
		});
		$('#nav').on('mouseover', function() {
			$('body').addClass('show-navigation');
		});
		$('#nav-large').on('mouseout', function() {
			$('body').removeClass('show-navigation');
		});
	}
}
efsa.animalDiseasesCanvas = {
	config: {
		parentId: 'canvas',
		pointers: [
			[[0.0825,0.22583333333333333],[0.1625,0.18708333333333332],[0.5025,0.18708333333333332]]
		],
		dotsRadius: 2,
		dotsGap: 7
	},
	cache: {
		screenH: 0,
		dots: [],
		dotsAmount: [],
		scrollTop: 0
	},
	init: function() {
		this.canvas = document.getElementById(this.config.parentId);
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = $('#section-2').find('.content').width();
		this.canvas.height = $('#section-2').find('.content').height();
		this.createDots(this.config.pointers[0]);
		this.setData();
		this.setBindings();
	},
	setData: function() {
		var cache = this.cache;
		cache.screenH = window.innerHeight;
	},
	setBindings: function() {
		var self = this,
			cache = this.cache;
		$(window).on('scroll', function() {
			cache.scrollTop = $(window).scrollTop();
			if(cache.scrollTop > (cache.screenH + cache.screenH/2)) {
				self.draw1(self.ctx, (cache.scrollTop - (cache.screenH + cache.screenH/2)));
			}
		});
		$(window).on('resize', function() {
			self.setData();
		});
		$('#nav-mouse-pointer').on('mouseover', function() {
			$('body').addClass('show-navigation');
		});
		$('#nav-large').on('mouseout', function() {
			$('body').removeClass('show-navigation');
		});
	},
	createDots: function(pointers) {
		var self = this,
			config = this.config,
			cache = this.cache,
			canvas = this.canvas,
			dotsAmount = 0;
		for(var i = 1; i < pointers.length; i++) {
			var fromX = (pointers[i-1][0]*canvas.width),
				fromY = (pointers[i-1][1]*canvas.height),
				toX = (pointers[i][0]*canvas.width),
				toY = (pointers[i][1]*canvas.height),
				a = Math.abs(toX - fromX),
				b = Math.abs(toY - fromY),
				c2 = a*a+b*b-2*a*b*Math.cos(90 * Math.PI/180),
				c =Math.sqrt(c2),
				lineW = c.toFixed(2),
				steps = Math.ceil(lineW/config.dotsGap),
				stepsWidthX = (toX - fromX)/steps,
				stepsWidthY = (toY - fromY)/steps,
				x,
				y;
			for(var j = 0; j < steps; j++) {
				x = fromX + (j * stepsWidthX);
				y = fromY + (j * stepsWidthY);
				cache.dots.push([x,y]);
			}
			dotsAmount += steps;
		}
		cache.dotsAmount.push(dotsAmount);
		//return array;
	},
	draw: function(ctx) {
		var self = this,
			config = this.config,
			cache = this.cache;
		for(var i = 0; i < cache.dots.length; i++) {
			ctx.moveTo(cache.dots[i][0],cache.dots[i][1]);
			ctx.arc(cache.dots[i][0],cache.dots[i][1],config.dotsRadius,0,2*Math.PI);
		}
		ctx.fillStyle = "#ffffff"
		ctx.fill();
	},
	draw1: function(ctx, step) {
	}
};
efsa.anchorTag = {
	cache: {
		activeTag: true,
		active: 0,
		newActive: 0,
		linkAnchors: [],
		scrollTop: 0
	},
	init: function() {
		var cache = this.cache;
		$('.section-anchor').each(function(i, elem) {
			var $this = $(this);
			cache.linkAnchors.push([$this.offset().top, $this.attr('id')]);
		});
		this.setBindings();
	},
	setBindings: function() {
		var self = this,
			cache = this.cache,
			scrollDirection = 'down';
		$(window).on('scroll', function() {
			var screenOffset = window.pageYOffset;
			if(cache.activeTag) {
				if(cache.scrollTop < screenOffset) {
					for(var i = 0; i < cache.linkAnchors.length; i += 1) {
						if(screenOffset > cache.linkAnchors[i][0]) {
							if(i < cache.linkAnchors.length-1) {
								if(screenOffset < cache.linkAnchors[i+1][0]) {
									cache.newActive = i;
								}
							} else {
								cache.newActive = i;
							}
						}
					}
					cache.scrollTop = screenOffset;
					scrollDirection = 'down';
				} else {
					for (var i = cache.linkAnchors.length - 1; i >= 0; i--) {
						if(i < cache.linkAnchors.length - 1) {
							if(screenOffset < cache.linkAnchors[i+1][0]) {
								cache.newActive = i;
							}
						}

					};
					scrollDirection = 'up';
				}
				if(cache.newActive !== cache.active) {
					if(scrollDirection === 'down') {
						window.location.hash = '#' + cache.linkAnchors[cache.newActive][1];
					}
					 $('.menu').find('li').removeClass('active');
					 $('.menu').find('.menu-s-'+ cache.linkAnchors[cache.newActive][1]).parent().addClass('active');
					 $('body').removeClass('active-section-' + cache.linkAnchors[cache.active][1]).addClass('active-section-' + cache.linkAnchors[cache.newActive][1]);
					 cache.active = cache.newActive;
				}
			}
		});
	},
	updateTag: function() {

	}
}
$(document).ready(function(){
	efsa.screenWatch.init();
	efsa.animations.init();
	efsa.preload.init();
	efsa.actions.init();
	efsa.anchorTag.init();
});
