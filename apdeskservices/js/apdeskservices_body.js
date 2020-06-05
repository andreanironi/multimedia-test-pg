var deviceAgent = navigator.userAgent.toLowerCase();
var isTouchDevice = (deviceAgent.match(/(iphone|ipod|ipad)/) ||
  deviceAgent.match(/(android)/) ||
  deviceAgent.match(/(iemobile)/) ||
  deviceAgent.match(/iphone/i) ||
  deviceAgent.match(/ipad/i) ||
  deviceAgent.match(/ipod/i) ||
  deviceAgent.match(/blackberry/i) ||
  deviceAgent.match(/bada/i));

if (isTouchDevice) {
  window.location = "/interactive_pages/apdeskservices/ApdeskServices_mobile";
}

//*********************** Scroll Controller */***********************/
var controller;
$(document).ready(function($) {
  // init controller
  controller = new ScrollMagic();
});

$(document).ready(function($) {
  var tween = TweenMax.fromTo("#scroll_button", 1, {
    scale: 1
  }, {
    scale: 1.5,
    ease: Circ.easeIn,
    repeat: 3,
    yoyo: true
  }, 0.05);
});

$(document).ready(function($) {
  // build scene

  var tween_out = TweenMax.fromTo("#animateSide", 1, {
    top: -280,
    scale: 1
  }, {
    scale: 0,
    ease: Circ.easeInOut
  }, 0.05);
  var tween_in = TweenMax.fromTo("#animateSide", 1, {
    top: -280,
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);
  var tween_lines = TweenMax.fromTo("#sideLinkImg", 1, {
    top: -280,
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);
  // build scene
  var setwps = TweenMax.fromTo(".steps", 1, {
    scale: 1
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);
  var tween_link1_off = TweenMax.fromTo("#link1", 1, {
    css: {
      backgroundPosition: '0px 0px'
    }
  }, {
    css: {
      backgroundPosition: '0px 50px'
    }
  }, 0.01);
  var tween_link1_on = TweenMax.fromTo("#link1", 1, {
    css: {
      backgroundPosition: '0px 50px'
    }
  }, {
    css: {
      backgroundPosition: '0px 0px'
    }
  }, 0.01);

  var tween_link2_off = TweenMax.fromTo("#link2", 1, {
    css: {
      backgroundPosition: '0px 0px'
    }
  }, {
    css: {
      backgroundPosition: '0px 50px'
    }
  }, 0.01);
  var tween_link2_on = TweenMax.fromTo("#link2", 1, {
    css: {
      backgroundPosition: '0px 50px'
    }
  }, {
    css: {
      backgroundPosition: '0px 0px'
    }
  }, 0.01);

  var tween_link3_off = TweenMax.fromTo("#link3", 1, {
    css: {
      backgroundPosition: '0px 0px'
    }
  }, {
    css: {
      backgroundPosition: '0px 50px'
    }
  }, 0.01);
  var tween_link3_on = TweenMax.fromTo("#link3", 1, {
    css: {
      backgroundPosition: '0px 50px'
    }
  }, {
    css: {
      backgroundPosition: '0px 0px'
    }
  }, 0.01);

  var scene = new ScrollScene({
    triggerElement: "#trigger1",
    duration: 500
  })
  .setTween(tween_in)
  .offset(600)
  .addTo(controller);
  var scene_out = new ScrollScene({
    triggerElement: "#trigger1",
    duration: 500
  })
  .setTween(tween_out)
  .offset(10500)
  .addTo(controller);
  var scene_lines = new ScrollScene({
    triggerElement: "#trigger1",
    duration: 500
  })
  .setTween(tween_lines)
  .offset(1600)
  .addTo(controller);
  var scene_link1_on = new ScrollScene({
    triggerElement: "#triggerS1",
    duration: 500
  })
  .setTween(tween_link1_on)
  .addTo(controller);
  var scene_link1_off = new ScrollScene({
    triggerElement: "#triggerS1",
    duration: 500
  })
  .setTween(tween_link1_off)
  .offset(3600)
  .addTo(controller);
  var scene_link2_on = new ScrollScene({
    triggerElement: "#triggerS2",
    duration: 500
  })
  .setTween(tween_link2_on)
  .addTo(controller);
  var scene_link2_off = new ScrollScene({
    triggerElement: "#triggerS2",
    duration: 500
  })
  .setTween(tween_link2_off)
  .offset(3600)
  .addTo(controller);
  var scene_link3_on = new ScrollScene({
    triggerElement: "#triggerS3",
    duration: 500
  })
  .setTween(tween_link3_on)
  .addTo(controller);
  var scene_link3_off = new ScrollScene({
    triggerElement: "#triggerS3",
    duration: 500
  })
  .setTween(tween_link3_off)
  .offset(3800)
  .addTo(controller);
  var scene2 = new ScrollScene({
    triggerElement: "#trigger1"
  })
  .setPin("#pinner", {
    pushFollowers: false
  })
  .addTo(controller);
});

$(document).ready(function($) {
  var section_1_tween = TweenMax.fromTo("#animate1", 1, {
    left: 240,
    top: -132,
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);
  var box_tween = TweenMax.fromTo("#level_1", 1, {
    top: -130,
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);
  var section_1_arrow = TweenMax.fromTo("#arrow_large", 1, {
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);
  var section_1_arrow_small = TweenMax.fromTo("#arrow_small", 1, {
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);

  var scene_arrow_large = new ScrollScene({
    triggerElement: "#triggerS1",
    duration: 400
  })
  .setTween(section_1_arrow)
  .offset(1200)
  .addTo(controller);
  var scene_arrow_small = new ScrollScene({
    triggerElement: "#triggerS1",
    duration: 500
  })
  .setTween(section_1_arrow_small)
  .offset(2050)
  .addTo(controller);
  var scene_section = new ScrollScene({
    triggerElement: "#trigger1st",
    duration: 400
  })
  .setTween(section_1_tween)
  .addTo(controller);
  var scene_box = new ScrollScene({
    triggerElement: "#triggerS1",
    duration: 600
  })
  .setTween(box_tween)
  .offset(1600)
  .addTo(controller);
  var scene_parallax = new ScrollScene({
    triggerElement: "#triggerS1",
    duration: 3425
  })
  .setPin("#parallax_2")
  .addTo(controller);

});

$(document).ready(function($) {

  var section_2_tween = TweenMax.fromTo("#animate2", 1, {
    top: -135,
    scale: .1,
    left: 170
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);

  var box_tween_1 = TweenMax.fromTo("#level_3", 1, {
    top: -130,
    scale: 0,
    left: 1600
  }, {
    scale: 1,
    left: 220,
    ease: Circ.easeInOut
  }, 0.05);
  var box_tween_2 = TweenMax.fromTo("#level_4", 1, {
    top: -130,
    scale: 0,
    left: 1600
  }, {
    scale: 1,
    left: 220,
    ease: Circ.easeInOut
  }, 0.05);
  var section_2_arrow = TweenMax.fromTo(".arrow_large", 1, {
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);
  var section_2_arrow_small = TweenMax.fromTo(".arrow_small", 1, {
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);
  var section_2_arrow_four = TweenMax.fromTo("#arrow_four", 1, {
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);


  var scene_arrow_large = new ScrollScene({
    triggerElement: "#triggerS2",
    duration: 500
  })
  .setTween(section_2_arrow)
  .offset(500)
  .addTo(controller);
  var scene_arrow_small = new ScrollScene({
    triggerElement: "#triggerS2",
    duration: 500
  })
  .setTween(section_2_arrow_small)
  .offset(2050)
  .addTo(controller);
  var scene_arrow_small = new ScrollScene({
    triggerElement: "#triggerS2",
    duration: 500
  })
  .setTween(section_2_arrow_four)
  .offset(2200)
  .addTo(controller);
  var scene_section2 = new ScrollScene({
    triggerElement: "#triggerS2",
    duration: 400
  })
  .setTween(section_2_tween)
  .addTo(controller);
  var scene_box = new ScrollScene({
    triggerElement: "#triggerS2",
    duration: 500
  })
  .setTween(box_tween_1)
  .offset(1400)
  .addTo(controller);
  var scene_box_2 = new ScrollScene({
    triggerElement: "#triggerS2",
    duration: 600
  })
  .setTween(box_tween_2)
  .offset(1600)
  .addTo(controller);
  var scene = new ScrollScene({
    triggerElement: "#triggerS2",
    duration: 3400
  })
  .setPin("#two")
  .addTo(controller);
});

$(document).ready(function($) {
  // build tween
  var tween = TweenMax.fromTo("#animate3", 1, {
    left: 240,
    top: -135,
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);
  var box_tween_3 = TweenMax.fromTo("#level_5", 1, {
    top: -130,
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);
  var section_3_arrow = TweenMax.fromTo("#arrow_large_3", 1, {
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);
  var section_3_arrow_small = TweenMax.fromTo("#arrow_small_3", 1, {
    scale: 0
  }, {
    scale: 1,
    ease: Circ.easeInOut
  }, 0.05);

  var scene_arrow_large = new ScrollScene({
    triggerElement: "#triggerS3",
    duration: 400
  })
  .setTween(section_3_arrow)
  .offset(200)
  .addTo(controller);
  var scene_arrow_small = new ScrollScene({
    triggerElement: "#triggerS3",
    duration: 500
  })
  .setTween(section_3_arrow_small)
  .offset(650)
  .addTo(controller);
  var scene_box = new ScrollScene({
    triggerElement: "#triggerS3",
    duration: 500
  })
  .setTween(box_tween_3)
  .offset(500)
  .addTo(controller);
  var scene = new ScrollScene({
    triggerElement: "#triggerS3",
    duration: 300
  })
  .setTween(tween)
  .addTo(controller);
  var scene6 = new ScrollScene({
    triggerElement: "#triggerS3",
    duration: 1800
  })
  .setPin("#three")
  .addTo(controller);
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-23121873-1', 'auto');
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');

/*********************** LightBox ****************************/

$(document).ready(function() {

  $('a[href*=#trigger]:not([href^="in"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  $(".fancybox").fancybox({
    helpers: {
      title: {
        type: 'top'
      }
        } // helpers
    }); // fancybox
}); // ready

bmi_SafeAddOnload(bmi_load, "bmi_orig_img", 0);
