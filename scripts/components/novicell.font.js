'use strict';

/**
* @desc Load fonts async with webfontloader
* less example: 
* js example:
	novicell.font.webfont({
		google: { families: ['Roboto:400,700italic:latin'] },
		typekit: { id: ['rzx0prp'] },
		custom: { families: ['SkipLegDay'], urls: ['/dist/css/webfont.min.css'] }
	});
* @author Jonas Havmøller
*/


var novicell = novicell || {};
var WebFontConfig = WebFontConfig || {};

novicell.font = novicell.font || function () {

	// https://github.com/typekit/webfontloader
	function webfont(fontObj) {

		// Set the font Obj to the WebFontConfig
		if(typeof fontObj !== undefined && fontObj !== null) {
			WebFontConfig = fontObj;
			WebFontConfig.timeout = 2000;
		}
		
		(function() {
			var wf = document.createElement('script');
			wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
			wf.type = 'text/javascript';
			wf.async = 'true';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(wf, s);
		})();




		// DEBUG ALERT
		if (typeof WebFontConfig.typekit !== 'undefined' && WebFontConfig.typekit.id[0] === "rzx0prp") {
			$('body').prepend('<div class="debug" style="text-align:center;font-weight:bold;background:red;padding:20px;">Please load your own typekit</div>');
		}
	}

	return {
		webfont: webfont
	};
} ();
