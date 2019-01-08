let imgTextElms = document.getElementsByClassName('image-text-section');
let textImgElms = document.getElementsByClassName('text-image-section');
let pageHeaderImgAlt = document.getElementsByClassName('pageheader-image-alt');
let pageHeaderImage = document.getElementsByClassName('pageheader-image')

for (let i = 0; i < pageHeaderImage.length; i++) {
    animateElement(pageHeaderImage[i], {
        'data-aos': 'zoom-out',
        'data-aos-delay': '500'
    });
}
for (let i = 0; i < imgTextElms.length; i++) {
    animateElement(imgTextElms[i], {
        'data-aos': 'flip-up'
    });
}
for (let i = 0; i < textImgElms.length; i++) {
    animateElement(textImgElms[i], {
        'data-aos': 'fade-right'
    });
}
for (let i = 0; i < pageHeaderImgAlt.length; i++) {
    animateElement(pageHeaderImgAlt[i], {
        'data-aos': 'flip-up'
    });
}
