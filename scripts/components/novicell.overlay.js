'use strict';

var novicell = novicell || {};

/* Novicell overlay
* Original author: Adam Peter Nielsen
* Load content into an overlay. Style overlay via the optional class
* ------
* Dependencies: none
* Usage: novicell.overlay.set({'content':contents,'class':'foo'});
* Optional callback functions: novicell.overlay.set({ 'content': html, 'callbackOpen': FUNCTIONNAME, 'callbackClose': FUNCTIONNAME});

* Required LESS:
* - LESS:
	#ncOverlay{position:absolute;top:0;left:0;width:100%;height:100%;z-index:3300;background:rgba(0,0,0,0.5);display:none;cursor:pointer;}
	#ncOverlay-content{position:absolute;top:0;right:0;bottom:0;left:0;width:50%;height:50%;margin:auto;z-index:3301;display:none;}
	.ncOverlay-inner{background:@white;height:100%;overflow:hidden;padding:15px 0;.border-radius(3px);.box-shadow(0 0 8px @grayLighter);}
	.ncOverlay-inner-scroll{overflow-y:auto;height:100%;padding:0 20px;}
	.ncOverlay-close{margin:-15px 5px -20px -20px;.box-shadow(0 0 8px @grayLight);cursor:pointer;}
*/

novicell.overlay = novicell.overlay || function () {
	function set(data) {
		// reset overlay the hard way
		if (0 < $('#ncOverlay').length) {
			$('#ncOverlay,#ncOverlay-content').remove();
		}
		var btnClose = $('<a>').attr('href', '#closeOverlay').addClass('ncOverlay-close btn btn-small btn-inverse pull-right').append($('<i>').addClass('icon-remove icon-white'));
		var overlayInner = $('<div>').addClass('ncOverlay-inner').append($('<div>').addClass('ncOverlay-inner-scroll').append(data.content));

		$('body').append($('<div>').attr('id', 'ncOverlay').fadeIn("fast"));

		$('body').append($('<div>').attr('id', 'ncOverlay-content').append(btnClose).append(overlayInner).fadeIn("fast", function () {
			if (typeof data.callbackOpen == 'function') {
				data.callbackOpen();
			}
		}));

		$('#ncOverlay').height($('body').height());

		if (data['class'] !==undefined) {
			$('#ncOverlay-content').addClass(data['class']);
		}

		$('#ncOverlay-content').css({ 'margin-top': ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop) + 40 });

		$('#ncOverlay,.ncOverlay-close').on("click", function (e) {
			e.preventDefault();
			$('#ncOverlay-content').stop().fadeOut("fast", function () {
				$(this).remove();
			});

			$('#ncOverlay').stop().fadeOut("fast", function () {
				$(this).remove();
				if (typeof data.callbackClose == 'function') {
					data.callbackClose();
				}
			});
		});

		// escape click bind on close button
		$(document).keyup(function (e) {
			if (e.keyCode == 27) {
				$('.ncOverlay-close').click();
			}
		});

	}

	return {
		set:set
	};
}();
