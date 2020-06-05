(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-23121873-1', 'auto');
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');

$(function () {

    var $window = $(window);

    efsa.preload();
    efsa.init();

    $(window).resize(_.debounce(efsa.init.bind(efsa), 500));

    var controller = new ScrollMagic.Controller();

    if (!navigator.userAgent.match(/Trident/i)) {
        animateParallax(controller);
        animateMap(controller);
        animateBacterium(controller);
    }

    animateMenu(controller);
    animateFood(controller);

    // Main Menu
    // change behaviour of controller to animate scroll instead of jump
    controller.scrollTo(function (newpos, cb) {
        TweenMax.to(window, 1, {scrollTo: {y: newpos}, onComplete: cb});
    });

    // Bind scroll to anchor links
    $(document).on('click', "a[href^='#']", function (e) {
        var id = $(this).attr('href');

        if ($(id).length > 0) {
            e.preventDefault();

            // Trigger scroll
            controller.scrollTo(id, function () {
                window.location.hash = id;
            });
        }
    });

    animateMolecularTyping(controller);
    animateIntroTitle(controller);
    animateDnaTitle(controller);
    animateHeader(controller);
    animateFooter(controller);
    animateGenomeHeader(controller);
    animateGenomeFooter(controller);
    animateGenomeFrames(controller);

    animateHowItWorksTitle(controller);
    animateBacteriumTitle(controller);

    var footerPos = $('.footer').offset().top;

    $window.scroll(function () {
        var scrolled = $(window).scrollTop();

        if (scrolled >= 1 && scrolled < footerPos) {
            $('.intro-header').css({
                position: 'fixed',
                display: 'block'
            });
        } else {
            $('.intro-header').css({
                position: 'absolute',
                display: 'none'
            });
        }
    });

});

isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

window.efsa = window.efsa || {};

efsa = {
    config: {},
    cache: {
        currentWidth: 0,
        sectionsLoaded: 0
    },
    init: function () {
        var width = viewportSize.getWidth();

        if (width >= 1200) {
            if (this.cache.currentWidth < 1200) {
                drawBracketsSvg('#intro-brackets', 900, 182);
                drawBracketsSvg('#header-brackets', 540, 99);

                drawAimSVG('#food-aim', 1200, 800, true);
                drawAimSVG('#genome-aim', 1020, 350);

                drawSightSVG('#dna-sight', 800, 150);
                drawSightSVG('#how-it-works-sight', 650, 150);
                drawSightSVG('#bacterium-sight', 810, 240, true);

                drawBorderSVG('#molecular-video-border', 850, 500, true);
                drawBorderSVG('#genome-header-border', 850, 150);
            }
        } else if (width >= 767) {
            if (this.cache.currentWidth < 767 || this.cache.currentWidth >= 1200) {
                drawBracketsSvg('#intro-brackets', 750, 160);
                drawBracketsSvg('#header-brackets', 412, 83);

                drawAimSVG('#food-aim', 760, 540, true);
                drawAimSVG('#genome-aim', 690, 300);

                drawSightSVG('#dna-sight', 660, 120);
                drawSightSVG('#how-it-works-sight', 416, 96);
                drawSightSVG('#bacterium-sight', 518, 154, true);

                drawBorderSVG('#molecular-video-border', 800, 500, true);
                drawBorderSVG('#genome-header-border', 740, 110);
            }
        } else if (width >= 680) {
            if (this.cache.currentWidth < 680 || this.cache.currentWidth >= 768) {
                drawBracketsSvg('#intro-brackets', 660, 150);
                drawBracketsSvg('#header-brackets', 365, 74);

                drawAimSVG('#food-aim', 680, 454, true);
                drawAimSVG('#genome-aim', 640, 360);

                drawSightSVG('#dna-sight', 454, 85);
                drawSightSVG('#how-it-works-sight', 440, 95);
                drawSightSVG('#bacterium-sight', 460, 136, true);

                drawBorderSVG('#molecular-video-border', 482, 284, true);
                drawBorderSVG('#genome-header-border', 600, 105);
            }
        } else if (width >= 480) {
            if (this.cache.currentWidth < 480 || this.cache.currentWidth >= 679) {
                drawBracketsSvg('#intro-brackets', 360, 73);
                drawBracketsSvg('#header-brackets', 258, 52);

                drawAimSVG('#food-aim', 480, 320, true);
                drawAimSVG('#genome-aim', 540, 180);

                drawSightSVG('#dna-sight', 320, 70);
                drawSightSVG('#how-it-works-sight', 380, 100);
                drawSightSVG('#bacterium-sight', 324, 94, true);

                drawBorderSVG('#molecular-video-border', 340, 200, true);
                drawBorderSVG('#genome-header-border', 540, 90);
            }
        } else { // if (width >= 320) {
            drawBracketsSvg('#intro-brackets', 310, 73);
            drawBracketsSvg('#header-brackets', 172, 34);

            drawAimSVG('#food-aim', 320, 214, true);
            drawAimSVG('#genome-aim', 310, 230);

            drawSightSVG('#dna-sight', 290, 85);
            drawSightSVG('#how-it-works-sight', 260, 130);
            drawSightSVG('#bacterium-sight', 290, 370, true);

            drawBorderSVG('#molecular-video-border', 356, 240, true);
            drawBorderSVG('#genome-header-border', 360, 150);
        }

        if (navigator.userAgent.match(/Trident/i)) {
            $('body')
                .on('mousewheel', function () {
                    event.preventDefault();

                    var wheelDelta = event.wheelDelta,
                        currentScrollPosition = window.pageYOffset;

                    window.scrollTo(0, currentScrollPosition - wheelDelta);
                })
                .addClass('ie')
            ;
        }

        this.cache.currentWidth = width;
    },
    preload: function () {
        this.getFiles();
    },
    getFiles: function () {
        var self = this,
            files = [],
            $section = $('section').eq(this.cache.sectionsLoaded++);

        if ($section.length) {
            $('.preload', $section).each(function () {
                files.push('/sites/default/files/interactive_tools/moleculartyping/img/' + $(this).data('preload'));
            });

            if (files.length) {
                self.images(files, function (images) {
                    $('.preload', $section).each(function () {
                        $(this).attr('src', '/sites/default/files/interactive_tools/moleculartyping/img/' + $(this).data('preload'));
                    });

                    $('body').addClass('page-preloaded');

                    setTimeout(function () {
                        $('#preload').animate(
                            {opacity: '0'},
                            {
                                duration: .3,
                                complete: function () {
                                    $('html').addClass('page-ready');

                                    if (location.hash) {
                                        $('.main-menu-list')
                                            .find('a[href="' + location.hash + '"]')
                                            .trigger('click')
                                        ;
                                    }
                                }
                            }
                        );
                    }, 200);
                });
            }

            this.getFiles();

        } else {
            if (navigator.userAgent.match(/iPad/i) || !isMobile.any()) {
                for (var i = 1; i < 326; i++) {
                    files.push('/sites/default/files/interactive_tools/moleculartyping/img/Images-for-parallax/EFSA_MTS_Video_290915 ' + ('00' + i).slice(-3) + '.jpg');
                }

                self.images(files, function (images) {
                    $('#genome-section-frame').addClass('frames-ready');
                });

                $(window).on('load', function () {
                    $('.molecular-typing-video.hidden-xs')[0].play();
                });
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

function pathsPrepare($paths) {
    $paths.each(function () {
        var $el = $(this),
            oldDasharray = parseInt($el.css('stroke-dasharray'), 10),
            oldDashoffset = parseInt($el.css('stroke-dashoffset'), 10),
            dashoffset,
            lineLength = this.getTotalLength();

        $el.css('stroke-dasharray', lineLength);

        if (oldDasharray && !oldDashoffset) {
            dashoffset = 0;
        } else {
            dashoffset = lineLength;
        }

        $el.css('stroke-dashoffset', dashoffset);
    });
}

function drawBracketsSvg(id, width, height) {
    var $svg = $(id).width(width).height(height),
        $paths = $('path', $svg),

        bracketWidth = width / 18,
        thickness = bracketWidth / 5 * 2,

        drawing = [];

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        drawing.push('M ' + bracketWidth + ',1');
        drawing.push('L 1,1');
        drawing.push('L 1,' + height);
    } else {
        drawing.push('M ' + bracketWidth + ',0');
        drawing.push('L 0,0');
        drawing.push('L 0,' + height);
    }

    drawing.push('L ' + bracketWidth + ',' + height);

    $paths.eq(0).attr('d', drawing.join(' '));

    drawing = [];

    drawing.push('M ' + bracketWidth + ',' + thickness);
    drawing.push('L ' + thickness + ',' + thickness);
    drawing.push('L ' + thickness + ',' + (height - thickness));
    drawing.push('L ' + bracketWidth + ',' + (height - thickness));

    $paths.eq(1).attr('d', drawing.join(' '));

    drawing = [];

    drawing.push('M ' + (width - bracketWidth) + ',' + thickness);
    drawing.push('L ' + (width - thickness) + ',' + thickness);
    drawing.push('L ' + (width - thickness) + ',' + (height - thickness));
    drawing.push('L ' + (width - bracketWidth) + ',' + (height - thickness));

    $paths.eq(2).attr('d', drawing.join(' '));

    drawing = [];

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        drawing.push('M ' + (width - bracketWidth) + ',1');
        drawing.push('L ' + width + ',1');
    } else {
        drawing.push('M ' + (width - bracketWidth) + ',0');
        drawing.push('L ' + width + ',0');
    }

    drawing.push('L ' + width + ',' + height);
    drawing.push('L ' + (width - bracketWidth) + ',' + height);

    $paths.eq(3).attr('d', drawing.join(' '));

    pathsPrepare($paths);
}

function drawAimSVG(id, width, height, withRectangles) {
    var $svg = $(id).width(width).height(height),
        $paths = $('path', $svg),

        halfX = width / 2, halfY = height / 2,

        chunkX = width / 6, chunkY = height / 5,
        halfChunkX = chunkX / 2, halfChunkY = chunkY / 2,

        drawing = [];

    drawing.push('M ' + halfChunkX + ',' + halfChunkY);
    drawing.push('L ' + halfChunkX + ',' + (height - halfChunkY));
    drawing.push('L ' + (width - halfChunkX) + ',' + (height - halfChunkY));
    drawing.push('L ' + (width - halfChunkX) + ',' + halfChunkY);
    drawing.push('Z');

    drawing.push('M 0,' + halfY);
    drawing.push('L ' + chunkX + ',' + halfY);
    drawing.push('M ' + (width - chunkX) + ',' + halfY);
    drawing.push('L ' + width + ',' + halfY);

    drawing.push('M ' + halfX + ',0');
    drawing.push('L ' + halfX + ',' + chunkY);
    drawing.push('M ' + halfX + ',' + (height - chunkY));
    drawing.push('L ' + halfX + ',' + height);

    $paths.eq(0).attr('d', drawing.join(' '));

    var paddingX = chunkX / 6 * 5, paddingY = chunkY / 6 * 5;

    drawing = [];

    drawing.push('M ' + paddingX + ',' + paddingY);
    drawing.push('L ' + (width - paddingX) + ',' + paddingY);
    drawing.push('L ' + (width - paddingX) + ',' + (height - paddingY));
    drawing.push('L ' + paddingX + ',' + (height - paddingY));
    drawing.push('Z');

    $paths.eq(1).attr('d', drawing.join(' '));

    if (withRectangles) {
        var $rectangles = $('rect', $svg);

        $rectangles.eq(0).attr('x', halfChunkX - 4).attr('y', halfChunkY - 4);
        $rectangles.eq(1).attr('x', halfChunkX - 4).attr('y', height - halfChunkY - 4);
        $rectangles.eq(2).attr('x', width - halfChunkX - 4).attr('y', height - halfChunkY - 4);
        $rectangles.eq(3).attr('x', width - halfChunkX - 4).attr('y', halfChunkY - 4);
    }

    pathsPrepare($paths);
}

function drawSightSVG(id, width, height, onlyLines) {
    var $svg = $(id).width(width).height(height),
        $paths = $('path', $svg),

        halfX = width / 2, halfY = height / 2,
        pathCount = 0;

    if (!onlyLines) {
        var thickness = 5,
            drawing = [];

        drawing.push('M 0,0');
        drawing.push('L 0,' + (height - thickness));
        drawing.push('L ' + (width - thickness) + ',' + (height - thickness));
        drawing.push('L ' + (width - thickness) + ',0');
        drawing.push('Z');

        $paths.eq(pathCount++).attr('d', drawing.join(' '));

        drawing = [];

        drawing.push('M ' + thickness + ',' + thickness);
        drawing.push('L ' + width + ',' + thickness);
        drawing.push('L ' + width + ',' + height);
        drawing.push('L ' + thickness + ',' + height);
        drawing.push('Z');

        $paths.eq(pathCount++).attr('d', drawing.join(' '));
    }

    drawing = [];

    drawing.push('M ' + halfX + ',0');
    drawing.push('L ' + halfX + ',-2000');
    drawing.push('M ' + halfX + ',' + height);
    drawing.push('L ' + halfX + ',' + (height + 2000));
    drawing.push('M -2000,' + halfY);
    drawing.push('L 0,' + halfY);
    drawing.push('M ' + width + ',' + halfY);
    drawing.push('L ' + (width + 2000) + ',' + halfY);

    $paths.eq(pathCount++).attr('d', drawing.join(' '));

    pathsPrepare($paths);
}

function drawBorderSVG(id, width, height, withRectangles) {
    var $svg = $(id).width(width).height(height),
        $paths = $('path', $svg),
        drawing = [];

    drawing.push('M 0,0');
    drawing.push('L 0,' + height);
    drawing.push('L ' + width + ',' + height);
    drawing.push('L ' + width + ',0');
    drawing.push('Z');

    $paths.eq(0).attr('d', drawing.join(' '));

    if (withRectangles) {
        var $rectangles = $('rect', $svg);

        $rectangles.eq(0).attr('x', -4).attr('y', -4);
        $rectangles.eq(1).attr('x', -4).attr('y', height - 4);
        $rectangles.eq(2).attr('x', width - 4).attr('y', height - 4);
        $rectangles.eq(3).attr('x', width - 4).attr('y', -4);
    }

    pathsPrepare($paths);
}

function animateMenu(controller) {
    // Menu active toggle
    new ScrollMagic.Scene({
        triggerElement: '#intro',
        triggerHook: 0,
        duration: function () {
            return $('#intro').outerHeight() + $('#dna-samples').outerHeight() - 200;
        }
    })
        .setClassToggle('#intro-link', 'active')
        .addTo(controller)
    ;

    new ScrollMagic.Scene({
        triggerElement: '#molecular-typing',
        triggerHook: 0,
        offset: -200,
        duration: function () {
            return $('#molecular-typing').outerHeight();
        }
    })
        .setClassToggle('#molecular-typing-link', 'active')
        .addTo(controller)
    ;

    new ScrollMagic.Scene({
        triggerElement: '#how-it-works',
        triggerHook: 0,
        duration: function () {
            return $('#how-it-works').outerHeight() + $('#genome').outerHeight() + $('#map').outerHeight();
        }
    })
        .setClassToggle('#how-it-works-link', 'active')
        .addTo(controller)
    ;

    new ScrollMagic.Scene({
        triggerElement: '#bacteria',
        triggerHook: 0,
        duration: 10000
    })
        .setClassToggle('#bacteria-link', 'active')
        .addTo(controller)
    ;

}

function animateParallax(controller) {
    // build scenes
    var dnaScene = new ScrollMagic.Scene({
            triggerElement: '#dna-samples',
            triggerHook: 'onEnter',
            duration: '200%'
        })
            .setTween('#dna-samples > .background', {y: '90%', ease: Linear.easeNone})
            .addTo(controller),
        howItWorksScene = new ScrollMagic.Scene({
            triggerElement: '#how-it-works',
            triggerHook: 'onEnter',
            duration: '200%'
        })
            .setTween('#how-it-works > .background', {y: '90%', ease: Linear.easeNone})
            .addTo(controller),
        mapScene = new ScrollMagic.Scene({
            triggerElement: '#map',
            triggerHook: 'onEnter',
            duration: '200%'
        })
            .setTween('#map > .background', {y: '90%', ease: Linear.easeNone})
            .addTo(controller),
        bacteriaScene = new ScrollMagic.Scene({
            triggerElement: '#bacteria',
            triggerHook: 'onEnter',
            duration: '200%'
        })
            .setTween('#bacteria > .background', {y: '90%', ease: Linear.easeNone})
            .addTo(controller),

    // DNA
        dnaImg1Scene = new ScrollMagic.Scene({
            triggerElement: '#dna',
            triggerHook: 'onEnter',
            duration: '200%'
        })
            .setTween(TweenMax.to($('#dna-img-1-anim'), 1, {top: -100, right: -200}))
            .addTo(controller),
        dnaImg2Scene = new ScrollMagic.Scene({
            triggerElement: '#dna',
            triggerHook: 'onEnter',
            duration: '200%'
        })
            .setTween(TweenMax.to($('#dna-img-2-anim'), 1, {bottom: -100, left: -200}))
            .addTo(controller),
        dnaImg3Scene = new ScrollMagic.Scene({
            triggerElement: '#dna',
            triggerHook: 'onEnter',
            duration: '200%'
        })
            .setTween(TweenMax.from('#dna-img-3', 1, {
                left: '80%',
                bottom: '50%',
                ease: Linear.easeNone,
                immediateRender: true
            }))
            .addTo(controller),
        dnaImg4Scene = new ScrollMagic.Scene({
            triggerElement: '#dna',
            triggerHook: 'onEnter',
            duration: '200%'
        })
            .setTween(TweenMax.fromTo($('#dna-img-4-anim'), 1, {top: -800}, {top: 0}))
            .addTo(controller),

    // How it works
        howItWorksImg1Scene = new ScrollMagic.Scene({
            triggerElement: '#how-it-works',
            triggerHook: 'onEnter',
            duration: '200%'
        })
            .setTween(TweenMax.to($('#how-it-works-img-1'), 1, {
                y: -50,
                repeat: 3,
                yoyo: true,
                ease: Linear.easeInOut
            }))
            .addTo(controller);

    if (navigator.userAgent.match(/Trident/i)) {
        dnaScene.tweenChanges(true);
        howItWorksScene.tweenChanges(true);
        mapScene.tweenChanges(true);
        bacteriaScene.tweenChanges(true);
        dnaImg1Scene.tweenChanges(true);
        dnaImg2Scene.tweenChanges(true);
        dnaImg3Scene.tweenChanges(true);
        dnaImg4Scene.tweenChanges(true);
        howItWorksImg1Scene.tweenChanges(true);
    }
}

function animateMap(controller) {
    // Map
    var $target = $('#map-img-1'),
        $target2 = $('#map-img-2'),
        map_tween = new TimelineMax()
            .add(TweenMax.fromTo($target, 0.5, {left: '10%', top: '70%'}, {left: '10%', top: '30%'}))
            .add(TweenMax.to($target, 1, {left: '80%', top: '30%'}))
            .add(TweenMax.to($target, 1.5, {left: '80%', top: '70%'}));

    new ScrollMagic.Scene({
        triggerElement: '#map',
        triggerHook: 'onCenter',
        duration: '100%'
    })
        .setTween(map_tween)
        .addTo(controller)
    ;

    map_tween = new TimelineMax()
        .add(TweenMax.fromTo($target2, 0.5, {left: '10%', top: '70%'}, {left: '10%', top: '30%'}))
        .add(TweenMax.to($target2, 1, {left: '80%', top: '30%'}))
        .add(TweenMax.to($target2, 1.5, {left: '80%', top: '70%'}));

    new ScrollMagic.Scene({
        triggerElement: '#map',
        triggerHook: 'onCenter',
        duration: '100%'
    })
        .setTween(map_tween)
        .addTo(controller)
    ;
}

function animateBacterium(controller) {
    new ScrollMagic.Scene({
        triggerElement: '#bacteria',
        triggerHook: 'onEnter',
        duration: '200%'
    })
        .setTween(TweenMax.to($('#bacteria-img-1'), 1, {top: '100%'}))
        .addTo(controller)
    ;

    new ScrollMagic.Scene({
        triggerElement: '#bacteria',
        triggerHook: 'onEnter',
        duration: '200%'
    })
        .setTween(TweenMax.to($('#bacteria-img-2'), 1, {bottom: '160%'}))
        .addTo(controller)
    ;

    new ScrollMagic.Scene({
        triggerElement: '#bacteria',
        triggerHook: 'onEnter',
        duration: '200%'
    })
        .setTween(TweenMax.to($('#bacteria-img-3'), 1, {top: '60%'}))
        .addTo(controller)
    ;

    new ScrollMagic.Scene({
        triggerElement: '#bacteria',
        triggerHook: 'onEnter',
        duration: '200%'
    })
        .setTween(TweenMax.to($('#bacteria-img-4'), 1, {top: '100%'}))
        .addTo(controller)
    ;

    new ScrollMagic.Scene({
        triggerElement: '#bacteria',
        triggerHook: 'onEnter',
        duration: '200%'
    })
        .setTween(TweenMax.to($('#bacteria-img-5'), 1, {bottom: '120%'}))
        .addTo(controller)
    ;
}

function animateFood(controller) {
    if (!isMobile.Android() && !isMobile.BlackBerry() && !isMobile.iOS()) {
        // Build scene
        new ScrollMagic.Scene({
            triggerElement: '.molecular-typing-section-trigger',
            triggerHook: 0,
            duration: function () {
                return $('.molecular-typing-section-trigger').height() * 2;
            }
        })
            .setPin('.molecular-typing-section-trigger')
            .setTween(TweenMax.to($('.molecular-typing-box'), 1, {y: 300, ease: Linear.easeInOut}))
            .addTo(controller)
        ;

        new ScrollMagic.Scene({
            triggerElement: '.molecular-typing-section-trigger',
            triggerHook: 0,
            duration: '200%'
        })
            .setTween(TweenMax.to($('.molecular-typing-video-wrap'), 1, {y: -300, ease: Linear.easeInOut}))
            .addTo(controller)
        ;
    } else {
        $('video').each(function (index, element) {
            element.loop = false;
        });
    }

    var $introLines = $('path.intro-large-rectangle'),
        $mealIntro = $('path.intro-small-rectangle'),

        // Build tween
        tweenLine = new TimelineMax()
            .add([
                TweenMax.to($introLines, 0.5, {strokeDashoffset: 0, ease: Linear.easeNone}),
                TweenMax.to($mealIntro, 0.5, {strokeDashoffset: 0, ease: Linear.easeNone})
            ])
            .fromTo($('#food-img-blue-filter'), 2.5, {height: 0, ease: Linear.easeNone}, {height: '100%'})
        ;

    new ScrollMagic.Scene({
        triggerElement: '.intro-section-info-trigger',
        triggerHook: 0,
        duration: function () {
            return $('.intro-section-info-trigger').height() * 2;
        },
        tweenChanges: true
    })
        .setPin('.intro-section-info-trigger')
        .setTween(tweenLine)
        .addTo(controller)
    ;
}

function animateIntroTitle(controller) {
    $('path#introTitleLine1').css('stroke-dashoffset', 0);
    $('path#introTitleLine2').css('stroke-dashoffset', 0);
    $('path#introTitleLine3').css('stroke-dashoffset', 0);
    $('path#introTitleLine4').css('stroke-dashoffset', 0);
}

function animateDnaTitle(controller) {
    var $dnaRectangle = $('path.dna-rectangle'),
        $dnaSmallRectangle = $('path.dna-small-rectangle'),
        $dnaSamplesLines = $('path.dna-small-lines'),

    // Build tween
        tweenline = new TimelineMax()
            .add(TweenMax.to($dnaRectangle, 1, {strokeDashoffset: 0, ease: Linear.easeNone}))
            .add(TweenMax.to($dnaSmallRectangle, 1.5, {strokeDashoffset: 0, ease: Linear.easeNone}))
            .add(TweenMax.to($dnaSamplesLines, .5, {strokeDashoffset: 0, ease: Linear.easeNone}));

    // Build scene
    new ScrollMagic.Scene({
        triggerElement: '#dna-samples',
        duration: 300,
        tweenChanges: true
    })
        .setTween(tweenline)
        .addTo(controller)
    ;
}

function animateMolecularTyping(controller) {
    var $molecularTypingLines = $('path.molecular-typing-video-rectangle'),

    // Build tween
        tweenline = new TimelineMax()
            .add(TweenMax.to($molecularTypingLines, 2, {strokeDashoffset: 0, ease: Linear.easeNone}));

    // Build scene
    new ScrollMagic.Scene({
        triggerElement: '.molecular-typing-video-wrap',
        duration: 200,
        tweenChanges: true
    })
        .setTween(tweenline)
        .addTo(controller)
    ;
}

function animateHowItWorksTitle(controller) {
    var $hiwRectangle = $('path.how-works-rectangle'),
        $hiwSmallRectangle = $('path.how-works-small-rectangle'),
        $hiwSamplesLines = $('path.how-works-lines'),

    // Build tween
        tweenLine = new TimelineMax()
            .add(TweenMax.to($hiwRectangle, 1, {strokeDashoffset: 0, ease: Linear.easeNone}))
            .add(TweenMax.to($hiwSmallRectangle, 1.5, {strokeDashoffset: 0, ease: Linear.easeNone}))
            .add(TweenMax.to($hiwSamplesLines, 0.5, {strokeDashoffset: 0, ease: Linear.easeNone})),

    // Build scene
        scene = new ScrollMagic.Scene({
            triggerElement: '#how-it-works',
            duration: 300,
            tweenChanges: true
        })
            .setTween(tweenLine)
            .addTo(controller);
}

function animateGenomeHeader(controller) {
    // Build scene
    new ScrollMagic.Scene({
        triggerElement: '.genome-animation-wrap',
        triggerHook: 1,
        duration: 300,
        tweenChanges: true
    })
        .setTween(TweenMax.to($('path.genome-rectangle'), 0.5, {strokeDashoffset: 0, ease: Linear.easeNone}))
        .addTo(controller)
    ;
}

function animateGenomeFooter(controller) {
    var $paths = $('#genome-aim').find('path'),
        $genomeTitleRectangle = $paths.eq(0),
        $genomeTitleSmallRectangle = $paths.eq(1),

    // Build tween
        tweenline = new TimelineMax()
            .add([
                TweenMax.to($genomeTitleRectangle, 2, {strokeDashoffset: 0, ease: Linear.easeNone}),
                TweenMax.to($genomeTitleSmallRectangle, 2, {strokeDashoffset: 0, ease: Linear.easeNone})
            ]);

    // Build scene
    new ScrollMagic.Scene({
        triggerElement: '.genome-section-bot-text',
        triggerHook: 1,
        duration: 300,
        tweenChanges: true
    })
        .setTween(tweenline)
        .addTo(controller)
    ;
}

function animateBacteriumTitle(controller) {
    var $bacteriumLines = $('path.bacterium-lines'),

    // Build tween
        tweenline = new TimelineMax()
            .add(TweenMax.to($bacteriumLines, 1, {strokeDashoffset: 0, ease: Linear.easeNone}));

    // Build scene
    new ScrollMagic.Scene({
        triggerElement: '#bacteria',
        duration: 300,
        tweenChanges: true
    })
        .setTween(tweenline)
        .addTo(controller)
    ;
}

function animateHeader(controller) {
    var $headerOuterLine1 = $('path#headerTitleLine1'),
        $headerInnerLine1 = $('path#headerTitleLine2'),
        $headerInnerLine2 = $('path#headerTitleLine3'),
        $headerOuterLine2 = $('path#headerTitleLine4'),

    // Build tween
        timeline = new TimelineMax()
            .add(TweenMax.to($headerOuterLine1, 0.5, {strokeDashoffset: 0, ease: Linear.easeNone}))
            .add(TweenMax.to($headerInnerLine1, 1, {strokeDashoffset: 0, ease: Linear.easeNone}));

    // Build scene
    new ScrollMagic.Scene({
        triggerElement: '.intro-header'
    })
        .setTween(timeline)
        .addTo(controller)
    ;

    timeline = new TimelineMax()
        .add(TweenMax.to($headerInnerLine2, 0.5, {strokeDashoffset: 0, ease: Linear.easeNone}))
        .add(TweenMax.to($headerOuterLine2, 1, {strokeDashoffset: 0, ease: Linear.easeNone}));

    // Build scene
    new ScrollMagic.Scene({
        triggerElement: '.intro-header'
    })
        .setTween(timeline)
        .addTo(controller)
    ;
}

function animateFooter(controller) {
    var $footerBtnLines = $('path.footer-animation-btn-lines');

    pathsPrepare($footerBtnLines);

    // Build scene
    new ScrollMagic.Scene({
        triggerElement: '.footer-top-share',
        duration: 300,
        tweenChanges: true
    })
        .setTween(TweenMax.to($footerBtnLines, 2, {strokeDashoffset: 0, ease: Linear.easeNone}))
        .addTo(controller)
    ;
}

function animateGenomeFrames(controller) {
    var totalImages = 326,
        imagesFrames = [],
        filename;

    for (var i = 1; i < totalImages; i++) {
        filename = '/sites/default/files/interactive_tools/moleculartyping/img/Images-for-parallax/EFSA_MTS_Video_290915 ' + ('00' + i).slice(-3) + '.jpg';
        imagesFrames.push(filename);
    }

    // TweenMax can tween any property of any object. We use this object to cycle through the array
    var obj = {curImg: 0};

    // Create tween
    var tween = TweenMax.to(obj, 0.5, {
        curImg: imagesFrames.length - 1, // animate propery curImg to number of images
        roundProps: 'curImg', // only integers so it can be used as an array index
        immediateRender: true, // load first image automatically
        ease: Linear.easeNone, // show every image the same ammount of time
        onUpdate: function () {
            $('#genomeFrameImages').attr('src', imagesFrames[obj.curImg]); // set the image source

            var $tips = $('.genome-section-frame-tips');

            $tips.addClass('hidden');

            if (obj.curImg < 100) {
                $tips.eq(0).removeClass('hidden');
            } else if (obj.curImg < 190) {
                $tips.eq(1).removeClass('hidden');
            } else {
                $tips.eq(2).removeClass('hidden');
            }
        }
    });

    // Build scene
    new ScrollMagic.Scene({
        triggerElement: '#genome-frames-trigger',
        duration: function () {
            return $('#genome').height() - $('#genome-container').height()
        }
    })
        .setTween(tween)
        .setPin('#genome-container')
        .addTo(controller)
    ;
}
