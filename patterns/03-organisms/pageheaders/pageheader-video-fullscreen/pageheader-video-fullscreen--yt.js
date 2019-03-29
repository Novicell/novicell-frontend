'use strict';

var novicell = novicell || {};

novicell.pageheaderVideoFullscreenYT =
    novicell.pageheaderVideoFullscreenYT ||
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
                const youtubeIframeList = document.querySelector(".youtube__iframe-wrapper") || false;
                this.removeAjaxLoader = function (element) {
                    // Function for removing the class associated with the ajax loading gif.
                    element.classList.remove("background-fullscreen--loading");
                };
                if (youtubeIframeList) {
                    let videoStart = 0;
                    let youtubeid = youtubeIframeList.dataset.youtubeid;
                    let tag = document.createElement("script");
                    tag.src = "https://www.youtube.com/player_api";
                    let lastScriptTag = document.getElementsByTagName("script")[
                        document.getElementsByTagName("script").length - 1
                    ];
                    lastScriptTag.parentNode.insertBefore(tag, lastScriptTag);
                    this.changeCaseState = function (e) {
                        // Already written as switch case as there are more possibilities that might be implemented in the future.
                        // In this case, we remove the background gif when the video starts playing.
                        // See list of available cases on official YT embed docs on Playback_status
                        switch (e.data) {
                            // Case 1 is "video is playing"
                            case 1:
                                {
                                    novicell.pageheaderVideoFullscreenYT.removeAjaxLoader(fullscreenBackground);
                                    break;
                                }
                        }
                    };
                    this.onPlayerReady = function (event) {
                        event.target.mute();
                        event.target.seekTo(videoStart);
                    };
                    this.onErrorResponse = function (event) {
                        // In case of bad response, kill the player and add the background image.
                        // Currently, the url for the BG image is stored on the background-fullscreen wrapper itself.
                        // An alternative would be having a css class added that holds a background image attribute and the path value already, and simply append the classname to the element
                        fullscreenBackground.style.backgroundImage = `url(${fullscreenBackground.dataset.backgroundImage})`;
                        event.target.destroy();
                        novicell.pageheaderVideoFullscreenYT.removeAjaxLoader(fullscreenBackground);
                    };
                    this.onYouTubeFullscreenIframeAPIReady = function () {
                        let player = new YT.Player(youtubeIframeList, {
                            videoId: youtubeid,
                            playerVars: {
                                autoplay: 1,
                                autohide: 1,
                                loop: 1,
                                // Playlist is required, otherwise the video refuses to loop for some reason
                                playlist: youtubeid,
                                modestbranding: 1,
                                rel: 0,
                                controls: 0,
                                disablekb: 1,
                                enablejsapi: 0,
                                iv_load_policy: 3
                            },
                            events: {
                                onReady: novicell.pageheaderVideoFullscreenYT.onPlayerReady,
                                onError: novicell.pageheaderVideoFullscreenYT.onErrorResponse,
                                onStateChange: novicell.pageheaderVideoFullscreenYT.changeCaseState
                            }
                        });
                    };
                    window.addEventListener(
                        "load",
                        function () {
                            novicell.pageheaderVideoFullscreenYT.onYouTubeFullscreenIframeAPIReady();
                        },
                        true
                    );
                }
            }
        };
    }();

function screenWidth() {
    return window.screen.width > 768;
}
