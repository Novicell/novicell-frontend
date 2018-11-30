const imagemin = require('imagemin');

(async () => {
    const files = await imagemin(['assets/**/*.{jpg,png,svg,gif}'], 'dist/images', {
        "optimizationLevel": 5,
        "progressive": true,
        "interlaced": true,
    });
    files.forEach(element => {
        console.log('\x1b[32m', `minified:  ${element.path}`);
    });
})();