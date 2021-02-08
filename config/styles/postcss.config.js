const stylelint = require('stylelint');
const stylelintConfig = require('./stylelint.config');
const settings = require('../../config');
const rootFolder = settings.root_folder;
const env = process.env.NODE_ENV || 'development';
const path = require('path');

module.exports = {
    env,
    dir: path.join(settings.mainSettings.dist, '/css'),
    map: {
        inline: false
    },
    plugins: [
        require('postcss-import')({
            plugins: [
                stylelint({
                    config: stylelintConfig,
                    ignoreFiles: [
                        rootFolder + 'node_modules/**/*.css',
                        rootFolder + settings.mainSettings.dist
                    ]
                })
            ]
        }),
        require('postcss-preset-env')({
            stage: 2, // default stage is 2
            preserve: false,
            autoprefixer: {
                grid: true
            },
            features: {
                'color-mod-function': {unresolved: 'warn'},
                'custom-media-queries': {}
            },
            browsers: ['>= 5% in DK', 'ie 11']
        }),
        require('postcss-nested'),
        require('cssnano')({
            autoprefixer: false,
            discardComments: {
                removeAll: true
            },
            mergeLonghand: true,
            colormin: false,
            zindex: false,
            discardUnused: {
                fontFace: false
            }
        }),
        require('postcss-reporter')({
            clearMessages: true,
            throwError: false
        })
    ]
};
