'use strict';

var novicell = novicell || {};

novicell.pageheaderVideoFullscreen =
    novicell.pageheaderVideoFullscreen ||
    new function () {
        this.init = function () {
            if (screenWidth()) {
                const fullscreenBackground = document.querySelector(".background-fullscreen");
                const vimeoIframeList = document.querySelectorAll(".vimeo__iframe") || false;
                const youtubeIframeList = document.querySelector(".youtube__iframe-wrapper") || false;
                if (vimeoIframeList) {
                    for (let i = 0; i < vimeoIframeList.length; i++) {
                        // Simply change dataset src to the src attribute. 
                        let vimeoId = vimeoIframeList[i].dataset.vimeoid;
                        vimeoIframeList[i].src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&color=000000&title=0&byline=0&portrait=0&muted=1&controls=0&background=1`;
                    }
                }
                if (youtubeIframeList) {
                    let player;
                    let videoStart = 0;
                    let youtubeid = youtubeIframeList.dataset.youtubeid;
                    let tag = document.createElement("script");
                    tag.src = "https://www.youtube.com/player_api";
                    let lastScriptTag = document.getElementsByTagName("script")[
                        document.getElementsByTagName("script").length - 1
                    ];
                    lastScriptTag.parentNode.insertBefore(tag, lastScriptTag);
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
                    };
                    this.onYouTubeFullscreenIframeAPIReady = function () {
                        player = new YT.Player(youtubeIframeList, {
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
                                onReady: novicell.pageheaderVideoFullscreen.onPlayerReady,
                                onError: novicell.pageheaderVideoFullscreen.onErrorResponse
                            }
                        });
                    };
                    window.addEventListener(
                        "load",
                        function () {
                            novicell.pageheaderVideoFullscreen.onYouTubeFullscreenIframeAPIReady();
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
