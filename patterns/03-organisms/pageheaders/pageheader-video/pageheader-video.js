'use strict';

var novicell = novicell || {};

novicell.pageheaderVideo =
    novicell.pageheaderVideo ||
    new function () {
        this.init = function () {
            const vimeoIframeList = document.querySelectorAll(".vimeo__iframe") || false;
            const youtubeList = document.querySelectorAll(".video-wrapper[data-youtube-id]") || false;
            if (screenWidth()) {
                if (vimeoIframeList) {
                    for (let i = 0; i < vimeoIframeList.length; i++) {
                        // Simply change dataset src to the src attribute. 
                        let vimeoId = vimeoIframeList[i].dataset.vimeoid;
                        vimeoIframeList[i].src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&color=000000&title=0&byline=0&portrait=0&muted=1&controls=0&background=1`;
                    }
                }
                if (youtubeList) {
                    for (let i = 0; i < youtubeList.length; i++) {
                        // Grab the data-youtube-id from the elements in the list and add the value as "youtube-id"
                        // With youtube-id, the specific YT javascript will fire
                        youtubeList[i].setAttribute("youtube-id", youtubeList[i].dataset.youtubeId);
                    }
                }
            }
        };
    }();

function screenWidth() {
    return window.screen.width >= 768;
}
