'use strict';
var novicell = novicell || {};
var Imagezoom = Imagezoom || {};

novicell.imageZoom =
    novicell.imageZoom ||
    new function () {
        this.init = () => {
            var image = document.querySelector('.image-zoom');

            if (image) {
                var zoom = new Imagezoom(image).overlay();
                image.addEventListener('click', function (e) {
                    // stop propagation if we want to retain our HTML api
                    // in other parts of the site.
                    e.stopPropagation();
                    zoom.show();
                });
            }
        };
    }();
