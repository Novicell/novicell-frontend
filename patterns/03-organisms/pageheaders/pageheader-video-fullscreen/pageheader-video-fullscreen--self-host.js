'use strict';

var novicell = novicell || {};

novicell.pageheaderVideoFullscreenSelfHost =
    novicell.pageheaderVideoFullscreenSelfHost ||
    new function () {
        this.init = function () {
            if (screenWidth()) {
                const fullscreenBackground = document.querySelector(".background-fullscreen") || false;
                if (fullscreenBackground) {
                    // Remove class associated with background image
                    fullscreenBackground.classList.remove("background-fullscreen--idle");
                    // Add class associated with ajax gif loader
                    fullscreenBackground.classList.add("background-fullscreen--loading");
                }
                const videoList = document.querySelectorAll(".background-fullscreen__video") || false;
                this.removeAjaxLoader = function (element) {
                    // Function for removing the class associated with the ajax loading gif.
                    element.classList.remove("background-fullscreen--loading");
                };
                if (videoList) {
                    // Make the data-videopath the actual src of the video element
                    for (let i = 0; i < videoList.length; i++) {
                        videoList[i].src = videoList[i].dataset.videopath;
                        // Remove ajax loader when play event triggers
                        videoList[i].addEventListener("play", () => {
                            novicell.pageheaderVideoFullscreenSelfHost.removeAjaxLoader(fullscreenBackground);
                        })
                    }
                }
            }
        };
    }();

function screenWidth() {
    return window.screen.width > 768;
}
