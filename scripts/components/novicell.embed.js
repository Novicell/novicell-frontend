"use strict";

/**
* @desc new load embedded media script, it lazyloads embedded media
* html example
* js init example: novicell.embed.loadEmbeds();
* js scroll example:
* if ($(".embed-media-item').length > 0) {
*     novicell.embed.loadEmbeds();
* }
* @author Tommy Pedersen - TPE
* @return generates preplay image
* @requires jquery@1.11.3
* @note: Just beautiful!
*/

var novicell = novicell || {};

novicell.embed = novicell.embed || function ($) {
    var lastRefreshWidth = 0;
    var refreshWidth = 50;

    function onLoad() {
        $(".nc-grid-embedmedia").each(function () {
            if ($(this).visible(true) || $(this).data("load") === "always") {
                loadEmbed($(this));
            }
        });
    }


    function onResize() {
        if (window.innerWidth > lastRefreshWidth + refreshWidth || window.innerWidth < lastRefreshWidth - refreshWidth) {
            $(".nc-grid-embedmedia").each(function () {
                loadEmbed($(this));
            });
            lastRefreshWidth = window.innerWidth;
        }
    }

    function onScroll() {
        $(".nc-grid-embedmedia").each(function () {
            if ($(this).visible(true) && !$(this).children(".embed-media-item").hasClass("loaded")) {
                loadEmbed($(this));
            }
        });
    }

    //Check if there's a preview image and loads the embed
    function loadEmbed($element, callback) {
        var $embedItem = $element.children(".embed-media-item");
        if ($element.children(".embed-preview-image").length) {
            var $image = $element.children(".embed-preview-image , .js-embed-play");
            $embedItem.hide();
            $image.click(function () {
                $image.remove();
                lazyEmbed($embedItem, true);
                if (typeof callback == "function") {
                    callback();
                }
            });
        } else {
            lazyEmbed($embedItem, false);
            if (typeof callback == "function") {
                callback();
            }
        }

    }

    function lazyEmbed($embedItem, isImage) {
        $embedItem.show();
        $embedItem.addClass("loaded");
        var $iframe = $embedItem.find(".embed");
        var ratio, src, width;
        width = $embedItem.width() !== 0 ? $embedItem.width() : $($embedItem).parent().width();
        ratio = $iframe.data("ratio");
        src = $iframe.data("src");
        $iframe.attr("src", src);
        $iframe.attr("width", width);
        $iframe.attr("height", width * ratio);
        if (isImage) {
            $iframe.attr("src", updateQueryStringParameter($iframe.data("src"), "autoplay", "true"));
        }
    }

    function backofficeEmbeds(callback) {
        $(".nc-grid-embedmedia").each(function () {
            $(this).find(".embed-preview-image").remove();
            lazyEmbed($(this).find(".embed-media-item"));
            $(this).find(".embed").attr("src", updateQueryStringParameter($(this).find(".embed").data("src"), "autoplay", "false"));
            if (typeof callback == "function") {
                callback();
            }
        });
    }

    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf("?") !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, "$1" + key + "=" + value + "$2");
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }

    // public functions:
    return {
        onLoad: onLoad,
        backofficeEmbeds: backofficeEmbeds,
        onResize: onResize,
        onScroll: onScroll
    };
}(jQuery);
