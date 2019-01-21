const imagemin = require('imagemin');
const settings = require('../config');

(async () => {
    const files = await imagemin([`${settings.mainSettings.assetsDir}**/*.{jpg,png,svg,gif}`], settings.mainSettings.output.images, {
        "optimizationLevel": 5,
        "progressive": true,
        "interlaced": true,
    });
    files.forEach(element => {
        console.log('\x1b[32m', `minified:  ${element.path}`);
    });
})();