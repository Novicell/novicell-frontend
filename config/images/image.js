const imagemin = require('imagemin');
const path = require('path');
const settings = require('../../config');
const imagesDistFolderName = '/images';

(async () => {
    const files = await imagemin([`${settings.mainSettings.assetsDir}**/*.{jpg,png,svg,gif}`], path.join(settings.mainSettings.dist, imagesDistFolderName), {
        "optimizationLevel": 5,
        "progressive": true,
        "interlaced": true,
    });
    files.forEach(element => {
        console.log('\x1b[32m', `minified:  ${element.path}`);
    });
})();