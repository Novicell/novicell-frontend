'use strict';

const PageheaderVideoYoutube = function() {
    this.videoStart = 0;
    this.player;
    this.youtubeId;

    const youtubeVideoWrapper = document.querySelector('.tv');
    if (youtubeVideoWrapper != null) {
        this.youtubeId = document.querySelector('.video-wrapper').getAttribute('data-youtube-id');
        let tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/player_api';

        let lastScriptTag = document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1];
        lastScriptTag.parentNode.insertBefore(tag, lastScriptTag);
    }

    this.onPlayerReady = event => {
        this.vidRescale();
        event.target.mute();
        event.target.seekTo(this.videoStart);
    };

    this.onPlayerStateChange = e => {
        let tv2 = document.getElementById('player');
        if (e.data === 1) {
            tv2.classList.add('active');
        } else if (e.data === 0) {
            this.player.seekTo(this.videoStart);
        }
    };

    this.vidRescale = function() {
        let tvScreen = document.querySelector('.tv .screen');
        if (tvScreen != null) {
            let w = window.innerWidth + 200;
            let h = window.innerHeight + 200;
            if (w / h > 16 / 9) {
                this.player.setSize(w, (w / 16) * 9);
                tvScreen.style.left = '0px';
            } else {
                this.player.setSize((h / 9) * 16, h);
                tvScreen.style.left = -(tvScreen.offsetWidth - w) / 2;
            }
        }
    };

    this.onYouTubeIframeAPIReady = function() {
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
};

const PhV = new PageheaderVideoYoutube();

function onYouTubeIframeAPIReady() {
    PhV.onYouTubeIframeAPIReady();
}

window.addEventListener(
    'load',
    function() {
        if (document.querySelector('#player')) {
            onYouTubeIframeAPIReady();
            PhV.vidRescale();
        }
    },
    true
);

window.addEventListener(
    'resize',
    function() {
        PhV.vidRescale();
    },
    true
);
