'use strict';
/*
* Novicell master
* Use this file to call functions in other files, on document ready, window.resize etc.
*/

var novicell = novicell || {};
var projectName = projectName || {};

// Document ready
document.addEventListener('DOMContentLoaded', function(){
    novicell.validate.init(); // Init Validation
    novicell.inputMasking.init(); //Init input masking
    novicell.persistentField.init(); //Init persistentField
    novicell.topbarRelated.init(); 
    novicell.pageheaderSlider.init();
    novicell.cookieInfo.init(); 
    novicell.scrollProgressBar.init();
    novicell.navigation.init();
    novicell.navTrigger.init();
    novicell.pageheaderVideoYoutube.init();

    //SetTimeout to fix latency with loaded elements in e.g. Vue components
    setTimeout(() => {
        svg4everybody(); // Fix SVG spritemap in IE/Edge
    });
    console.log('it works!');
});
