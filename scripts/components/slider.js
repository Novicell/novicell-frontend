var novicell = novicell || {};

// Document ready
$(function () {
        novicell.slider.heroSlider($('.owl-carousel'));
        novicell.slider.megaTronSlider();
});
// Document ready


novicell.slider = new function(){

        this.heroSlider = function(selector) {
                console.log("this is heroslider speaking, here is your selector: ");
                console.log(selector);
        };

        this.megaTronSlider = function() {
                console.log("this is MEGATRON speaking, I'm working!");
        };

};