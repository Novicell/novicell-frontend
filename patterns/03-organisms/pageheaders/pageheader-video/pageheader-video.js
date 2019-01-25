'use strict';

var novicell = novicell || {};

novicell.pageheaderVideo =
    novicell.pageheaderVideo ||
    new function () {
        this.init = function () {
            const vimeoIframeList = document.querySelectorAll("iframe[data-src]");
            const youtubeList = document.querySelectorAll(".video-wrapper[data-youtube-id]") || false;
            if (screenWidth()) {
                if (vimeoIframeList.length > 0) {
                    for (let i = 0; i < vimeoIframeList.length; i++) {
                        // Simply change dataset src to the src attribute. 
                        vimeoIframeList[i].src = vimeoIframeList[i].dataset.src;
                    }
                } else if (youtubeList) {
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
