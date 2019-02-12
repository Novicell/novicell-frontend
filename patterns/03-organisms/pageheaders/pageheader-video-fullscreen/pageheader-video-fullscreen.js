'use strict';

var novicell = novicell || {};

novicell.pageheaderVideoFullscreen =
    novicell.pageheaderVideoFullscreen ||
    new function () {
        this.init = function () {
            if (screenWidth()) {
                const vimeoIframeList = document.querySelectorAll(".vimeo__iframe") || false;
                const youtubeIframeList = document.querySelectorAll(".youtube__iframe") || false;
                if (vimeoIframeList) {
                    for (let i = 0; i < vimeoIframeList.length; i++) {
                        // Simply change dataset src to the src attribute. 
                        let vimeoId = vimeoIframeList[i].dataset.vimeoid;
                        vimeoIframeList[i].src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&color=000000&title=0&byline=0&portrait=0&muted=1&controls=0&background=1`;
                    }
                }
                if (youtubeIframeList) {
                    for (let i = 0; i < youtubeIframeList.length; i++) {
                        // Grab the data-youtube-id from the elements in the list and add the value to the src
                        let youtubeid = youtubeIframeList[i].dataset.youtubeid;
                        youtubeIframeList[i].src = `https://www.youtube.com/embed/${youtubeid}?autoplay=1&controls=0&showinfo=0&rel=0&loop=1&mute=1&playlist=${youtubeid}&modestbranding=1&autohide=1`;
                    }
                }
            }
        };
    }();

function screenWidth() {
    return window.screen.width > 768;
}
