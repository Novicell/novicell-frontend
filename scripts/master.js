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
(function ($) {
    // Only include Novicell functions that you use!
    novicell.embed.onLoad(); 

    // Call new functions here like this:
    //projectName.slider.heroSlider($('.owl-carousel'));
    svg4everybody(); // Fix SVG spritemap in IE/Edge


    novicell.font.webfont({
        google: { families: ['Roboto:300:latin'] },
        custom: { families: ['SkipLegDay'], urls: ['/dist/css/webfont.min.css'] }
    });

    /*
    *  Use the following if needed
    */

    // Window load
    // $(window).load(function(e){
    //     // call functions here
    // }); // Window load

    // Window resize (debounced)
    $(window).smartresize(function(e){
        novicell.embed.onResize();
    }); // Window resize

    // Window scroll (debounced)
    $(window).smartscroll(function (e) {
        // call functions here
        novicell.embed.onScroll();
    }); // Window scroll

})(jQuery); // Document ready end


