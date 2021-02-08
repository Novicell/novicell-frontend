const path = require('path');
const root_folder = __dirname;
const _ = require('lodash');

// ------------------------------------------------------------
// Fill in values for these variables
const sourceRootFolder = '/src/';
const modulesDir = '/src/modules/**/*.js';
const assetsDir = '/assets/';
const env = process.env.env || 'development';
const watch = process.env.watch === 'true' ? true : false;

const constants = {
    default: {
        watch: watch,
        env: env
    },
    development: {
        dist: '../../docker/deploy/dist'
    },
    production: {
        dist: '../source/dist',
    },
};

const constantsOpts = _.merge({}, constants.default, constants[env]);
// ------------------------------------------------------------
// ------------------------------------------------------------

const mainSettings = {
    modulesDir: path.join(root_folder, modulesDir),
    assetsDir: path.join(root_folder, assetsDir),
    dist: path.join(root_folder, constantsOpts.dist),
    watch: constantsOpts.watch,
    env: constantsOpts.env
};

module.exports = {
    root_folder,
    mainSettings,
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