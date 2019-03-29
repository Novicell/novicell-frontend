'use strict';

var novicell = novicell || {};

novicell.pageheaderVideoFullscreenVimeo =
    novicell.pageheaderVideoFullscreenVimeo ||
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
                const vimeoIframeList = document.querySelector(".vimeo__iframe") || false;
                this.removeAjaxLoader = function (element) {
                    // Function for removing the class associated with the ajax loading gif.
                    element.classList.remove("background-fullscreen--loading");
                };
                if (vimeoIframeList) {
                    const vimeoId = vimeoIframeList.dataset.vimeoid;
                    const fullUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&color=000000&title=0&byline=0&portrait=0&muted=1&controls=0&background=1`;
                    const shortUrl = `https://vimeo.com/${vimeoId}`;
                    validateVimeoId(shortUrl)
                        .then(response => {
                            if (response === 200) {
                                // Load video if the vimeo id exists
                                vimeoIframeList.src = fullUrl;
                            } else {
                                // If bad status, we remove the iframe and add the fallback BG image
                                fullscreenBackground.style.backgroundImage = `url(${fullscreenBackground.dataset.backgroundImage})`;
                                vimeoIframeList.remove();
                            }
                        }).then(() => {
                            // As we are not using the vimeo API, we can't listen for events on the Iframe.
                            // Consequently, I've had to make a guesstimate on when's a relatively good time to remove the ajax loader
                            setTimeout(() => {
                                novicell.pageheaderVideoFullscreenVimeo.removeAjaxLoader(fullscreenBackground);
                            }, 5000);
                        }).catch(err => console.log(err));
                }
            }
        };
    }();

function screenWidth() {
    return window.screen.width > 768;
}
// Function for checking vimeo video validity
function validateVimeoId(url) {
    let options = {
        method: 'GET'
    };
    // Anything but status 200 will throw an error
    return fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`, options)
        .then((response) => {
            if (response.status === 200) {
                return response.status;
            } else {
                throw Error(`Bad response: ${response.status}`);
            }
        })
        .catch(err => console.log(err));
}
