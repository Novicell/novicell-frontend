'use strict';
/*
* Novicell master
* Use this file to call functions in other files, on document ready, window.resize etc.
*/

var novicell = novicell || {};
var projectName = projectName || {};

// Document ready
document.addEventListener('DOMContentLoaded', function(){
    svg4everybody(); // Fix SVG spritemap in IE/Edge
    novicell.cookieInfo.init(); 
    novicell.siteNavigation.init(); 

    console.log('it works!');
});


