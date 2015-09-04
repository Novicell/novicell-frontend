/* Novicell AdjustFigureImage
* Original author: Adam Peter Nielsen, modified by Lars Hesselberg
*  set figure height and image margin
* ------
* Usage: add this to ready novicell.adjustFigureImage.init();
* Recommended CSS:
    figure{margin:0;overflow:hidden;}
    figure img{display:block;margin:0 auto}
* HTML example: <figure><img scr="whatever.png"></figure>
* optional: add class="ignore-adjustFigureImage" to prevent adjust. 
*/
//

novicell.adjustFigureImage = new function(){
	this.init = function(){
		$('body').find('figure').not('.ignore-adjustFigureImage').each(function () {
			if ($(this).find('img').length != 0) {
				$(this).find('img').bind("load", function () {
					var $fig = $(this).closest('figure');
					if ($(this).height() >= $fig.height()) {
						$(this).height($fig.height());
					}
					$(this).css('margin-top', ($fig.height() - $(this).height()) * 0.5 + 'px');
				});
			}
		});
	}
}


