//= ../../node_modules/jquery/dist/jquery.js

// Toggle-menu
$(document).ready(function(){
  $('.btn-hamburger').on('click', function(){
		$('.btn-hamburger__icon, .header-menu').toggleClass('open')
	});
});

$(document).ready(function(){
  $('.emergency-icon, .closebtn').on('click', function(){
		$('.emergency, .emergency__list').toggleClass('open');
		$('.emergency, .emergency__list').removeClass('hidden');
	});
});


// Smooth-scroll
function moveToSection(event) {
	event.preventDefault();

	var target = $(event.target).attr('href');
	var offsetTop = $(target).offset().top;

	if ($('.header-menu').hasClass('open'))  {
			$('.header-menu, .btn-hamburger__icon').removeClass('open');
			$('body').removeClass('hidden');	
	}

	$('html, body').animate({
			scrollTop: offsetTop,
	}, 1100);
}

$(".smoothScroll").on('click', moveToSection);