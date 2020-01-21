const path = require('path');
const root_folder = __dirname;

// ------------------------------------------------------------
// Fill in values for these variables
const dist = '/dist/';
const sourceRootFolder = '/src/';
const modulesDir = '/src/modules/**/*.js';
const assetsDir = '/assets/';
// ------------------------------------------------------------
// ------------------------------------------------------------

const mainSettings = {
    modulesDir: path.join(root_folder, modulesDir),
    assetsDir: path.join(root_folder, assetsDir),
    dist: path.join(root_folder, dist),
};

module.exports = {
    root_folder,
    mainSettings,
    relativeDist: dist,
    sourceRootFolder: path.join(root_folder, sourceRootFolder),
    fullConfigsPath: path.join(root_folder, '/config/'),
    componentsDir: {
        main: root_folder + '/src',
        atoms: '01-atoms',
        molecules: '02-molecules',
        organisms: '03-organisms',
        pages: '04-pages',
    },
};
