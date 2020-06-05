(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-23121873-1', 'auto');
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');

(function($){
	/* Menu toggler
	*************/

	var menu = $('#menu-wrapper');
	var toggleMenu = function(e, force, noanimate) {
		if(!force || force !== menu.hasClass('closed')) {
			var right = menu.hasClass('closed') ? 0 : -menu.outerWidth(true);
			menu.toggleClass('closed');
			if(noanimate) menu.css({right: right});
			else menu.animate({right: right}, 1000, 'easeOutBounce');
		}
	};
	menu.find('.toggler').on('click', toggleMenu);
	
	toggleMenu(null, false, true);
	
	// menu link
	menu.find('.scrollTo').on('click', function(e){
		e.preventDefault();
		$.scrollTo($(this).attr('href'), 800);
	});

	/* Popups
	*******/
	$('.popup .bubble').hide(0);
	$('.popup .toggler').on('click', function(e){
		e.preventDefault();
		$(this).next('.bubble').fadeToggle(function(){
			if($(this).is(':visible')) {
				var textboxname = $(this).prev('.toggler').text();
			}
		});
	});

	$("#carousel-topic").carousel({ interval: false });

	$('.topics li').on('click', function() {
		$('#schemaModal').modal();
	});
	$('.council, .council-info').on('click', function() {
		$('#schemaModalSciCom').modal();
	});

	var i = 0;
	$('.video-link').each(function(){
		$(this).data('index', ++i);
		$(this).on('click', function() {
			$('#youtubeModal .modal-body').html('<iframe width="598" height="450" src="' + $(this).data('video') + '" frameborder="0" allowfullscreen></iframe>');
			$('#youtubeModal').modal();
			ga('set', 'nonInteraction', true);
			ga('send', 'event', {eventCategory: 'Video '+$(this).data('name'), eventAction: 'Opened'});
		});
	});

	$('#youtubeModal').on('hidden.bs.modal', function() {
		$('#youtubeModal .modal-body').empty();
	});


	/* window.load REQUIRED because using the pictures sizes
	*********************************************************/
	$(window).load(function(){
		/* Home screen resize
		*******************/

		var windowH = $(window).height();
		var resizeHome = function() {
			windowH = $(window).height();
			$('#home-wrapper').height(windowH);
		};
		resizeHome();
		toggleMenu(null, false, true);

		/* Scroll indication
		******************/
		var scrolling = false,
			animating = false,
			scrollingTimer = null,
			pulsating = false,
			pulsate = function(elem){
				var speed = 1000;
				$(elem).stop().fadeOut(speed, function() {
					$(elem).fadeIn(speed, function() {
						pulsate(elem);
					});
				});
			},
			isScrolling = function() {
				if(scrollingTimer) {
					clearTimeout(scrollingTimer);
				}
				if(scrolling) {
					return scrollingTimer = setTimeout(function() {
						scrolling = false;
						return isScrolling();
					}, 2500);
				}
			},
			checkScroll = function(){
				// console.log('(animating: '+animating+' || scrolling: '+scrolling+') && pulsating: '+pulsating+'');
				var footerTop = $('#footer-wrapper').offset().top - 50,
					reachedFooterTop = $(window).scrollTop() + $(window).height() - footerTop > 0;
				if((animating || scrolling) && pulsating){
					pulsating = false;
					$('#scroll-advice').stop().hide();
				}else if(!pulsating && !reachedFooterTop){
					pulsating = true;
					pulsate($('#scroll-advice').show(), true);
				}
			};

		setInterval(checkScroll, 1000);
		$(window).on('scroll', function() {
			scrolling = true;
			isScrolling();
		});

		/* Init animation
		***************/

		var scrollanim = $.superscrollorama({
			triggerAtCenter: false
		});


		/* Home animation
		***************/

		/* Starting elements */
		var homeTL = (new TimelineLite());
		//homeTL.append(TweenMax.from('#home-wrapper .mosaic', 1, {css: {marginLeft: -300}, ease: Cubic.easeOut}));
		homeTL.append(TweenMax.from('#home-wrapper h1', 1, {css: {marginTop: -200, opacity: 0}, ease: Cubic.easeOut}));
		$('#home-wrapper h3 span').each(function(){
			homeTL.append(TweenMax.from(this, .4, {css: {opacity: 0}, delay: .2, ease: Bounce.easeOut}));
		});

		/* Paralax mosaic */
		scrollanim.addTween('#home-wrapper', TweenMax.to('#home-wrapper .mosaic .img-1', 1, {css:{ left: '-250px' }}), 300, 0);
		scrollanim.addTween('#home-wrapper', TweenMax.to('#home-wrapper .mosaic .img-2', 1, {css:{ left: '-300px' }}), 200, 10);
		scrollanim.addTween('#home-wrapper', TweenMax.to('#home-wrapper .mosaic .img-3', 1, {css:{ left: '-250px' }}), 100, 10);
		scrollanim.addTween('#home-wrapper', TweenMax.to('#home-wrapper .mosaic .img-4', 1, {css:{ left: '-300px' }}), 200, 20);

		/* Hide social links at the bottom */
		scrollanim.addTween('#main-wrapper .bottom_marker', TweenMax.to('#social-menu', 1, {css:{opacity: 0}}));

		/* Receipt of request part
		************************/
		var receiptTL1 = new TimelineLite({
			onStart: function() {
				// Ends home animation if starts
				homeTL.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = false;
			}
		});

		var receiptTL2 = new TimelineLite({
			onStart: function() {
				// Ends receiptTL1 animation if starts
				receiptTL1.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = false;
			}
		});

		var receiptTL3 = new TimelineLite({
			onStart: function() {
				// Ends receiptTL2 animation if starts
				receiptTL2.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = false;
			}
		});

		var receiptTL4= new TimelineLite({
			onStart: function() {
				// Ends receiptTL3 animation if starts
				receiptTL3.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = false;
			}
		});

		/* Text pop in */
		/*$('#receipt-wrapper .institutions-title').each(function(){
			receiptTL1.append(TweenMax.from(this, .3, {css: {opacity: 0}, delay: 0.2}));
		});
		/* Logo grew up 
		receiptTL1.append(TweenMax.from($('#receipt-wrapper .institutions-icon .logo'), .4, {
			css: {
				width: 0,
				height: 0
			},
			delay: 1.1
		}));*/
		/* [eworx:eka] Change the animation after the structural change*/
		/* EC title and icon */
		$('#receipt-wrapper .ec .institutions-title').each(function(){
			receiptTL1.append(TweenMax.from(this, .2, {css: {opacity: 0}, delay: 0.2}));
		});
		receiptTL1.append(TweenMax.from($('#receipt-wrapper .ec .logo'), .3, {
			css: {
				width: 0,
				height: 0
			},
			delay: 0.2
		}));
		/* Other title and icon */
		$('#receipt-wrapper .other .institutions-title').each(function(){
			receiptTL1.append(TweenMax.from(this, .2, {css: {opacity: 0}, delay: 0.2}));
		});
		receiptTL1.append(TweenMax.from($('#receipt-wrapper .other .logo'), .3, {
			css: {
				width: 0,
				height: 0
			},
			delay: 0.2
		}));
		/* Parl title and icon*/
		$('#receipt-wrapper .parl .institutions-title').each(function(){
			receiptTL1.append(TweenMax.from(this, .2, {css: {opacity: 0}, delay: 0.2}));
		});
		receiptTL1.append(TweenMax.from($('#receipt-wrapper .parl .logo'), .3, {
			css: {
				width: 0,
				height: 0
			},
			delay: 0.2
		}));

		$('#receipt-wrapper .intro').each(function(){
			receiptTL1.append(TweenMax.from(this, .3, {css: {opacity: 0}, delay: 0.2}));
		});

		/* lines draw */
		$('#receipt-wrapper .institutions-icon .line').each(function(){
			receiptTL1.append(TweenMax.from($(this), .6, {height:0}));
		});

		/* sa icons move */
		// default position set manually to avoid fromTo glitch
		$('#receipt-wrapper .ec .ico').css({
			top: 115,
			left: 181,
			width: 35
		});
		$('#receipt-wrapper .other .ico').css({
			top: 115,
			left: 150,
			width: 35
		});
		$('#receipt-wrapper .parl .ico').css({
			top: 115,
			left: 120,
			width: 35
		});
		// fade in first
		receiptTL1.append(TweenMax.from($('#receipt-wrapper .institutions-icon .ico'), .4, {css: {opacity: 0}}));
		// then move
		receiptTL1.append(TweenMax.to($('#receipt-wrapper .ec .ico'), 0.8, {css:{
			width: 120,
			left: 436,
			top: 320
		}}));
		receiptTL1.append(TweenMax.to($('#receipt-wrapper .other .ico'), 0.8, {css: {
			width: 120,
			left: 99,
			top: 320
		}}));
		receiptTL1.append(TweenMax.to($('#receipt-wrapper .parl .ico'), 0.8, {css: {
			width: 120,
			left: -239,
			top: 320
		}}));

		/* self-tasking */
		receiptTL2.append(TweenMax.from($('#receipt-wrapper .line-sa'), 1, {height:0}));
		receiptTL2.append(TweenMax.from($('#receipt-wrapper .self-tasking .ico-st, #receipt-wrapper .self-tasking .ico-sa'), 1, {opacity:0}));
		receiptTL2.append(TweenMax.from($('#receipt-wrapper .self-tasking .toggler'), 1, {opacity:0}));
		receiptTL2.append(TweenMax.from($('#receipt-wrapper .line-st'), 1, {height:0}));

		/* should to mandate */
		receiptTL2.append(TweenMax.from($('#receipt-wrapper .to-mandate'), 1, {opacity: 0}));
		receiptTL2.append(TweenMax.from($('#receipt-wrapper .to-mandate .info'), 1, {opacity: 0}));
		receiptTL2.append(TweenMax.to($('#receipt-wrapper .ico-sa'), 1, {width:60, top:365, left: 660, opacity: 0.8}));
		receiptTL2.append(TweenMax.to($('#receipt-wrapper .ico-sa'), 1, {css:{opacity: 0}, delay: 0.4}));
		receiptTL2.append(TweenMax.fromTo($('#receipt-wrapper .to-mandate .ico'), 1, {opacity: 0}, {css:{opacity: 0.8}, delay: 0.4}));

		/* send mandate to committee*/
		receiptTL3.append(TweenMax.from($('#receipt-wrapper .to-mandate .line'), 1, {height: 0}));
		receiptTL3.append(TweenMax.from($('#receipt-wrapper .info-mandate'), 1, {opacity:0, right: -100}));
		receiptTL3.append(TweenMax.from($('#receipt-wrapper .expert-committee .council'), 1, {opacity: 0}));
		$('#receipt-wrapper .expert-committee li').each(function(){
			receiptTL3.append(TweenMax.from(this, 0.2, {opacity: 0}));
		});
		receiptTL3.append(TweenMax.from($('#receipt-wrapper .expert-committee .info'), 1, {opacity: 0}));
		receiptTL3.append(TweenMax.fromTo($('#receipt-wrapper .to-mandate .ico'), 1, {css:{
			top: 115,
			right: 325,
			width: 58
		}}, {css: {
			top: 530,
			right: 545
		}, delay: 0.4}));
		receiptTL3.append(TweenMax.to($('#receipt-wrapper .to-mandate .ico'), 1, { top: 925, right: 604}));

		/* ending part 1 */
		receiptTL4.append(TweenMax.from($('#receipt-wrapper .video-ending .video'), 1, { opacity: 0}));
		receiptTL4.append(TweenMax.from($('#receipt-wrapper .video-ending .line'), 1, {css: { height: 0}, delay: .5}));
		receiptTL4.append(TweenMax.to($('#receipt-wrapper .to-mandate .ico'), 1, { right: 485, top: 960 }));
		receiptTL4.append(TweenMax.to($('#receipt-wrapper .to-mandate .ico'), 1, { right: 485, top: 1300, opacity: 0 }));
		receiptTL4.append(TweenMax.from($('#assessment-wrapper'), 1, {css:{ opacity: 0}, delay: 0}));

		scrollanim.addTween('#receipt-wrapper', receiptTL1, 0, -200, false);
		scrollanim.addTween('#receipt-wrapper .institutions-icon', receiptTL2, 0, 100, false);
		scrollanim.addTween('#receipt-wrapper .to-mandate', receiptTL3, 0, 0, false);
		scrollanim.addTween('#receipt-wrapper .expert-committee', receiptTL4, 0, 200, false);



		/* Assessment part
		****************/
		var assessTL1 = new TimelineLite({
			onStart: function() {
				// Ends home animation if starts
				receiptTL4.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = false;
			}
		});

		var assessTL2 = new TimelineLite({
			onStart: function() {
				// Ends home animation if starts
				assessTL1.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = false;
			}
		});

		var assessTL3 = new TimelineLite({
			onStart: function() {
				// Ends home animation if starts
				assessTL2.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = false;
			}
		});

		var assessTL4 = new TimelineLite({
			onStart: function() {
				// Ends home animation if starts
				assessTL3.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = false;
			}
		});

		assessTL1.append(TweenMax.from($('#assessment-wrapper .intro .info'), 1, {opacity: 0}));
		assessTL1.append(TweenMax.from($('#assessment-wrapper .intro .line'), 1, {css: {height: 0}, delay: 1}));
		assessTL1.append(TweenMax.from($('#assessment-wrapper .intro .ico-working'), 1, {width: 0, height: 0, top: 165, left: 285 }));
		assessTL1.append(TweenMax.from($('#assessment-wrapper .intro .ico-video'), 1, {opacity: 0}));

		assessTL2.append(TweenMax.from($('#assessment-wrapper .complex .info'), 1, {opacity: 0}));
		assessTL2.append([
			TweenMax.from($('#assessment-wrapper .complex-line'), 2.5, {height: 0}),

			TweenMax.from($('#assessment-wrapper .complex .label-se'), .7, {css: {opacity: 0}, delay: .8}),
			TweenMax.from($('#assessment-wrapper .complex .label-exp'), .7, {css: {opacity: 0}, delay: 1}),
			TweenMax.from($('#assessment-wrapper .complex .label-lit'), .7, {css: {opacity: 0}, delay: 1.2}),
			TweenMax.from($('#assessment-wrapper .complex .label-data'), .7, {css: {opacity: 0}, delay: 1.3}),

			TweenMax.from($('#assessment-wrapper .complex .ico-se'), .7, {css: {width: 0, height: 0, top: 425, left: 425 }, delay: .8}),
			TweenMax.from($('#assessment-wrapper .complex .ico-exp'), .7, {css: {width: 0, height: 0, top: 405, left: 755  }, delay: 1}),
			TweenMax.from($('#assessment-wrapper .complex .ico-lit'), .7, {css: {width: 0, height: 0, top: 605, left: 305  }, delay: 1.2}),
			TweenMax.from($('#assessment-wrapper .complex .ico-data'), .7, {css: {width: 0, height: 0, top: 615, left: 535  }, delay: 1.3}),
			TweenMax.from($('#assessment-wrapper .complex .ico-draft'), .7, {css: {width: 0, height: 0, marginTop: 55, marginLeft: 55  }, delay: 1.5})
		]);

		assessTL2.append(TweenMax.from($('#assessment-wrapper .complex .toggler'), 1, {opacity: 0}));
		assessTL2.append(TweenMax.to($('#assessment-wrapper .storyteller'), 1, {opacity: 1}));

		assessTL3.append(TweenMax.from($('#assessment-wrapper .draft-opinion .info-1'), 1, {opacity: 0}));
		assessTL3.append(TweenMax.from($('#assessment-wrapper .storyteller'), 1, {opacity: 0}));
		assessTL3.append(TweenMax.from($('#assessment-wrapper .draft-opinion .line-1'), 1, {height: 0}));
		assessTL3.append(TweenMax.from($('#assessment-wrapper .draft-opinion .panel'), 1, {height: 0, width: 0, top: 337, left: 607}));
		assessTL3.append(TweenMax.to($('#assessment-wrapper .storyteller-1'), 1, {top: 1455}));

		assessTL4.append(TweenMax.from($('#assessment-wrapper .draft-opinion .info-2'), 1, {opacity: 0}));
		assessTL4.append(TweenMax.from($('#assessment-wrapper .draft-opinion .toggler'), 1, {opacity: 0}));
		assessTL4.append(TweenMax.from($('#assessment-wrapper .draft-opinion .line-2'), 1, {height: 0}));
		assessTL4.append(TweenMax.from($('#assessment-wrapper .draft-opinion .chat'), 1, {height: 0, width: 0, top: 625, left: 470}));
		assessTL4.append(TweenMax.from($('#assessment-wrapper .draft-opinion .info-3'), 1, {opacity: 0}));
		assessTL4.append(TweenMax.from($('#assessment-wrapper .draft-opinion .line-3'), 1, {height: 0}));
		assessTL4.append(TweenMax.to($('#assessment-wrapper .storyteller-1'), 1, {top: 1720, left: 450}));
		assessTL4.append(TweenMax.to($('#assessment-wrapper .storyteller-1'), 1, {top: 1900, left: 510, opacity: 0}));
		assessTL4.append(TweenMax.from($('#adoption-wrapper'), 1, {css:{opacity: 0}, delay: 1}));

		scrollanim.addTween('#assessment-wrapper', assessTL1, 0, -200, false);
		scrollanim.addTween('#assessment-wrapper .video-link', assessTL2, 0, 0, false);
		scrollanim.addTween('#assessment-wrapper .draft-opinion', assessTL3, 0, -300, false);
		scrollanim.addTween('#assessment-wrapper .draft-opinion .info-1', assessTL4, 0, 0, false);



		/* Adoption part
		****************/
		var adoptTL1 = new TimelineLite({
			onStart: function() {
				// Ends home animation if starts
				assessTL4.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = false;
			}
		});

		var adoptTL2 = new TimelineLite({
			onStart: function() {
				// Ends home animation if starts
				adoptTL1.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = false;
			}
		});

		var adoptTL3 = new TimelineLite({
			onStart: function() {
				// Ends home animation if starts
				adoptTL2.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = false;
			}
		});

		var adoptTL4 = new TimelineLite({
			onStart: function() {
				// Ends home animation if starts
				adoptTL3.totalProgress(1);
				animating = true;
			},
			onComplete: function() {
				animating = true;
			}
		});

		adoptTL1.append(TweenMax.from($('#adoption-wrapper .consensus .line'), 1, {height: 0}));
		adoptTL1.append(TweenMax.from($('#adoption-wrapper .consensus .info'), 1, {opacity: 0}));
		adoptTL1.append(TweenMax.from($('#adoption-wrapper .consensus .ico'), 1, {height: 0, width: 0, top: 139, left: 588}));
		adoptTL1.append(TweenMax.fromTo($('#adoption-wrapper .storyteller'), 1, {top: -150, left: 510, opacity: 0}, {top: 0, left: 540, opacity: 1}));
		adoptTL1.append(TweenMax.to($('#adoption-wrapper .storyteller'), 1, {left: 556, top: 128, width: 30}));

		adoptTL1.append(TweenMax.from($('#adoption-wrapper .consensus .video'), 1, {opacity: 0}));

		adoptTL2.append(TweenMax.from($('#adoption-wrapper .efsa-opinion .top-line'), 1, {height: 0}));
		adoptTL2.append(TweenMax.from($('#adoption-wrapper .efsa-opinion .opinion'), 1, {opacity: 0}));
		adoptTL2.append(TweenMax.to($('#adoption-wrapper .storyteller'), 1, {top: 380, left: 470, opacity: 0}));
		$('#adoption-wrapper .institutions-opinion .line-1').each(function(){
			adoptTL2.append(TweenMax.from(this, 0.5, {height: 0}));
			var ico = $(this).next('.ico');
			var label = ico.next('.label');
			adoptTL2.append([
				TweenMax.from(ico, 0.8, {height: 0, width: 0, marginTop: parseInt(ico.css('marginTop'))+75, marginLeft: 75}),
				TweenMax.from(label, 0.7, {opacity: 0})
			]);

		});
		adoptTL2.append(TweenMax.fromTo($('#adoption-wrapper .storyteller-1'), 1, {top: 490, left: 270}, {top: 655, left: 50, opacity: 1}));
		adoptTL2.append(TweenMax.fromTo($('#adoption-wrapper .storyteller-2'), 1, {top: 490, left: 395}, {top: 725, left: 260, opacity: 1}));
		adoptTL2.append(TweenMax.fromTo($('#adoption-wrapper .storyteller-3'), 1, {top: 490, left: 525}, {top: 720, left: 460, opacity: 1}));
		adoptTL2.append(TweenMax.from($('#adoption-wrapper .selftask .popup, #adoption-wrapper .selftask .info'), 1, {opacity: 0}));
		adoptTL2.append(TweenMax.from($('#adoption-wrapper .journal-video'), 1, {opacity: 0}));

		adoptTL3.append(TweenMax.from($('#adoption-wrapper .ec .line-2, #adoption-wrapper .other .line-2, #adoption-wrapper .parl .line-2'), 1, {height: 0}));
		adoptTL3.append(TweenMax.to($('#adoption-wrapper .storyteller'), 1, {top: 1000, opacity: 0}));
		adoptTL3.append(TweenMax.from($('#adoption-wrapper .policy'), 1, {opacity: 0}));
		adoptTL3.append(TweenMax.from($('#adoption-wrapper .assessmt-vs-managmt'), 1, {opacity: 0}));
		adoptTL3.append(TweenMax.from($('#adoption-wrapper .end .line'), 1, {height: 0}));
		adoptTL3.append(TweenMax.from($('#adoption-wrapper .end .ico'), 1, {opacity: 0}));
		adoptTL3.append(TweenMax.from($('#adoption-wrapper .end .conclusion'), 1, {opacity: 0}));
		
		scrollanim.addTween('#adoption-wrapper', adoptTL1, 0, -200, false);
		scrollanim.addTween('#adoption-wrapper .consensus', adoptTL2, 0, 0, false);
		scrollanim.addTween('#adoption-wrapper .institutions-opinion', adoptTL3, 0, 0, false);


		//menu highlights
		$('.section-menu a').each(function(){
			/*scrollanim.addTween($(this).attr('href'), TweenMax.to('.section-menu a', 1, {color: '#FFFFFF'}), 0, -1);
			scrollanim.addTween($(this).attr('href'), TweenMax.to($(this), 1, {color: '#E57E4C'}), 0, -1);*/
			/* [eworx:eka] more elaborate highlight which is better done with a css class*/
			scrollanim.addTween($(this).attr('href'), TweenMax.to('.section-menu a', 1, {backgroundColor: 'transparent',borderColor:'transparent'}), 0, -1);
			scrollanim.addTween($(this).attr('href'), TweenMax.to($(this), 1, {backgroundColor: '#E57E4C',borderColor: '#fff'}), 0, -1);
		});

	});

	function resize_markers() {
		$('.bottom_marker').height($(window).height());	
	}

	resize_markers();
	$(window).resize(resize_markers);

})(jQuery);
