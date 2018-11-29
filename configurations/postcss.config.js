const stylelint = require("stylelint");
const stylelintConfig = require("./.stylelintrc.json");
const settings = require("../config");
const rootFolder = settings.root_folder;

module.exports = {
  plugins: [
    require('postcss-import')({
      plugins: [
        stylelint({
          config: stylelintConfig,
          ignoreFiles: [rootFolder + 'node_modules/**/*.css', rootFolder + 'dist']
        }),
      ]
    }),
    require('postcss-preset-env')({
      stage: 2, // default stage is 2
      preserve: false,
      autoprefixer: {
        grid: true
      },
      features: {
        'color-mod-function': {},
        'custom-media-queries': {},
      },
      browsers: [">= 5% in DK", "ie 11"]
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
    require('postcss-reporter')
  ]
}