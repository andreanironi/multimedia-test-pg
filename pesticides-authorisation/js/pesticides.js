(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-23121873-1', 'auto');
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');

(function($){
	var width = $(document).width();
	if (width > 750 && width <= 970) {
		$(".step-6.menu-item-2").data('line', '2560');
	} else {
		$(".step-6.menu-item-2").data('line', '2500');
	}

	if (width > 970 && width <= 1170) {
		$(".step-6.menu-item-2").data('line', '2600');
	} else {
		$(".step-6.menu-item-2").data('line', '2500');
	}

	if (width > 970) {
		style="width:33.3333%"
		$(".col-sm-5.col-sm-offset-4.col-sm-push-1.col-xs-6.col-xs-push-6").width('33.3333%');
	} else {
		$(".col-sm-5.col-sm-offset-4.col-sm-push-1.col-xs-6.col-xs-push-6").width('41.66667%');	
	}
})(jQuery);

! function(a) {
  "use strict";
  var b = function() {
      var b = a(document).width();
      return 750 >= b ? .4 : 970 >= b ? .77 : 1170 >= b ? 1 : 1.2
    },
    c = b();
  a(window).resize(function() {
    this.resizeTO && clearTimeout(this.resizeTO), this.resizeTO = setTimeout(function() {
      a(this).trigger("resizeEnd")
    }, 500)
  }), a(window).on("resizeEnd", function() {
    c !== b() && location.reload()
  }), a("body").css({
    overflow: "hidden",
    height: "100%"
  }), a("ul.social-links").css({
    display: "none"
  }), a("#main-wrapper").css({
    opacity: "0.2"
  }), a(".popup .content").hide(0), a(".popup .content:eq(1)").show(0), a(".popup .toggler, .popup .content").on("click", function(b) {
    b.preventDefault();
    var c = a(this).next(".content"),
      d = c.is(":hidden");
    a(".popup .content:visible").fadeToggle(), d && c.fadeIn();
    var e = c.offset().left;
    0 > e && c.css("left", -e + 2)
  }), a(".popup .content .close-button").on("click", function(b) {
    b.preventDefault();
    var c = a(this).next(".content"),
      d = c.offset().left;
    0 > d && c.css("left", -d + 2)
  });
  var d = 0;
  a(".video-link").each(function() {
    a(this).data("index", ++d), a(this).on("click", function() {
      a("#youtubeModal .modal-body").html('<iframe width="598" height="450" src="' + a(this).data("video") + '" frameborder="0" allowfullscreen></iframe>'), a("#youtubeModal").modal(), ga('send', 'event', {eventCategory: 'Video \'' + a(this).data("name") + '\'', eventAction: 'Opened'});
    })
  }), a("#youtubeModal").on("hidden.bs.modal", function() {
    a("#youtubeModal .modal-body").empty()
  });
  var e = a("#menu-wrapper"),
    f = function(a, b, c) {
      if (!b || b !== e.hasClass("closed")) {
        var d = e.hasClass("closed") ? 0 : -e.outerWidth(!0);
        e.toggleClass("closed"), c ? e.css({
          right: d
        }) : e.animate({
          right: d
        }, 1e3)
      }
    };
  e.find(".toggler").on("click", f), f(null, !1, !0), e.find(".scrollTo").on("click", function(b) {
    b.preventDefault(), a.scrollTo(a(this).attr("href"), 800)
  });
  var g = 0;
  e.animate({
    right: g
  }, 1e3);
  var h = a("#home").height(),
    i = .75 * parseInt(h) + "px";
  a("#home").css({
    height: i
  }), a(window).scroll(function() {
    e.addClass("closed"), e.css({
      right: "-285px"
    })
  }), a(window).load(function() {
    var b = a.superscrollorama({
      triggerAtCenter: !1,
      playoutAnimations: !0
    });
    b.addTween("#home", TweenMax.to("#home .mosaic ", 1, {
      css: {
        left: "-300px"
      }
    }), 300, 5);
    var d = a("#breadcrumbs-wrapper .breadcrumbs"),
      f = d.clone();
    f.addClass("fixed"), a(d).after(f), b.addTween(d, TweenMax.from(f, .1, {
      display: "none"
    })), b.addTween("#home", TweenMax.to("#home .fake-bg img", 1, {
      css: {
        bottom: "-150px",
        left: "-10%"
      }
    }), 600, 0), b.addTween("#monitoring .step-4", TweenMax.to(".social-links", 1, {
      css: {
        opacity: 0
      }
    }));
    var g = {
        industry: "#E6F1DB",
        state: "#FFF2D0",
        efsa: "#F9DEC6",
        commission: "#C4C7D9",
        "default": "#FFFFFF"
      },
      h = function(a) {
        return g[a]
      };
    a(".title").each(function() {
      b.addTween(a(this), TweenMax.from(a(this).find(".underline"), 1, {
        css: {
          width: 0
        }
      }), 0, -200)
    });
    var i = null,
      j = null;
    c > .5 && a(".section .fake-bg").css("height", 0), a(".title").each(function() {
      b.addTween(a(this), TweenMax.from(a(this).find("h2"), 1, {
        color: "#DDD"
      }), 0, -200)
    }), a(".title, .step").each(function() {
      var d, e, f, g, k = null;
      k = i ? i : "industry", g = j ? j : "menu-item-1", d = a(this).next(".step");
      var l = a(this);
      e = "default", d.hasClass("industry") && (e = "industry"), d.hasClass("state") && (e = "state"), d.hasClass("efsa") && (e = "efsa"), d.hasClass("commission") && (e = "commission"), d.hasClass("step") && (i = e), f = "default", d.hasClass("menu-item-1") && (f = "menu-item-1"), d.hasClass("menu-item-2") && (f = "menu-item-2"), d.hasClass("menu-item-3") && (f = "menu-item-3"), d.hasClass("step") && (g = f);
      var m = d.prevAll(".fake-bg"),
        n = new TimelineLite;
      n.append(TweenMax.to(a("#breadcrumbs-wrapper"), .1, {
        onComplete: function() {
          d.hasClass("step") && (a("#breadcrumbs-wrapper li.selected").removeClass("selected"), a("#breadcrumbs-wrapper li." + f).addClass("selected"), TweenMax.to("#main-wrapper", .2, {
            css: {
              backgroundColor: h(e)
            }
          }), a(".social-links li").removeClass(), a(".social-links li").addClass(e), a(".section-menu li.selected").removeClass("selected"), a(".section-menu li." + f).addClass("selected")), c > .5 && TweenMax.to(m, .5, {
            css: {
              height: c * d.data("line")
            }
          })
        },
        onReverseComplete: function() {
          if (d.hasClass("step") && (a("#breadcrumbs-wrapper li.selected").removeClass("selected"), a("#breadcrumbs-wrapper li." + g).addClass("selected"), TweenMax.to("#main-wrapper", .2, {
              css: {
                backgroundColor: h(k)
              }
            }), a(".social-links li").removeClass(), a(".social-links li").addClass(k), a(".section-menu li.selected").removeClass("selected"), a(".section-menu li." + g).addClass("selected")), c > .5) {
            var b = l.data("line") ? c * l.data("line") : 0;
            TweenMax.to(m, .5, {
              css: {
                height: b
              }
            })
          }
        }
      })), c > .5 && b.addTween(a(this), TweenMax.from(d, 1, {
        opacity: 0
      }), 0, -150 * c), b.addTween(a(this), n, 0, -150 * c)
    }), a(".step").css("background", "transparent"), a("body").removeAttr("style"), a("#main-wrapper").css({
      opacity: "1"
    }), a("#preload").css({
      display: "none"
    }), a("ul.social-links").css({
      display: "block"
    }), e.removeClass("closed")
  })
}(jQuery);