jQuery(function($){
  /* BROWSER Detection */
  if(!$.browser){
    $.browser = {};
    $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
  }
  $.isIdevice = (window.orientation != null);
  $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));

  /* TRICKY RESIZE END CUSTOM EVENT */
  $(window).resize(function() {
   if(this.resizeTO) clearTimeout(this.resizeTO);
   this.resizeTO = setTimeout(function() {
     $(this).trigger('resizeEnd');
   }, 800);
 });

  /* READ MORE BTN */
  var readMore = $('<a href="#" class="toggle-more" data-temp="-">+</a>');
  $('div.text').each(function() {
    var more = $(this).find('.more');
    if(more.length > 0){
     more.hide();
     $(this).append(readMore.clone());
   }
 });
  $('div.text').on('click', 'a.toggle-more', function(e){
    e.preventDefault();
    $(this).parent().addClass('no-shadow');
    $(this).parent().find('.more').slideToggle("slow", function() {
      $(this).parent().removeClass('no-shadow');

      if($(this).is(':visible')) {
        var textboxname = $(this).parent().attr('class');
		ga('set', 'nonInteraction', true);
		ga('send', 'event', {eventCategory: 'Text Box '+textboxname, eventAction: 'Opened'});
      }
    });
    var tmp = $(this).text();
    $(this).text($(this).data('temp'));
    $(this).data('temp', tmp);
  });

  /* SCROLLORAMA */
  var browserH,
  headerH,
  docBottom,
  scrollAnim = $.superscrollorama({playoutAnimations: false});

  var reverseAnim = true;

  function initAnimMobile() {
   scrollAnim.setScrollContainerOffset(0, 200);
   docBottom = $("<div>");
   docBottom.attr('id', 'document-bottom');
   docBottom.appendTo('#brochure-wrappper');

   $('h1,  h2').each(function(){
     scrollAnim.addTween($(this), TweenMax.from($(this), 1, {css:{color: "#DDD"}, immediateRender:true}), 0, 0, reverseAnim);
   });
   $('.text, .mobile-illus').each(function(){
     scrollAnim.addTween($(this), TweenMax.from($(this), 1, {css:{opacity: 0.4}, immediateRender:true}), 0, 0, reverseAnim);
   });

   $(window).on('resizeEnd', updateAnimMobile);
   $(window).trigger('resizeEnd');
 }

 function updateAnimMobile() {
  browserH = $(window).innerHeight();

  var docBottomPosition = browserH/1.9;
  if($.isIdevice) docBottomPosition += 100;

  docBottom.css({ position: 'absolute', bottom: docBottomPosition });
  scrollAnim.addTween('#document-bottom', TweenMax.fromTo($('.patch:visible'), 1, {css:{height: browserH*60/100}, immediateRender:true}, {css:{height: 0}}));

  scrollAnim.triggerCheckAnim();
}

function initAnim() {

 /* Dots animation apart */
 var patch = $('#background-wrapper .patch');

 var cachePrevHeight =  patch.height();
 var cachePrevWidth =  '51%';
 $('.title-dot').each(function(){
   var prevHeight = cachePrevHeight;
   var newHeight =  patch.height() - ($(this).offset().top - patch.offset().top);
   if($('#content h1:last .title-dot').is(this)) newHeight = 0;

   var newWidth = '100%';
   var prevWidth = cachePrevWidth;

   scrollAnim.addTween($(this), TweenMax.fromTo(patch, 0.5,
     {css:{height: prevHeight, width: prevWidth}},
     {css:{height: newHeight, width: newWidth}, onComplete:function(){
       patch.stop().animate({height: newHeight},function(){
         patch.css({width: newWidth})
       });

       if(newHeight == 0) $('#content .media:last').animate({'opacity': 1});
     }, onReverseComplete:function(){
       patch.stop().css({width: prevWidth}).animate({height: prevHeight});
     }}
     ), 0, -200 ,reverseAnim);

   cachePrevHeight = newHeight;
   cachePrevWidth = newWidth;
 });


 /* revamp */
 var patch = $('#background-wrapper .patch');

 $('.title-dot').each(function() {
   var dot = $(this);
   var title = dot.parent();
   var text = title.next('.text');

   var animGroup = new TimelineLite();

   animGroup.append([
     TweenMax.from(title, 0.5, {css:{color:'#DDD'}}),
     TweenMax.fromTo(dot, 0.5, {css:{width:0}, immediateRender:true}, {css:{width:30}, onComplete: function(){
       dot.animate({width: 20});
     }})
     ]);

   if(text.length > 0) animGroup.append(TweenMax.fromTo(text, 0.5, {css:{opacity: 0}, immediateRender:true}, {css:{opacity: 1}}));

   scrollAnim.addTween($(this), animGroup, 0, -200 ,reverseAnim);
 });

 /* truck animation */
 scrollAnim.addTween($('#factorytofork .illus-1b'), TweenMax.to($('#factorytofork .illus-1b'), 3, {css:{left:'56%'}}),0 ,0 ,reverseAnim);

 /* illustration fade in */
 $('.spare-fade').each(function(){
  scrollAnim.addTween($(this), TweenMax.fromTo($(this), 0.5, {css:{opacity:0}, immediateRender: true}, {css:{opacity:1}}),0 ,0 ,reverseAnim);
});

 /* FAKE FADE IN FOR ... IE8 */
 $('.dotted-fade, .media').append("<div class=\"img-mask\"></div>");
 $('.img-mask').each(function(){
  scrollAnim.addTween($(this), TweenMax.fromTo($(this), 0.5, {css:{opacity:1}, immediateRender: true}, {css:{opacity:0}}),0 ,0 ,reverseAnim);
});

}

$(window).load(function(){

 if($(window).width() > 979) {
  /* Activate popups */
  $(".media.video").colorbox({iframe:true, width:"580px", height:"350px"});
  $(".media.inline, .toggler").colorbox({inline:true, width:"50%"});

  if(!$.browser.device) {
    initAnim();
  }else{
    $('#header').css({ position:'relative' });
    $('#subheader').css({ margin:'0' });

    var patch = $('#background-wrapper .patch');
    patch.css({
      width: '100%',
      position: 'fixed',
      bottom: 0,
      height: '50%'
    });

    var browserH = $(window).innerHeight();
    scrollAnim.addTween('#howefsacommunicates-title', TweenMax.fromTo($('.patch:visible'), 1, {css:{height: browserH*60/100}}, {css:{height: 0}}));
  }

  /* social link colors */
  $(".nav li").on('activate', function() {

   var color = $(".nav .active a").css('color');
   $('#newsletter, #social-links a').css({background: color});
   $('#menubar').css({'border-color': color});

 });

  /* subscribe button */
  $('#newsletter-button').on('click' ,function(e) {
    e.preventDefault();
    var that = $(this);
    var input = that.prev();

    if(input.val()){
      $.ajax({
        url: "subscribe.html",
        type: "POST",
        data: {email : input.val()}
      }).success(function() {
        that.parent().fadeOut('slow', function() {
          that.parent().replaceWith('<span class="alert alert-success">Thank you for subscribing to THE EFSA highlights newsletter.</span>');
          that.parent().fadeIn('slow');
        });
      });
    } else {
      that.parent().addClass('control-group').addClass('error');
    }
  });

}else{
 initAnimMobile();
}
});
});
