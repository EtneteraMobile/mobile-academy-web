// ==== FOOTER ==== //

// A simple wrapper for all your custom jQuery that belongs in the header
;(function($){
  $(function(){
    
      	$('.speakers-carousel').flickity({
	  // options
	  cellAlign: 'left',
	  pageDots: false,
	  contain: true,
	  cellAlign: 'left'
	});

	$('.about-carousel').flickity({
	  // options
	  cellAlign: 'left',
	  pageDots: false,
	  contain: true,
	  cellAlign: 'left'
	});


	$('.speakers-list').flickity({
	  asNavFor: '.speakers-carousel',
	  contain: true,
	  pageDots: false,
	  cellAlign: 'left'
	});


///////////////////////////////////////

	// var scrolltop = function(target){
	// 		$("html, body").animate({
	//           scrollTop: $(target).offset().top
	//         }, 1000);
	// 	};

	// $("a[href*='#']:not([href='#']):not([href='#inline_content'])").click(function() {
 //    if (location.pathname.replace(/^\//,"") === this.pathname.replace(/^\//,"") && location.hostname === this.hostname) {
 //      var target = $(this.hash);
 //      target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
 //      if (target.length) {
 //      	scrolltop(target);
 //        return false;
 //      }
 //    }
 //  });


///////////////////////////////////////

	$(document).on('touchstart click', '.accordion__title', function(){


		var active = $(this).parent().hasClass('active');
		

		if(active == false) {

			$(".accordion__item").each(function(){
				$(this).removeClass('active');	
			});
			
			$(".accordion__content").each(function(){
				$(this).slideUp();	
			});

			$(this).parent().addClass('active');
			$(this).siblings('.accordion__content').slideDown();

		} else {

			$(".accordion__item").each(function(){
				$(this).removeClass('active');	
			});
			
			$(".accordion__content").each(function(){
				$(this).slideUp();	
			});
		};

	});



///////////////////////////////////////


// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 60;

$(window).scroll(function(event){ 
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    

    if(st >= 200) {
    	$('header').addClass('small');
    } else {
    	$('header').removeClass('small');
    }

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta){
        return;
    }
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}


///////////////////////////////////////


function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
} 
    
    
       $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target,
        	$target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });


///////////////////////////////////////



  });
}(jQuery));
