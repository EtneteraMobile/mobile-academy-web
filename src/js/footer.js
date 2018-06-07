// ==== FOOTER ==== //

// A simple wrapper for all your custom jQuery that belongs in the header
;(function($){
  $(function(){
    
  	$('.speakers-carousel').flickity({
	  // options
	  cellAlign: 'left',
	  pageDots: false,
	  contain: true
	});

	$('.about-carousel').flickity({
	  // options
	  cellAlign: 'left',
	  pageDots: false,
	  contain: true
	});

    $('.about-carousel-mobile').flickity({
      // options
      cellAlign: 'left',
      pageDots: false,
      contain: true
    });


	$('.speakers-list').flickity({
	  asNavFor: '.speakers-carousel',
	  contain: true,
	  pageDots: false,
	  cellAlign: 'left'
	});


///////////////////////////////////////



    if($(window).width() <= 767){

        $(".menu-toggle, .nav a").on('click', function(){

            $('html').toggleClass('fix-body');
            $('nav').toggleClass('active');
            
            var text = $('.menu-toggle__text').text();

            console.log(text);
            
            $('.menu-toggle__text').text(
                text === "Menu" ? "Zavřít" : "Menu");

        });

    }


///////////////////////////////////////

	$(document).on('click', '.accordion__title', function(){


		var active = $(this).parent().hasClass('active');
		

		if(active === false) {

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
		}

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

function hasScrolled() {
    var st = $(this).scrollTop();
    var header = $('.home header');
    

    if(st >= 200) {
    	header.addClass('small');
    } else {
    	header.removeClass('small');
    }

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta){
        return;
    }
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        header.removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            header.removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}


setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);


///////////////////////////////////////


function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.nav ul a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        var refElementPosition = refElement.position().top;
        if (refElementPosition <= scrollPos && refElementPosition + refElement.height() > scrollPos) {
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
