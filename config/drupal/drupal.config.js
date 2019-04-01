const path = require('path');
const root_folder = require('../../config').root_folder;

const drupal = {
    postcss: {
        compile: true,
        paths: [
            path.resolve(root_folder, 'src/anydir/**/*.css'),
            path.resolve(root_folder, 'src/anydir2/**/*.css')
        ]
    },
    javascript: {
        compile: true,
        paths: [
            path.resolve(root_folder, 'src/anydir/**/*.js'),
            path.resolve(root_folder, 'src/anydir2/**/*.js')
        ]
    }
}

module.exports = { drupal }
