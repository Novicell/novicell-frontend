"use strict";
var novicell = novicell || {};
novicell.parallaxWrapper =
    novicell.parallaxWrapper ||
    new function () {
        this.init = function () {
            let scenes = []
            let parallaxWrappers = document.getElementsByClassName("parallax-wrapper");
            if (!parallaxWrappers) {
                return;
            }
            for (let i = 0; i < parallaxWrappers.length; i++) {
                scenes[i] = new Parallax(parallaxWrappers[i])
            }
        };
    }();
