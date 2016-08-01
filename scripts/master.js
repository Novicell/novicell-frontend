'use strict';
/*
* Novicell master
*  Author: APN modified by DLA
*  Use this file to call functions in other files, on document ready, window.resize etc.
*  ------
* Dependencies: jquery, novicell.js, other files with awesome functions.
*  Usage: $(function () {
*              projectName.slider.heroSlider($('.owl-carousel'));
*         }); // Document ready end
*/

var novicell = novicell || {};
var projectName = projectName || {};

// Document ready
$(function () {
	// Only include Novicell functions that you use!
	novicell.map.init();
	novicell.cookieInfo.init();
	novicell.embed.loadEmbeds();
	//novicell.responsiveLazyloadImage.onLoad();

	// Call new functions here like this:
	//projectName.slider.heroSlider($('.owl-carousel'));
	svg4everybody(); // Fix SVG spritemap in IE/Edge



	novicell.font.webfont({
		google: { families: ['Roboto:400,700italic:latin', 'Droid+Sans:400,700:latin'] },
		typekit: { id: ['rzx0prp'] },
		custom: { families: ['SkipLegDay'], urls: ['/dist/css/webfont.min.css'] }
	});
	//novicell.font.local("Danni Er Nice");

}); // Document ready end


/*
*  Use the following if needed
*/

// Window load
// $(window).load(function(e){
//     // call functions here
// }); // Window load

// Window resize (debounced)
$(window).smartresize(function(e){
	novicell.responsiveLazyloadImage.onResize();
	novicell.embed.onResize();
}); // Window resize

// Window scroll (debounced)
$(window).smartscroll(function (e) {
	// call functions here
	if ($('.responsiveLazyload').length) {
		novicell.responsiveLazyloadImage.onScroll();
	}
	if ($('.embed-media-item').length) {
		novicell.embed.loadEmbeds();
	}
}); // Window scroll

// // Window mousemove (debounced)
// $(window).smartmousemove(function(e){
//     // do stuff as soon as the user stops moving his mouse for longer than 100ms
// }); // Window mousemove