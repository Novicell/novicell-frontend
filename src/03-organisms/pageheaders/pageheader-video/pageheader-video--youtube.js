'use strict';

function PageheaderVideoYoutube() {
    this.videoStart = 0;
    this.player;
    this.youtubeId;

    const youtubeVideoWrapper = document.querySelector('.tv');
    if (youtubeVideoWrapper != null) {
        this.youtubeId = document.querySelector('.video-wrapper').getAttribute('data-youtube-id');
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/player_api';

        const lastScriptTag = document.getElementsByTagName('script')[
            document.getElementsByTagName('script').length - 1 ];
        lastScriptTag.parentNode.insertBefore(tag, lastScriptTag);
    }

    this.onPlayerReady = event => {
        this.vidRescale();
        event.target.mute();
        event.target.seekTo(this.videoStart);
    };

    this.onPlayerStateChange = el => {
        const tv2 = document.getElementById('player');
        if (el.data === 1) {
            tv2.classList.add('active');
        } else if (el.data === 0) {
            this.player.seekTo(this.videoStart);
        }
    };

    this.vidRescale = function() {
        const tvScreen = document.querySelector('.tv .screen');
        if (tvScreen != null) {
            const width = window.innerWidth + 200;
            const height = window.innerHeight + 200;
            if (width / height > 16 / 9) {
                this.player.setSize(width, (width / 16) * 9);
                tvScreen.style.left = '0px';
            } else {
                this.player.setSize((height / 9) * 16, height);
                tvScreen.style.left = -(tvScreen.offsetWidth - width) / 2;
            }
        }
    };

    this.onYouTubeIframeAPIReady = function() {
        /*eslint-disable */
        this.player = new YT.Player('player', {
            videoId: this.youtubeId,
            playerVars: {
                autoplay: 0,
                autohide: 1,
                loop: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                controls: 0,
                disablekb: 1,
                enablejsapi: 0,
                iv_load_policy: 3
            },
            events: {
                onReady: this.onPlayerReady,
                onStateChange: this.onPlayerStateChange
            }
        });
    };
}

const PhV = new PageheaderVideoYoutube();

function onYouTubeIframeAPIReady() {
    PhV.onYouTubeIframeAPIReady();
}

window.addEventListener(
    'load',
    () => {
        if (document.querySelector('#player')) {
            onYouTubeIframeAPIReady();
            PhV.vidRescale();
        }
    },
    true
);

window.addEventListener(
    'resize',
    () => {
        PhV.vidRescale();
    },
    true
);
