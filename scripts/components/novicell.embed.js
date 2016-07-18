/**
  * @desc new load embedded media script, it lazyloads embedded media
  * html example
  * js init example: novicell.embed.loadEmbeds();
  * js scroll example:
  * if ($('.embed-media-item').length > 0) {
  *     novicell.embed.loadEmbeds();
  * }
  * @author Tommy Pedersen - TPE
  * @return generates preplay image
  * @requires jquery@1.11.3
  * @note: Just beautiful!
*/

var novicell = novicell || {};

novicell.embed = novicell.embed || function () {
    var self = this;
    var lastRefreshWidth = 0;
    var refreshWidth = 50;

    this.loadEmbeds = function (callback) {
        $(".nc-grid-embedmedia").each(function () {
            if ($(this).visible(true) || $(this).data("load") === "always") {
                if ($(this).has(".embed-preview-image")) {
                    $(this).find(".embed-preview-image").click(function () {
                        $(this).attr("style", "display: none!important");
                        self.lazyEmbed($(this).parent().find(".embed-media-item"));
                        if (typeof callback == 'function') {
                            callback();
                        }
                    });
                } else {
                    self.lazyEmbed($(this).find(".embed-media-item"));
                    if (typeof callback == 'function') {
                        callback();
                    }
                }
            }
        });
    }

    this.onResize = function (callback) {
        if (window.innerWidth > lastRefreshWidth + refreshWidth || window.innerWidth < lastRefreshWidth - refreshWidth) {
            $('.nc-grid-embedmedia').each(function () {
                self.lazyEmbed($(this).find(".embed-media-item"));
                if (typeof callback == 'function') {
                    callback();
                }
            });
            lastRefreshWidth = window.innerWidth;
        }
    }

    this.lazyEmbed = function (figure) {
        figure.attr("style", "display: block!important");
        figure.addClass('loaded');
        var $embed = figure.find(".embed");
        var ratio, src, width;
        width = figure.width() != 0 ? figure.width() : $(figure).parent().width();
        ratio = $embed.data("ratio");
        src = $embed.data("src");
        $embed.attr("src", src);
        $embed.attr("width", width);
        $embed.attr("height", width * ratio);
    }

    this.backofficeEmbeds = function (callback) {
        //console.log($(".nc-grid-embedmedia").length);
        $(".nc-grid-embedmedia").each(function () {
            $(this).find(".embed-preview-image").remove();
            self.lazyEmbed($(this).find(".embed-media-item"));
            $(this).find(".embed").attr("src", self.updateQueryStringParameter($(this).find(".embed").data("src"), "autoplay", "false"))
            if (typeof callback == 'function') {
                callback();
            }
        });
    }

    this.updateQueryStringParameter = function (uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }

    // public functions:
    return {
        loadEmbeds: loadEmbeds,
        backofficeEmbeds: backofficeEmbeds,
        onResize: onResize
    };
}();
