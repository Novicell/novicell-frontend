/**
  * @desc new responsive lazyload image script, servering the image depending on parent-wrapper width and aspect-ratio parameter
  * html example <img src="/media/1001/on-top-of-earth.jpg" data-height-ratio="1" data-focalpoint="0.96885813148788924,0.49090909090909091" data-mode="crop" data-quality="75" data-filter="greyscale" class="img-circle" alt="Random alternative text" title="Random title 2" property="contentUrl" />
  * js init example: novicell.responsiveLazyloadImage.image();
  * js resize example: novicell.responsiveLazyloadImage.onResize();
  * js scroll example:
  * if($('.responsiveLazyload').length)
  *     novicell.responsiveLazyloadImage.image();
  * @author Tommy Pedersen - TPE & Danni Larsen - DLA
  * @return generates img and removes noscript image
  * @requires jquery@1.11.3
  * @note: Just beautiful!
*/

var novicell = novicell || {};

novicell.responsiveLazyloadImage = novicell.responsiveLazyloadImage || function () {
    var self = this;
    var lastRefreshWidth = 0;
    var refreshWidth = 50;

    this.image = function (callback) {
        $('.responsiveLazyload').each(function () {
            if ($(this).parent().visible(true) || $(this).data("load") === "always") {
                if ($(this).first()) {
                    var figure = $(this).parent();
                    $(this).remove();
                    self.contructImage(figure);
                    lastRefreshWidth = window.innerWidth;
                    figure.addClass('lazyResizeReload');
                    if (typeof callback == 'function') {
                        callback();
                    }
                }
            }
        });
    }

    this.onResize = function (callback) {
        if (window.innerWidth > lastRefreshWidth + refreshWidth || window.innerWidth < lastRefreshWidth - refreshWidth) {
            $('.lazyResizeReload').each(function () {
                self.contructImage($(this));
                if (typeof callback == 'function') {
                    callback();
                }
            });
            lastRefreshWidth = window.innerWidth;
        }
    }

    this.contructImage = function (figure) {
        var $image = new Image();

        //data variables and images settings
        var width, heightRatio, focalPoint, mode, filter, quality;
        width = figure.width() != 0 ? figure.width() : $(figure).parent().width();
        heightRatio = figure.data('height-ratio');
        focalPoint = figure.data('focalpoint');
        mode = figure.data('mode');
        filter = figure.data('filter');
        quality = figure.data('quality') || 80;

        var newImageSrc = figure.data('src');
        newImageSrc += mode ? self.nextQuerySign(newImageSrc) + "width=" + width : "";
        newImageSrc += heightRatio ? self.nextQuerySign(newImageSrc) + "height=" + heightRatio * width : "";
        newImageSrc += focalPoint ? self.nextQuerySign(newImageSrc) + "center=" + focalPoint : "";
        newImageSrc += mode ? self.nextQuerySign(newImageSrc) + "mode=" + mode : "";
        newImageSrc += filter ? self.nextQuerySign(newImageSrc) + "filter=" + filter : "";
        newImageSrc += self.nextQuerySign(newImageSrc) + "quality=" + quality;

        $image.src = newImageSrc;
        figure.find('img').remove();
        figure.prepend($image);
        $image = figure.find('img');

        $image.attr('class', figure.data('class'));
        $image.attr('alt', figure.data('alt'));
        $image.attr('title', figure.data('title'));
        $image.attr('property', 'contentUrl');
    }

    this.nextQuerySign = function (url) {
        return url.indexOf("?") > -1 ? "&" : "?";
    };

    // public functions:
    return {
        image: image,
        onResize: onResize
    };
}();