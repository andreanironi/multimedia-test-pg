(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-23121873-1', 'auto');
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');

jQuery(document).ready(function() {
  jQuery.scrollDepth({
    elements: ['#welcome', '#first-step', '#second-step', '#third-step', '#fourth-step', '#conclusion-section'],
    percentage: true,
    userTiming: false,
    pixelDepth: false,
  });
});

$(function() {

    var $window = $(window);

    var controller = new ScrollMagic.Controller();

    var dashOffset = {};

    var triggerHook = {};

    if ($window.width() >= 1025) {
        dashOffset.blueDashOffset1 = 2605;
        dashOffset.orangeDashOffset1 = 2485;
        dashOffset.blueDashOffset2 = 2460;
        dashOffset.orangeDashOffset2 = 2320;
        dashOffset.blueDashOffset3 = 2565;
        dashOffset.orangeDashOffset3 = 2375;
        dashOffset.blueDashOffset4 = 2600;
        dashOffset.orangeDashOffset4 = 2280;
        triggerHook.circleSvg = 0.1;
        triggerHook.triangleSvg = 0.1;
        triggerHook.rectangleSvg = 0;
        triggerHook.hexagonSvg = 0.15;
    }

    if ($window.width() >= 768 && $window.width() < 1025) {
        dashOffset.blueDashOffset1 = 2560;
        dashOffset.orangeDashOffset1 = 2560;
        dashOffset.blueDashOffset2 = 2560;
        dashOffset.orangeDashOffset2 = 2560;
        dashOffset.blueDashOffset3 = 2560;
        dashOffset.orangeDashOffset3 = 2560;
        dashOffset.blueDashOffset4 = 2560;
        dashOffset.orangeDashOffset4 = 2560;
        triggerHook.circleSvg = 0.03;
        triggerHook.triangleSvg = 0.05;
        triggerHook.rectangleSvg = 0.05;
        triggerHook.hexagonSvg = 0.1;
    }

    if ($window.width() < 767) {
        dashOffset.blueDashOffset1 = 2560;
        dashOffset.orangeDashOffset1 = 2600;
        dashOffset.blueDashOffset2 = 2560;
        dashOffset.orangeDashOffset2 = 2600;
        dashOffset.blueDashOffset3 = 2560;
        dashOffset.orangeDashOffset3 = 2590;
        dashOffset.blueDashOffset4 = 2560;
        dashOffset.orangeDashOffset4 = 2585;
        triggerHook.circleSvg = 0.03;
        triggerHook.triangleSvg = 0.05;
        triggerHook.rectangleSvg = 0;
        triggerHook.hexagonSvg = 0;
    }

    if ($window.width() >= 1365) {
        dashOffset.blueDashOffset1 = 2400;
        dashOffset.orangeDashOffset1 = 2400;
        dashOffset.blueDashOffset2 = 2400;
        dashOffset.orangeDashOffset2 = 2333;
        dashOffset.blueDashOffset3 = 2555;
        dashOffset.orangeDashOffset3 = 2380;
        dashOffset.blueDashOffset4 = 2630;
        dashOffset.orangeDashOffset4 = 2505;
        triggerHook.circleSvg = 0.1;
        triggerHook.triangleSvg = 0.1;
        triggerHook.rectangleSvg = 0;
        triggerHook.hexagonSvg = 0.15;
    }

    if ($window.width() >= 1600) {
        triggerHook.circleSvg = 0.15;
        triggerHook.triangleSvg = 0.15;
        triggerHook.rectangleSvg = 0.15;
        triggerHook.hexagonSvg = 0.15;
    }

    var scrollTime = 0.6,
        scrollDistance = 150,
        scrollTween;

    function scrollTweenAnimation(event) {
        event.preventDefault();

        var delta = event.originalEvent.wheelDelta / 120 || - event.originalEvent.detail / 3,
            scrollTop = $window.scrollTop(),
            finalScroll = scrollTop - parseInt(delta*scrollDistance);

        scrollTween = TweenMax.to($window, scrollTime, {
            scrollTo : { y: finalScroll, autoKill:true },
            ease: Power1.easeOut,
            autoKill: true,
            overwrite: 5
        });
    }

    $window.on("mousewheel DOMMouseScroll", scrollTweenAnimation);

    if ($window.width() >= 1025) {
        $('.hover-wrap').hover(function() {
            $(this).toggleClass('active');
            $(this).closest('.wrap').find('.title').toggleClass('active');
            //$(this).closest('.wrap').find('.svg-wrap-list').toggleClass('active');
            $(this).find('p').toggleClass('active');
            $(this).find('h3').toggleClass('active');
        });
    }
    if ($window.width() >= 768 && $window.width() < 1025) {
        $('.hover-wrap').on('click', function() {
            $(this).toggleClass('active');
            $(this).closest('.wrap').find('.title').toggleClass('active');
            $(this).closest('.wrap').find('.svg-wrap-list').toggleClass('active');
            $(this).find('p').toggleClass('active');
            $(this).find('h3').toggleClass('active');
        });
    }


    animateDottedLine(controller);
    infographicAnimate(controller);
    animateMolecula(controller);
    animatePlant(controller);
    animateFormula(controller);

    $window.scroll(function() {
        if ($window.scrollTop() > 100) {
            $('#first-step .navbar-inverse').css('opacity', 1);
        } else {
            $('#first-step .navbar-inverse').css('opacity', 0);
        }
    });

    new TimelineMax({repeat:-1, repeatDelay:0})
        .to('.svg-first', 2, {scale: "1.85", opacity: 0.3, transformOrigin: "50% 24%" })
    ;
    new TimelineMax({repeat:-1, repeatDelay:0})
        .to('.svg-second', 2, {scale: "1.85", opacity: 0.3, transformOrigin: "50% 24%" })
        .startTime(0.86)
    ;
    new TimelineMax({repeat:-1, repeatDelay:0})
        .to('.svg-third', 2, {scale: "1.85", opacity: 0.3, transformOrigin: "50% 24%" })
        .startTime(1.32)
    ;

    // Welcome Section Animate

    new TimelineMax({repeat:0})
        .fromTo('.welcome-svg-1', 2,{scale: "0.9", opacity: 0}, {scale:"1.27", opacity: 1, transformOrigin: "50% 50%" })
    ;
    new TimelineMax({repeat:0})
        .fromTo('.welcome-svg-2', 2, {scale: "0.9", opacity: 0}, {scale: "1.14", opacity: 1, transformOrigin: "50%" +
        " 50%" })
        .startTime(0.66)
    ;
    new TimelineMax({repeat:0})
        .fromTo('.welcome-svg-3', 2, {scale: "0.9", opacity: 0}, {scale: "1.01", opacity: 1, transformOrigin: "50%" +
        " 50%" })
        .startTime(1.32)
    ;

    // Animate Dotted Line

    function animateDottedLine (controller) {
        new ScrollMagic.Scene({
            triggerElement: "#welcome-bottom",
            triggerHook: 0.3,
            duration: function () {
                return $('#welcome-bottom').outerHeight() / 1.55;
            }
        })
            .setTween(
            new TimelineMax()
                .to('.dotted-line', 35, {height: '200%'})
        )
            .addTo(controller);
    }

    // Animate Infographic and theory-practice list

    function infographicAnimate (controller) {
        if($window.width() >= 768) {
            new ScrollMagic.Scene({triggerElement: ".welcome-bottom-wrap", triggerHook: 0.5, duration: function () {return $('.welcome-bottom-wrap').outerHeight() / 4;}})
            .setTween(new TimelineMax().add(TweenMax.to('.infographic-block', 35, {opacity: 1})).to('.theory-practice-list', 100, {opacity: 1})).addTo(controller)
        } else {
            new ScrollMagic.Scene({triggerElement: ".welcome-bottom-wrap", triggerHook: 0.5, duration: function () {return $('.welcome-bottom-wrap').outerHeight() / 4;}})
                .setTween(new TimelineMax().add(TweenMax.to('.infographic-block', 35, {opacity: 1}))).addTo(controller);

            new ScrollMagic.Scene({triggerElement: ".theory", triggerHook: 0.5, duration: function () {return $('.welcome-bottom-wrap').outerHeight() / 4;}})
                .setTween(new TimelineMax().add(TweenMax.fromTo(['.theory .title', '.theory .hover-wrap h3'], 35, {opacity: 0}, {opacity: 1})).add(TweenMax.fromTo('.theory p', 35, {opacity: 0}, {opacity: 1}))).addTo(controller);

            new ScrollMagic.Scene({triggerElement: ".practice", triggerHook: 0.5, duration: function () {return $('.welcome-bottom-wrap').outerHeight() / 4;}})
                .setTween(new TimelineMax().add(TweenMax.fromTo(['.practice .title', '.practice .hover-wrap h3'], 35, {opacity: 0}, {opacity: 1})).add(TweenMax.fromTo('.practice p', 35, {opacity: 0}, {opacity: 1}))).addTo(controller);
        }
    }

    // Animate Molecula Parallax

    function animateMolecula(controller) {
        new ScrollMagic.Scene({
            triggerElement: '.molecule',
            triggerHook: 'onCenter',
            duration: '200%'
        })
            .setTween(TweenMax.to($('.molecule-1'), 1, {top: '40px'}))
            .addTo(controller)
        ;
        new ScrollMagic.Scene({
            triggerElement: '.trigger-molecula-2',
            triggerHook: 'onCenter',
            duration: '150%'
        })
            .setTween(TweenMax.to($('.molecule-2'), 1, {top: '40%'}))
            .addTo(controller)
        ;
        new ScrollMagic.Scene({
            triggerElement: '.trigger-molecula-3',
            triggerHook: 'onCenter',
            duration: '150%'
        })
            .setTween(TweenMax.to($('.molecule-3'), 1, {top: '55%'}))
            .addTo(controller)
        ;
        new ScrollMagic.Scene({
            triggerElement: '.trigger-molecula-4',
            triggerHook: 'onCenter',
            duration: '200%'
        })
            .setTween(TweenMax.to($('.molecule-4'), 1, {bottom: '15%'}))
            .addTo(controller)
        ;
    }

    // Animate Plant Parallax

    function animatePlant(controller) {
        new ScrollMagic.Scene({
            triggerElement: '.plants',
            triggerHook: 'onCenter',
            duration: '200%'
        })
            .setTween(TweenMax.to($('.plant-1'), 1, {top: '200px'}))
            .addTo(controller)
        ;
        new ScrollMagic.Scene({
            triggerElement: '.plants',
            triggerHook: 'onCenter',
            duration: '150%'
        })
            .setTween(TweenMax.to($('.plant-2'), 1, {top: '400px'}))
            .addTo(controller)
        ;
        new ScrollMagic.Scene({
            triggerElement: '.plants',
            triggerHook: 'onCenter',
            duration: '150%'
        })
            .setTween(TweenMax.to($('.plant-3'), 1, {top: '10%'}))
            .addTo(controller)
        ;
        new ScrollMagic.Scene({
            triggerElement: '.trigger-plant-4',
            triggerHook: 'onCenter',
            duration: '150%'
        })
            .setTween(TweenMax.to($('.plant-4'), 1, {top: '55%'}))
            .addTo(controller)
        ;
        new ScrollMagic.Scene({
            triggerElement: '.trigger-plant-5',
            triggerHook: 'onCenter',
            duration: '150%'
        })
            .setTween(TweenMax.to($('.plant-5'), 1, {top: '75%'}))
            .addTo(controller)
        ;
        new ScrollMagic.Scene({
            triggerElement: '.trigger-plant-6',
            triggerHook: 'onCenter',
            duration: '150%'
        })
            .setTween(TweenMax.to($('.plant-6'), 1, {top: '45%'}))
            .addTo(controller)
        ;
        new ScrollMagic.Scene({
            triggerElement: '.trigger-plant-7',
            triggerHook: 'onCenter',
            duration: '150%'
        })
            .setTween(TweenMax.to($('.plant-7'), 1, {bottom: '15%'}))
            .addTo(controller)
        ;
        new ScrollMagic.Scene({
            triggerElement: '.trigger-plant-7',
            triggerHook: 'onCenter',
            duration: '150%'
        })
            .setTween(TweenMax.to($('.plant-8'), 1, {bottom: '20%'}))
            .addTo(controller)
        ;

    }

    // Animate Formula Parallax

    function animateFormula(controller) {
        new ScrollMagic.Scene({
            triggerElement: '.formula',
            triggerHook: 'onCenter',
            duration: '100%'
        })
            .setTween(TweenMax.to($('.formula-1'), 1, {top: '100px'}))
            .addTo(controller)
        ;
    }

    var firstStepOffset = $('#first-step').offset().top - 250,
        step1Svg = $('#step1-svg').offset().top,
        secondStepOffset = $('#second-step').offset().top - 100,
        step2Svg = $('#step2-svg').offset().top,
        thirdStepOffset = $('#third-step').offset().top - 100,
        step3Svg = $('#step3-svg').offset().top,
        fourthStepOffset = $('#fourth-step').offset().top - 100,
        step4Svg = $('#step4-svg').offset().top;

    // First Step
    $window.scroll(function() {
        var windowScrollTopPos = $window.scrollTop() + 100;

        if ($window.width() >= 768) {
            if (windowScrollTopPos >= firstStepOffset) {
                new TimelineMax({repeat:0}).to('#circle-small-step', 1.5, {scale: "0.95", opacity: 1, transformOrigin: "50%" + " 50%" });
                new TimelineMax({repeat:0}).to('#circle-small2-step', 1.5, {scale: "1.75", opacity: 1, transformOrigin: "50%" + " 50%"});
            }

            if (windowScrollTopPos >= (firstStepOffset)) {
                new TimelineMax({repeat:0}).to('#first-step .step', 2, {top: 0, opacity: 1, transformOrigin: "50%" + " 50%" });
                new TimelineMax({repeat:0}).to('#first-step h2', 2, {top: 0, opacity: 1, transformOrigin: "50%" + " 50%"});
            }

            if ($window.width() >= 1025) {
                if (windowScrollTopPos >= step1Svg) {
                    if ($('#step1-svg .practice').css('opacity') == 1) {
                        return false
                    } else {
                        new TimelineMax({
                            onStart: function () {
                                disableScroll();
                                $window.off('mousewheel DOMMouseScroll');
                                scrollTween.paused(true);
                            },
                            onComplete: function () {
                                enableScroll();
                                $window.on("mousewheel DOMMouseScroll", scrollTweenAnimation);
                                scrollTween.paused(false);
                            }
                        })
                            .add(TweenMax.to('#step1-svg .img-wrap', 0.2, {opacity: 1}))
                            .add(TweenMax.to('#step1-svg .orange-circle', 0.8, {'stroke-dashoffset': '1440px'}))
                            .add(TweenMax.to('#step1-svg .orange-line', 0.5, {'stroke-dashoffset':  dashOffset.orangeDashOffset1}))
                            .add(TweenMax.to('#step1-svg .theory', 0.8, {opacity: 1}))
                            .add(TweenMax.to('#step1-svg .blue-circle', 0.8, {'stroke-dashoffset': '1200px'}))
                            .add(TweenMax.to('#step1-svg .blue-line', 0.5, {'stroke-dashoffset': dashOffset.blueDashOffset1}))
                            .add(TweenMax.to('#step1-svg .practice', 0.8, {opacity: 1}))
                    }
                }
            } else {
                if (windowScrollTopPos >= step1Svg) {
                    if ($('#step1-svg .practice').css('opacity') == 1) {
                        return false
                    } else {
                        new TimelineMax()
                            .add(TweenMax.to('body', 0.0001, {'overflow-y': 'hidden'}))
                            .add(TweenMax.to('#step1-svg .img-wrap', 0.2, {opacity: 1}))
                            .add(TweenMax.to('#step1-svg .orange-circle', 0.8, {'stroke-dashoffset': '1440px'}))
                            .add(TweenMax.to('#step1-svg .orange-line', 0.1, {'stroke-dashoffset':  dashOffset.orangeDashOffset1}))
                            .add(TweenMax.to('#step1-svg .theory', 0.8, {opacity: 1}))
                            .add(TweenMax.to('#step1-svg .blue-circle', 0.8, {'stroke-dashoffset': '1200px'}))
                            .add(TweenMax.to('#step1-svg .blue-line', 0.1, {'stroke-dashoffset': dashOffset.blueDashOffset1}))
                            .add(TweenMax.to('#step1-svg .practice', 0.8, {opacity: 1}))
                            .add(TweenMax.to('body', 0.0001, {'overflow-y': 'visible'}))
                    }
                }
            }
        } else {
            if (windowScrollTopPos >= firstStepOffset) {
                new TimelineMax({repeat:0})
                    .to('#circle-small-step-mobile', 1, {scale: "0.75", opacity: 1, transformOrigin: "50%" +
                    " 50%" });

                new TimelineMax({repeat:0})
                    .to('#circle-small2-step-mobile', 1, {scale: "1.5", opacity: 1, transformOrigin: "50% 50%"})
            }
            if (windowScrollTopPos >= (firstStepOffset + 150)) {

                new TimelineMax({repeat:0})
                    .to('#first-step .step', 2, {top: 0, opacity: 1, transformOrigin: "50%" +
                    " 50%" });

                new TimelineMax({repeat:0})
                    .to('#first-step h2', 2, {top: 0, opacity: 1, transformOrigin: "50%" +
                    " 50%"});
            }
            if (windowScrollTopPos >= step1Svg) {
                if ($('#step1-svg .practice').css('opacity') == 1) {
                    return false
                } else {
                    new TimelineMax()
                        .add(TweenMax.to('body', 0.0001, {'overflow-y': 'hidden'}))
                        .add(TweenMax.to('#step1-svg .theory', 0.8, {opacity: 1}))
                        .add(TweenMax.to('#step1-svg .img-wrap', 0.2, {opacity: 1}))
                        .add(TweenMax.to('#step1-svg .orange-line', 0.2, {'stroke-dashoffset':  dashOffset.orangeDashOffset1}))
                        .add(TweenMax.to('#step1-svg .orange-circle', 0.8, {'stroke-dashoffset': '1200px'}))
                        .add(TweenMax.to('#step1-svg .blue-circle', 0.8, {'stroke-dashoffset': '1690px'}))
                        .add(TweenMax.to('#step1-svg .blue-line', 0.2, {'stroke-dashoffset': dashOffset.blueDashOffset1}))
                        .add(TweenMax.to('#step1-svg .practice', 0.8, {opacity: 1}))
                        .add(TweenMax.to('body', 0.0001, {'overflow-y': 'visible'}))
                }
            }
        }
    });

    // Second Step
    $window.scroll(function() {
        var windowScrollTopPos2 = $window.scrollTop() - 200;

        if ($window.width() >= 768) {
            if (windowScrollTopPos2 >= (secondStepOffset - 150)) {
                new TimelineMax({repeat:0}).to('.big-triangle', 1.5, {scaleX: 1.45, scaleY: 1.15, opacity: 1, transformOrigin: "50% 50%" });
                new TimelineMax({repeat:0}).to('.small-triangle', 1.5,  {scaleX: 2.5, scaleY: 2, opacity: 1, transformOrigin: "50% 50%"});
            }

            if (windowScrollTopPos2 >= (secondStepOffset - 100)) {
                new TimelineMax({repeat:0}).to('#second-step .step', 2, {top: 0, opacity: 1, transformOrigin: "50%" + " 50%" });
                new TimelineMax({repeat:0}).to('#second-step h2', 2, {top: 0, opacity: 1, transformOrigin: "50%" + " 50%"});
            }
            if ($window.width() >= 1025) {
                if ($window.scrollTop() >= (step2Svg - 100)) {
                    if ($('#step2-svg .practice').css('opacity') == 1) {
                        return false
                    } else {
                        new TimelineMax({
                            onStart: function () {
                                disableScroll();
                                $window.off('mousewheel DOMMouseScroll');
                                scrollTween.paused(true);
                            },
                            onComplete: function () {
                                enableScroll();
                                $window.on("mousewheel DOMMouseScroll", scrollTweenAnimation);
                                scrollTween.paused(false);
                            }
                        })
                            .add(function () {TweenMax.to('#step2-svg .img-wrap', 0.2, {opacity: 1});})
                            .add(TweenMax.to('#step2-svg .step-animated-triangle.orange', 1.5, {'stroke-dashoffset': '2390px'}))
                            .add(TweenMax.to('#step2-svg .orange-line', 0.2, {'stroke-dashoffset':  dashOffset.orangeDashOffset2}))
                            .add(TweenMax.to('#step2-svg .theory', 0.8, {opacity: 1}))
                            .add(TweenMax.to('#step2-svg .step-animated-triangle.blue', 1.5, {'stroke-dashoffset': '2395px'}))
                            .add(TweenMax.to('#step2-svg .blue-line', 0.4, {'stroke-dashoffset':  dashOffset.blueDashOffset2}))
                            .add(TweenMax.to('#step2-svg .practice', 0.8, {opacity: 1}))
                    }
                }
            } else {
                if ($window.scrollTop() >= (step2Svg - 100)) {
                    if ($('#step2-svg .practice').css('opacity') == 1) {
                        return false
                    } else {
                        new TimelineMax()
                            .add(TweenMax.to('body', 0.0001, {'overflow-y': 'hidden'}))
                            .add(TweenMax.to('#step2-svg .img-wrap', 0.2, {opacity: 1}))
                            .add(TweenMax.to('#step2-svg .step-animated-triangle.orange', 1.5, {'stroke-dashoffset': '2390px'}))
                            .add(TweenMax.to('#step2-svg .orange-line', 0.1, {'stroke-dashoffset':  dashOffset.orangeDashOffset2}))
                            .add(TweenMax.to('#step2-svg .theory', 0.8, {opacity: 1}))
                            .add(TweenMax.to('#step2-svg .step-animated-triangle.blue', 1.5, {'stroke-dashoffset': '2395px'}))
                            .add(TweenMax.to('#step2-svg .blue-line', 0.1, {'stroke-dashoffset':  dashOffset.blueDashOffset2}))
                            .add(TweenMax.to('#step2-svg .practice', 0.8, {opacity: 1}))
                            .add(TweenMax.to('body', 0.0001, {'overflow-y': 'visible'}))
                    }
                }
            }
        } else {
            if (windowScrollTopPos2 >= (secondStepOffset - 300)) {
                new TimelineMax({repeat:0}).to('.big-triangle', 1.5, {scaleX: 0.9, scaleY: 0.7, opacity: 1, transformOrigin: "50% 50%" });
                new TimelineMax({repeat:0}).to('.small-triangle', 1.5,  {scaleX: 1.6, scaleY: 1.2, opacity: 1, transformOrigin: "50% 50%"});
            }

            if (windowScrollTopPos2 >= (secondStepOffset - 200)) {
                new TimelineMax({repeat:0}).to('#second-step .step', 2, {top: 0, opacity: 1, transformOrigin: "50%" + " 50%" });
                new TimelineMax({repeat:0}).to('#second-step h2', 2, {top: 0, opacity: 1, transformOrigin: "50%" + " 50%"});
            }

            if ($window.scrollTop() >= (step2Svg - 100)) {
                if ($('#step2-svg .practice').css('opacity') == 1) {
                    return false
                } else {
                    new TimelineMax()
                        .add(TweenMax.to('body', 0.0001, {'overflow-y': 'hidden'}))
                        .add(TweenMax.to('#step2-svg .theory', 0.8, {opacity: 1}))
                        .add(TweenMax.to('#step2-svg .img-wrap', 0.2 , {opacity: 1}))
                        .add(TweenMax.to('#step2-svg .orange-line', 0.2, {'stroke-dashoffset':  dashOffset.orangeDashOffset2}))
                        .add(TweenMax.to('#step2-svg .step-animated-triangle.orange', 0.8, {'stroke-dashoffset': '2390px'}))
                        .add(TweenMax.to('#step2-svg .step-animated-triangle.blue', 0.8, {'stroke-dashoffset': '2395px'}))
                        .add(TweenMax.to('#step2-svg .blue-line', 0.2, {'stroke-dashoffset':  dashOffset.blueDashOffset2}))
                        .add(TweenMax.to('#step2-svg .practice', 0.8, {opacity: 1}))
                        .add(TweenMax.to('body', 0.0001, {'overflow-y': 'visible'}))
                }
            }
        }
    });

    // Third Step
    $window.scroll(function() {
        var windowScrollTopPos3 = $window.scrollTop() - 200;

        if ($window.width() >= 768) {
            if (windowScrollTopPos3 >= (thirdStepOffset - 350)) {
                new TimelineMax({repeat:0, repeatDelay:0}).to('#rectangle-big', 1,{scale: 1.5, opacity: 1, transformOrigin: "50%" + " 50%" });
                new TimelineMax({repeat:0, repeatDelay:0}).to('#rectangle-small', 1, {scale: 1, opacity: 1, transformOrigin: "50%" + " 50%"});
            }

            if (windowScrollTopPos3 >= (thirdStepOffset - 200)) {
                new TimelineMax({repeat:0}).to('#third-step .step', 2, {top: 0, opacity: 1, transformOrigin: "50%" + " 50%" });
                new TimelineMax({repeat:0}).to('#third-step h2', 2, {top: 0, opacity: 1, transformOrigin: "50%" + " 50%"});
            }
            if ($window.width() >= 1025) {
                if ($window.scrollTop() >= (step3Svg - 30)) {
                    if ($('#step3-svg .practice').css('opacity') == 1) {
                        return false
                    } else {
                        new TimelineMax({
                            onStart: function () {
                                disableScroll();
                                $window.off('mousewheel DOMMouseScroll');
                                scrollTween.paused(true);
                            },
                            onComplete: function () {
                                enableScroll();
                                $window.on("mousewheel DOMMouseScroll", scrollTweenAnimation);
                                scrollTween.paused(false);
                            }
                        })
                            .add(TweenMax.to('#step3-svg .img-wrap', 0.2, {opacity: 1}))
                            .add(TweenMax.to('#step3-svg .step-animated-rectangle.orange', 1.4, {'stroke-dashoffset': '2300px'}))
                            .add(TweenMax.to('#step3-svg .orange-line', 0.2, {'stroke-dashoffset':  dashOffset.orangeDashOffset3}))
                            .add(TweenMax.to('#step3-svg .theory', 0.8, {opacity: 1}))
                            .add(TweenMax.to('#step3-svg .step-animated-rectangle.blue', 1.6, {'stroke-dashoffset': '2310px'}))
                            .add(TweenMax.to('#step3-svg .blue-line', 0.2, {'stroke-dashoffset':  dashOffset.blueDashOffset3}))
                            .add(TweenMax.to('#step3-svg .practice', 0.8, {opacity: 1}))
                    }
                }
            } else {
                if ($window.scrollTop() >= (step3Svg - 30)) {
                    if ($('#step3-svg .practice').css('opacity') == 1) {
                        return false
                    } else {
                        new TimelineMax()
                            .add(TweenMax.to('body', 0.0001, {'overflow-y': 'hidden'}))
                            .add(TweenMax.to('#step3-svg .img-wrap', 0.2, {opacity: 1}))
                            .add(TweenMax.to('#step3-svg .step-animated-rectangle.orange', 1.4, {'stroke-dashoffset': '2300px'}))
                            .add(TweenMax.to('#step3-svg .orange-line', 0.1, {'stroke-dashoffset':  dashOffset.orangeDashOffset3}))
                            .add(TweenMax.to('#step3-svg .theory', 0.8, {opacity: 1}))
                            .add(TweenMax.to('#step3-svg .step-animated-rectangle.blue', 1.6, {'stroke-dashoffset': '2310px'}))
                            .add(TweenMax.to('#step3-svg .blue-line', 0.1, {'stroke-dashoffset':  dashOffset.blueDashOffset3}))
                            .add(TweenMax.to('#step3-svg .practice', 0.8, {opacity: 1}))
                            .add(TweenMax.to('body', 0.0001, {'overflow-y': 'visible'}))
                    }
                }
            }

        } else {
            if (windowScrollTopPos3 >= (thirdStepOffset - 250)) {
                new TimelineMax({repeat:0})
                    .to('#rectangle-big-mobile', 1.5, {scale: 1.2, opacity: 1, transformOrigin: "50% 50%" })
                ;

                new TimelineMax({repeat:0})
                    .to('#rectangle-small-mobile', 1.5, {scale: 2.2, opacity: 1, transformOrigin: "50% 50%"})
                ;
            }
            if (windowScrollTopPos3 >= (thirdStepOffset - 175)) {

                new TimelineMax({repeat:0})
                    .to('#third-step .step', 2, {top: 0, opacity: 1, transformOrigin: "50%" +
                    " 50%" });

                new TimelineMax({repeat:0})
                    .to('#third-step h2', 2, {top: 0, opacity: 1, transformOrigin: "50%" +
                    " 50%"});
            }
            if ($window.scrollTop() >= (step3Svg - 30)) {
                if ($('#step3-svg .practice').css('opacity') == 1) {
                    return false
                } else {
                    new TimelineMax()
                        .add(TweenMax.to('body', 0.0001, {'overflow-y': 'hidden'}))
                        .add(TweenMax.to('#step3-svg .theory', 0.8, {opacity: 1}))
                        .add(TweenMax.to('#step3-svg .img-wrap', 0.2 , {opacity: 1}))
                        .add(TweenMax.to('#step3-svg .orange-line', 0.2, {'stroke-dashoffset':  dashOffset.orangeDashOffset3}))
                        .add(TweenMax.to('#step3-svg .step-animated-rectangle.orange', 0.8, {'stroke-dashoffset': '2300px'}))
                        .add(TweenMax.to('#step3-svg .step-animated-rectangle.blue', 0.8, {'stroke-dashoffset': '2300px'}))
                        .add(TweenMax.to('#step3-svg .blue-line', 0.2, {'stroke-dashoffset':  dashOffset.blueDashOffset3}))
                        .add(TweenMax.to('#step3-svg .practice', 0.8, {opacity: 1}))
                        .add(TweenMax.to('body', 0.0001, {'overflow-y': 'visible'}))
                }
            }
        }
    });

    // Fourth Step
    $window.scroll(function() {
        var windowScrollTopPos4 = $window.scrollTop() - 200;

        if ($window.width() >= 768) {
            if (windowScrollTopPos4 >= (fourthStepOffset - 300)) {
                new TimelineMax({repeat:0}).to('.small-octagon', 1, {scale: 2, opacity: 1, transformOrigin: "50% 50%" });
                new TimelineMax({repeat:0}).to('.big-octagon', 1, {scale: 1, opacity: 1, transformOrigin: "50% 50%"});
            }

            if (windowScrollTopPos4 >= (fourthStepOffset - 200)) {
                new TimelineMax({repeat:0}).to('#fourth-step .step', 2, {top: 0, opacity: 1, transformOrigin: "50%" + " 50%" });
                new TimelineMax({repeat:0}).to('#fourth-step h2', 2, {top: 0, opacity: 1, transformOrigin: "50%" + " 50%"});
            }
            if ($window.width() >= 1025) {
                if ($window.scrollTop() >= (step4Svg - 100)) {
                    if ($('#step4-svg .practice').css('opacity') == 1) {
                        return false
                    } else {
                        new TimelineMax({
                            onStart: function () {
                                disableScroll();
                                $window.off('mousewheel DOMMouseScroll');
                                scrollTween.paused(true);
                            },
                            onComplete: function () {
                                enableScroll();
                                $window.on("mousewheel DOMMouseScroll", scrollTweenAnimation);
                                scrollTween.paused(false);
                            }
                        })
                            .add(TweenMax.to('#step4-svg .img-wrap', 0.2, {opacity: 1}))
                            .add(TweenMax.to('#step4-svg .step-animated-hexagon.orange', 1.2, {'stroke-dashoffset': '2300px'}))
                            .add(TweenMax.to('#step4-svg .orange-line', 0.2, {'stroke-dashoffset': dashOffset.orangeDashOffset4}))
                            .add(TweenMax.to('#step4-svg .theory', 0.8, {opacity: 1}))
                            .add(TweenMax.to('#step4-svg .step-animated-hexagon.blue', 1.8, {'stroke-dashoffset': '2310px'}))
                            .add(TweenMax.to('#step4-svg .blue-line', 0.2, {'stroke-dashoffset': dashOffset.blueDashOffset4}))
                            .add(TweenMax.to('#step4-svg .practice', 0.8, {opacity: 1}))
                    }
                }
            } else {
                if ($window.scrollTop() >= (step4Svg - 100)) {
                    if ($('#step4-svg .practice').css('opacity') == 1) {
                        return false
                    } else {
                        new TimelineMax()
                            .add(TweenMax.to('body', 0.0001, {'overflow-y': 'hidden'}))
                            .add(TweenMax.to('#step4-svg .img-wrap', 0.2, {opacity: 1}))
                            .add(TweenMax.to('#step4-svg .step-animated-hexagon.orange', 1.2, {'stroke-dashoffset': '2300px'}))
                            .add(TweenMax.to('#step4-svg .orange-line', 0.1, {'stroke-dashoffset': dashOffset.orangeDashOffset4}))
                            .add(TweenMax.to('#step4-svg .theory', 0.8, {opacity: 1}))
                            .add(TweenMax.to('#step4-svg .step-animated-hexagon.blue', 1.8, {'stroke-dashoffset': '2310px'}))
                            .add(TweenMax.to('#step4-svg .blue-line', 0.1, {'stroke-dashoffset': dashOffset.blueDashOffset4}))
                            .add(TweenMax.to('#step4-svg .practice', 0.8, {opacity: 1}))
                            .add(TweenMax.to('body', 0.0001, {'overflow-y': 'visible'}))
                    }
                }
            }
        } else {
            if (windowScrollTopPos4 >= (fourthStepOffset - 250)) {
                new TimelineMax({repeat:0})
                    .to('.small-octagon-mobile', 1.5, {scale: 1, opacity: 1, transformOrigin: "50% 50%" })
                ;

                new TimelineMax({repeat:0})
                    .to('.big-octagon-mobile', 1.5, {scale: 2.1, opacity: 1, transformOrigin: "50% 50%"})
                ;
            }
            if (windowScrollTopPos4 >= (fourthStepOffset - 175)) {

                new TimelineMax({repeat:0})
                    .to('#fourth-step .step', 2, {top: 0, opacity: 1, transformOrigin: "50%" +
                    " 50%" });

                new TimelineMax({repeat:0})
                    .to('#fourth-step h2', 2, {top: 0, opacity: 1, transformOrigin: "50%" +
                    " 50%"});
            }
            if ($window.scrollTop() >= (step4Svg - 100)) {
                if ($('#step4-svg .practice').css('opacity') == 1) {
                    return false
                } else {
                    new TimelineMax()
                        .add(TweenMax.to('body', 0.0001, {'overflow-y': 'hidden'}))
                        .add(TweenMax.to('#step4-svg .theory', 0.8, {opacity: 1}))
                        .add(TweenMax.to('#step4-svg .img-wrap', 0.2 , {opacity: 1}))
                        .add(TweenMax.to('#step4-svg .orange-line', 0.2, {'stroke-dashoffset': dashOffset.orangeDashOffset4}))
                        .add(TweenMax.to('#step4-svg .step-animated-hexagon.orange', 0.8, {'stroke-dashoffset': '2300px'}))
                        .add(TweenMax.to('#step4-svg .step-animated-hexagon.blue', 0.8, {'stroke-dashoffset': '2310px'}))
                        .add(TweenMax.to('#step4-svg .blue-line', 0.2, {'stroke-dashoffset': dashOffset.blueDashOffset4}))
                        .add(TweenMax.to('#step4-svg .practice', 0.8, {opacity: 1}))
                        .add(TweenMax.to('body', 0.0001, {'overflow-y': 'visible'}))
                }
            }
        }
    });

    new TimelineMax({repeat:-1, repeatDelay:0}).to('.find-hexagon1', 2, {scale: "1.4", opacity: 0, transformOrigin: "50% 18%" });

    new TimelineMax({repeat:-1, repeatDelay:0})
        .to('.find-hexagon2', 2, {scale: "1.4", opacity: 0, transformOrigin: "50% 18%" })
        .startTime(0.65);

    new TimelineMax({repeat:-1, repeatDelay:0})
        .to('.find-hexagon3', 2, {scale: "1.4", opacity: 0, transformOrigin: "50% 18%" })
        .startTime(1.3);

    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault;
        window.onmousewheel = document.onmousewheel = preventDefault;
        window.ontouchmove  = preventDefault;
        document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }
});