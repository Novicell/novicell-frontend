'use strict';

var novicell = novicell || {};

/* Novicell LazyloadContent
* Original author: Adam Peter Nielsen
* Load content only when visible via AJAX. Great for widgets that are only visible on some devices
* ------
* Dependencies:
* Usage: novicell.lazyload.content(OPTIONAL-CALLBACK-FUNCTION);
* HTML example: <div class="lazyload" data-src="PATH">
* Optional: force lazyload via this attribute: data-load="always"
*/

novicell.lazyload = novicell.lazyload || function () {
//    var self = this;

    function content(callback) {
		$('.lazyload').each(function () {
			if ($(this).html() == '' && $(this).is(':visible') || $(this).data("load") == "always") {
				if ($(this).attr('data-src').length > 4) {
					$(this).append($('<div>').addClass('loading'));
					var path = $(this).data('src');
					var target = $(this);
					$.get(path, function (data) {
						target.html(data);
						if(typeof callback == 'function'){
							callback();
						}
					});
				}
			}
		});
	}

	/* Novicell LazyloadImage
	* Original author: Lars Hesselberg
	* Load images when <img> element appears. Great for speeding up long pages with many images.
	* ------
	* Dependencies: jQuery.appear https://github.com/morr/jquery.appear
	* Usage: novicell.lazyload.image(OPTIONAL-CALLBACK-FUNCTION);
	* HTML example: <img data-src="PATH-TO-Image" class="lazyloadimage">
	*/

    function image(callback) {
		$('.lazyloadimage').each(function () {
			$(this).appear(function () {
				var path = $(this).data('src');
				$(this).attr('src', path);
				if(typeof callback == 'function'){
					callback();
				}
			});
		});

    }
    // public functions:
    return {
        content: content,
        image: image
};

}();



