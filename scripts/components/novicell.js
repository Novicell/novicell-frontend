'use strict';
/*global console:true */

/*!
 *
 *  Novicell JavaScript Library v0.5
 *  http://www.novicell.dk
 *
 *  Copyright Novicell
 *
 */

// Prevent console errors in IE
if (typeof (console) === 'undefined') {
	var console = {};
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function () { };
}
// Shorthand for console.log
function cl(d) {
	return console.log(d);
}

// Init the novicell js lib

var novicell = novicell || {};

$(function () {
	if (typeof projectName !== 'undefined') {
		$('body').prepend('<div class="debug" style="text-align:center;font-weight:bold;background:#66CE5F;padding:20px;margin-bottom:50px;">Hi there. Remember to rename the "projectName" object in master.js file :)</div>');
	}
});

