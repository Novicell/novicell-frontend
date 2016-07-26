'use strict';
/**
    * @desc Debouncing wrapper script
    * Credit: http://www.hnldesign.nl/work/code/debouncing-events-with-jquery/
    * examples:
    *    $(window).smartresize(function(e){
    *        // do stuff as soon as the user stops resizing his browser for longer than 100ms
    *    })
    *
    *    $(window).smartscroll(function(e){
    *        // do stuff as soon as the user stops scrolling for longer than 100ms
    *    })
    *
    *    $(window).smartmousemove(function(e){
    *        // do stuff as soon as the user stops moving his mouse for longer than 100ms
    *    })
    * @author Danni Larsen - DLA
    * @param e - the event
    * @requires jquery
*/

var deBouncer = function ($, cf, of, interval) {
	// deBouncer by hnldesign.nl
	// based on code by Paul Irish and the original debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced() {
			var obj = this, args = arguments;
			function delayed() {
				if (!execAsap){
					func.apply(obj, args);
				}
				timeout = null;
			}
			if (timeout){
				clearTimeout(timeout);
			}
			else if (execAsap){
				func.apply(obj, args);
			}
			timeout = setTimeout(delayed, threshold || interval);
		};
	};
	jQuery.fn[cf] = function (fn) { return fn ? this.bind(of, debounce(fn)) : this.trigger(cf); };
};

//register debouncing functions
//deBouncer(jQuery,'new eventname', 'original eventname', timeout);
//Note: keep the jQuery namespace in mind, don't overwrite existing functions!
deBouncer(jQuery, 'smartresize', 'resize', 150);
deBouncer(jQuery, 'smartscroll', 'scroll', 250);
deBouncer(jQuery,'smartmousemove', 'mousemove', 250);