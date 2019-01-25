"use strict";

var novicell = novicell || {};

novicell.pageheaderVideoYoutube =
    novicell.pageheaderVideoYoutube ||
    new function () {
        var videoStart = 0;
        var player;
        var youtubeId;

        this.init = function () {
            const youtubeVideoWrapper = document.querySelector(".tv");
            if (youtubeVideoWrapper != null) {
                youtubeId = document
                    .querySelector(".video-wrapper")
                    .getAttribute("youtube-id");
                var tag = document.createElement("script");
                tag.src = "https://www.youtube.com/player_api";

                var lastScriptTag = document.getElementsByTagName("script")[
                    document.getElementsByTagName("script").length - 1
                ];
                lastScriptTag.parentNode.insertBefore(tag, lastScriptTag);
            }
        };

        this.onPlayerReady = function (event) {
            novicell.pageheaderVideoYoutube.vidRescale();
            event.target.mute();
            event.target.seekTo(videoStart);
        };

        this.onPlayerStateChange = function (e) {
            var tv2 = document.getElementById("player");
            if (e.data === 1) {
                tv2.classList.add("active");
            } else if (e.data === 0) {
                player.seekTo(videoStart);
            }
        };

        this.vidRescale = function () {
            var tvScreen = document.querySelector(".tv .screen");
            if (tvScreen != null) {
                var w = window.innerWidth,
                    h = window.innerHeight;
                if (w / h > 16 / 9) {
                    // setSize is part of youtube's Player API, it's parameters are (width, height)
                    // Values used to calculate these translate to the formula of:
                    // new height === (new width/original width) * original height
                    // And new width === (new height / original height) * original width
                    player.setSize(w, (w / 16) * 9);
                } else {
                    player.setSize(w, (w / 16) * 9);
                    if (w < 1024) {
                        // If we don't resize according to height, the video will have large letterboxing on Ipad Pro width (1024px)
                        // Unfortunately, this will zoom the video, but it's a compromise
                        player.setSize((h / 9) * 16, h);
                        // Since the video is zoomed, we should offset to at least center the video - 
                        // - so viewsers see |_x_| the center of the video instead of |x__| the left only 
                        tvScreen.style.left = `${-(tvScreen.offsetWidth - w) / 2}px`;
                    } else {
                        tvScreen.style.left = 0;
                    }

                }
            }
        };

        this.onYouTubeIframeAPIReady = function () {
            player = new YT.Player("player", {
                videoId: youtubeId,
                playerVars: {
                    autoplay: 0,
                    autohide: 1,
                    loop: 1,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0, //This is deprecated apparently
                    controls: 0,
                    disablekb: 1,
                    enablejsapi: 0,
                    iv_load_policy: 3
                },
                events: {
                    onReady: novicell.pageheaderVideoYoutube.onPlayerReady,
                    onStateChange: novicell.pageheaderVideoYoutube.onPlayerStateChange
                }
            });
        };
    }();

function onYouTubeIframeAPIReady() {
    novicell.pageheaderVideoYoutube.onYouTubeIframeAPIReady();
}

window.addEventListener(
    "load",
    function () {
        novicell.pageheaderVideoYoutube.vidRescale();
    },
    true
);

window.addEventListener(
    "resize",
    function () {
        novicell.pageheaderVideoYoutube.vidRescale();
    },
    true
);
