'use strict';
/**
* @desc Cookie info dialog plugin
* examples novicell.cookieInfo.init();
* @author Danni Larsen - DLA
* @requires jquery
*/

var novicell = novicell || {};

novicell.cookieInfo = novicell.cookieInfo || function(){
	var $body = $('body');

	function init() {
		var $cookieInfo = $('#cookie-info');
		var $cookieClose = $('#cookie-info-close');
		var $cookieOpen = $('#cookie-info-open');

		if ($cookieInfo.length) {
			// If we have displayed it once, set cookie for one year
			if (getCookie("cookieAccept") === "displayed") {
				setCookie("cookieAccept", "accepted", 365);
			}

			// Check if the cookie info has been displayed, if not set session cookie
			if (getCookie("cookieAccept") === "") {
				setCookie("cookieAccept", "displayed");

				setTimeout(function() {
					$body.addClass('cookie-info-show');
				}, 1000);
			}

			// Button eventlisteners
			$cookieOpen.click(function() {
				showCookie();
			});

			$cookieClose.click(function() {
				hideCookie();
				setCookie("cookieAccept", "accepted", 365);
			});
		}
	}

	// Functions for opening an closing the cookie-info
	function showCookie(){
		$body.addClass('cookie-info-show');
	}

	function hideCookie(){
		$body.removeClass('cookie-info-show');
	}

	return {
		init: init
	};
}();

/* Cookie helper functions
*******************************/

// Get cookie
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' '){ c = c.substring(1); }
		if (c.indexOf(name) === 0){ return c.substring(name.length,c.length); }
	}
	return "";
}

// Set cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 60 * 60 * 1000 * 24));
	var expires = "expires=" + d.toUTCString() + ";";
	var path = "path=/";
	document.cookie = cname + "=" + cvalue + "; " + expires + path;
}