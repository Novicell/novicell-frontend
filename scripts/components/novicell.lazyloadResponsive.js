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
  * 
  For pretty loading of the image you can use this snippet of less
    .nc-grid-focalpointimagelink figure {
        background-position: center center;
        background-size: cover;

        img {
            opacity: 0;
            transition: opacity 0.2s ease-in;
        }
    }

    Usecase:

    <div id="parent" style="height: 400px;">
            <figure vocab="http://schema.org/" typeof="ImageObject"
                    data-src="@Image.Url"
                    data-parent="#parent"
                    data-focalpoint="@Image.GetFocalPoints()"
                    data-mode="crop"
                    data-quality="75"
                    data-original-width="@Image.GetWidth()"
                    data-alt="@Image.AlternativeText"
                    data-title="@Image.Title">
                >
                <noscript class="responsiveLazyload">
                    <img src="@Image.Url"
                         alt="@Image.AlternativeText"
                         title="@Image.Title"
                         property="contentUrl" />
                </noscript>
            </figure>
     </div>
    
*/

var novicell = novicell || {};

novicell.responsiveLazyloadImage = novicell.responsiveLazyloadImage || function () {
    var self = this;
    var lastRefreshWidth = 0;
    var refreshWidth = 50;

    this.onScroll = function(){
        $('.responsiveLazyload').each(function () {
            self.loadImage($(this));
        });
    }

    this.onLoad = function () {
        $('.responsiveLazyload').each(function () {
            var $figure = $(this).parent();

            if ($figure.visible(true) || $(this).data("load") === "always") {
                self.loadImage($(this), true);
            } else {
                self.constructPlaceholder($figure);
            }
        });
    }

    this.onResize = function (callback) {
        if (window.innerWidth > lastRefreshWidth + refreshWidth || window.innerWidth < lastRefreshWidth - refreshWidth) {
            $('.lazyResizeReload').each(function () {
                self.constructImage($(this));
                self.constructPlaceholder($(this));
                if (typeof callback == 'function') {
                    callback();
                }
            });
            lastRefreshWidth = window.innerWidth;
        }
    }

    // Loads the image.
    this.loadImage = function ($element, isVisible) {
        var $this = $element;
        var $figure = $this.parent();

        if (isVisible || $figure.visible(true) || $this.data("load") === "always") {
            if ($this.first()) {
                $this.remove();
                self.constructImage($figure);
                lastRefreshWidth = window.innerWidth;
                $figure.addClass('lazyResizeReload');
                if (typeof callback == 'function') {
                    callback();
                }
            }
        }
    }

    this.constructImage = function (figure) {
        var $image = new Image();

        //data variables and images settings
        var width, maxWidth, heightRatio, focalPoint, mode, filter, quality, height, isBackgroundImage = false;

        $parent = figure.data('parent') ? $(figure).closest(figure.data('parent')) : null;
        isBackgroundImage = figure.data('is-background') ? true : false;
        width = figure.width() != 0 ? figure.width() : $(figure).parent().width();
        heightRatio = figure.data('height-ratio') != 0 ? figure.data('height-ratio') : null;
        height = $parent ? $parent.height() : null;
        focalPoint = figure.data('focalpoint');
        mode = figure.data('mode');
        filter = figure.data('filter');
        quality = figure.data('quality') || 80;

        var newImageSrc = figure.data('src');
        newImageSrc += mode ? self.nextQuerySign(newImageSrc) + "width=" + width : "";
        newImageSrc += focalPoint ? self.nextQuerySign(newImageSrc) + "center=" + focalPoint : "";
        newImageSrc += mode ? self.nextQuerySign(newImageSrc) + "mode=" + mode : "";
        newImageSrc += filter ? self.nextQuerySign(newImageSrc) + "filter=" + filter : "";
        newImageSrc += self.nextQuerySign(newImageSrc) + "quality=" + quality;

        figure.find('img').remove();

        // Append the image as a background or as a <img>
        console.log(isBackgroundImage);
        if(isBackgroundImage && $parent) {
            bgSrc = newImageSrc;
            bgSrc += height ? self.nextQuerySign(bgSrc) + "height=" + height : "";
            $parent.css('background-image', 'url("'+bgSrc+'")');

        } else {
            // Add attributes only needed when pretending an image
            maxWidth = figure.data('original-width');
            width = width > maxWidth ? maxWidth : width;
            newImageSrc += height && !heightRatio ? self.nextQuerySign(newImageSrc) + "height=" + height : "";
            newImageSrc += heightRatio != null ? self.nextQuerySign(newImageSrc) + "height=" + heightRatio * width : "";

            $image.src = newImageSrc;
            figure.prepend($image);
            $image = figure.find('img');
            $image.css('opacity', '0');
            // Fade the image
            $image.on('load', function(event) {
                $image.css('opacity', '1');
            });

            $image.attr('class', figure.data('class'));
            $image.attr('alt', figure.data('alt'));
            $image.attr('title', figure.data('title'));
            $image.attr('property', 'contentUrl');
        }
    }

    this.nextQuerySign = function (url) {
        return url.indexOf("?") > -1 ? "&" : "?";
    };

    this.constructPlaceholder = function(figure) {
        var $el = figure;
        var width, heightRatio, maxWidth;
        var height = 0;

        // Calc the height
        maxWidth = figure.data('original-width');
        width = figure.width() != 0 ? figure.width() : $(figure).parent().width();
        width = width > maxWidth ? maxWidth : width;
        heightRatio = $el.data('height-ratio');

        if(width && heightRatio) {
            height = heightRatio * width;
        }

        // Set the height
        if(height > 0) {
            $el.css('minHeight', height);
        }

    }

    // public functions:
    return {
        onScroll: onScroll,
        onResize: onResize,
        onLoad: onLoad
    };
}();