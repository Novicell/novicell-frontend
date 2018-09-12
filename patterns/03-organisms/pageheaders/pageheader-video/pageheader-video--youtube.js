'use strict';

var novicell = novicell || {};

novicell.pageheaderVideoYoutube = novicell.pageheaderVideoYoutube || new function () {

    var videoStart = 0;
    var player;
    var youtubeId;

    this.init = function () {
        const youtubeVideoWrapper = document.querySelector('.tv');
        if(youtubeVideoWrapper != null) {
            youtubeId = document.querySelector('.video-wrapper').getAttribute('data-youtube-id');    
            var tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/player_api';
            
            var lastScriptTag = document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1];
            lastScriptTag.parentNode.insertBefore(tag, lastScriptTag);

        }
    };
    
    this.onPlayerReady = function(event) {
        novicell.pageheaderVideoYoutube.vidRescale();
        event.target.mute();
        event.target.seekTo(videoStart);
    };
    
    this.onPlayerStateChange = function(e) {
        var tv2 = document.getElementById('player');
        if (e.data === 1){
            tv2.classList.add('active');
        } else if (e.data === 0){
            player.seekTo(videoStart);
        }
    };
    
    this.vidRescale = function(){
        var tvScreen = document.querySelector('.tv .screen');
        if(tvScreen!=null){
            var w = window.innerWidth+200,
                h = window.innerHeight+200;
            if (w/h > 16/9) {
                player.setSize(w, w/16*9);
                tvScreen.style.left= '0px';
            } else {
                player.setSize(h/9*16, h);
                tvScreen.style.left= -(tvScreen.offsetWidth-w)/2;
            }
        }
    };
    
    this.onYouTubeIframeAPIReady = function(){

        player = new YT.Player('player', {
            videoId: youtubeId,
            playerVars: {
                'autoplay': 0,
                'autohide': 1,
                'loop': 1,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'controls': 0,
                'disablekb': 1,
                'enablejsapi': 0,
                'iv_load_policy': 3
            },
            events: {
                'onReady': novicell.pageheaderVideoYoutube.onPlayerReady,
                'onStateChange': novicell.pageheaderVideoYoutube.onPlayerStateChange
            }
        });
    };
}();

function onYouTubeIframeAPIReady() {
    novicell.pageheaderVideoYoutube.onYouTubeIframeAPIReady();
}


window.addEventListener('load', function(){
    novicell.pageheaderVideoYoutube.vidRescale();
}, true);


window.addEventListener('resize', function(){
    novicell.pageheaderVideoYoutube.vidRescale();
}, true);