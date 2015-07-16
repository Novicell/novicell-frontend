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

// Document ready
$(function () {
    // Only include Novicell files that you use!
     novicell.responsive.init();
    // novicell.adjustFigureImage.init();
    // novicell.lazyload.content();
    // novicell.lazyload.image();

    // Call new funtions here like this:
    projectName.slider.heroSlider($('.owl-carousel'));

}); // Document ready end


/*
 *  Use the following if needed
 */

// Window load
// $(window).load(function(e){
//     // call functions here
// }); // Window load

// // Window resize
// $(window).resize(function(e){
//     // call functions here
// }); // Window resize

// // Window scroll
// $(window).scroll(function(e){
//     // call functions here
// }); // Window scroll