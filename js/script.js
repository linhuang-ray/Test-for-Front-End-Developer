$(document).ready(function(){
	$('ul.tabs').each(function(){
		var $active, $content, $links = $(this).find('a');

		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		$active.addClass('active');
		$content = $($active.attr('href'));

		$links.not($active).each(function () {
			$($(this).attr('href')).hide();
		});

					// Bind the click event handler
		$(this).on('click', 'a', function(e){
		// Make the old tab inactive.
			$active.removeClass('active');
			$content.hide();
		
			$active = $(this);
			$content = $($(this).attr('href'));
			$active.addClass('active');
			$content.show();
			e.preventDefault();
		});
	});
	
	//this is the jquery code for carousel
	/* buttons that can be turned on (1) and off (0) */
	/* turns auto moving on */
	var auto_slide = 1;
	/* disables the auto moving feature when mouse is hovered over the carousel */
	var hover_pause = 1;
	/* sets auto moving by one image width at once every 5 seconds */
	var auto_slide_seconds = 5000;
	
	/* puts one image to the left of the first one so that when the right arrow is clicked there's a image to be moved over from the left. The 'left: -200px;' css makes it so that this moved over image is hidden to the left combined with the css 'overflow: hidden;' */
	$('#carousel_ul li:first').before($('#carousel_ul li:last'));
	
	if (auto_slide == 1) {
		/* setInterval function causes the slide() function to be run every few seconds defined by the various auto_slid_seconds. It is currently set to go right but you can change it to left if you wish */
		var timer = setInterval('slide("right")', auto_slide_seconds);
	}
	
	if (hover_pause == 1) {
		// remove the previously set setInterval function when mouse pointer is hovered over the #carousel_ul unordered list
		$('#carousel_ul').hover(function() {
			clearInterval(timer)
		}, function() {
			// add back in the setInterval auto-moving function when the mouse moves out of the unordered list area
			timer = setInterval('slide("right")', auto_slide_seconds); 
		});
	}
});

//function for carousel
function slide(where) {
	var item_width = $('#carousel_ul li').outerWidth();
	
	if (where == 'left') {
		// parseInt() is a javascript function that parses out the non-numerical values in a string and returns a numeric value. Here, the 'px' portion of the string is removed so the variable 'left_indent' can be used further down in another function
		// in the css file global.css, relative position of the unordered list #carousel_ul is set to -200 to match the image widths (plus margins if necessary), here that css property is being added or subtracted with the image width depending on the direction of the carousel flow
		var left_indent = parseInt($('#carousel_ul').css('left')) + item_width;
	} else {
		var left_indent = parseInt($('#carousel_ul').css('left')) - item_width;
	}
	// a jquery .animate() function is used to move the unordered list to the near css position in a smooth transition animation.
	// the ':not(:animated)' portion ensures that the jquery animation portion caused by the click of the arrow button is only initiated if there is no auto-move currently in progress on the unordered list. If this isn't set, then a double-move can happen, which screws up the jquery animation
	$('#carousel_ul:not(:animated)').animate({'left': left_indent}, 500, function() {
		// after the jQuery animation is finished, the furthest left/right item is moved to the furthest right/left so that a unlimited carousel loop flow can be achieved and maintained regardless of the number of times the left and right buttons are clicked.
		if (where == 'left') {
			$('#carousel_ul li:first').before($('#carousel_ul li:last'));
		} else {
			$('#carousel_ul li:last').after($('#carousel_ul li:first'));
		}
		// once the left or right image ordering has been finished, the css position 'left:' is resetted to -200px since the reording of the image elements after the jQuery animation has now been completed. This is done because the jQuery animation portion changed this css property and if left by itself, will eventually take the unordered list element off of the visible screen area.
		$('#carousel_ul').css({'left' : '-200px'});
	});
}