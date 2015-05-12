/* Novicell responsive
* Original author: Adam Peter Nielsen, modified by Mikkel Mandal, Lars Hesselberg
*  Adds handy css classes that match css media queries for doing css like .phone h1{color:@dark;}
* ------
* Dependencies: Modernizr
* Usage:
	// responsive ready callback
	var optionalcallback = function () {

		// run this stuff when "resizing" the DOM/after a resize and so on
	
	}; 

	novicell.responsive.init(optionalcallback);

* Custom breakpoints can be set in master.js:
    novicell.responsive.breakpoints({
        0: 'phone phone-portrait mobile',
        480: 'phone phone-landscape tablet-portrait mobile',
        768: 'tablet tablet-landscape mobile',
        980: 'desktop desktop-small',
        1185: 'desktop desktop-large',
        1366: 'desktop desktop-large television'
    });

*/

var novicell = novicell || {};




novicell.responsive = novicell.responsive || function () {

    var responsiveMode = 'desktop';

    var _breakpoints = {
        0: 'phone phone-portrait mobile',
        480: 'phone phone-landscape tablet-portrait mobile',
        768: 'tablet tablet-landscape mobile',
        980: 'desktop desktop-small',
        1200: 'desktop desktop-large'
    }

    function breakpoints(customBp) {
        if (customBp !== undefined) {
            _breakpoints = customBp;
        }
        return _breakpoints;
    }

    function getMode() {
        var w = $(window).outerWidth(true);
        $.each(_breakpoints, function (breakpoint, newResponsiveMode) {
            if (w >= parseInt(breakpoint, 10)) {
                responsiveMode = newResponsiveMode;
            }
        });
        return responsiveMode;
    }

    function init(callback) {
        if (Modernizr.mq('(min-width: 0px)')) {
            setMode(callback);
            $(window).resize(function () {
                setMode(callback);
            })
            .bind('orientationchange', function () {
                $(window).resize();
            });
            return self;
        }
    }

    function viewport() {
        var e = window
        , a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width: e[a + 'Width'], height: e[a + 'Height'] }
    }

    function setMode(callback) {
        var w = viewport().width;
        var responsiveMode = getMode();
        if ($('body').attr('class') != responsiveMode) {
            $('body').attr('class', responsiveMode);
            if (typeof callback == 'function') {
                callback();
            }
        }
        return self;
    }
	function image(){
		[].forEach.call( document.querySelectorAll('.responsiveimg'), function(el) {
			var w = el.offsetWidth;
			var src = el.getAttribute('data-imgsrc');
			var wRnd = Math.round(w/50)*50;
			el.insertAdjacentHTML('afterbegin','<img src="'+src+'?width='+wRnd+'&quality=75" width="'+w+'">');
		});
	}
    return {
        init: init,
        image: image,
        breakpoints: breakpoints,
        viewport: viewport
    }
}();
