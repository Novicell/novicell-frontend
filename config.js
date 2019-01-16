const path = require('path');
const root_folder = __dirname;
let configPath = 'configurations/';

module.exports = {
  drupal: {
    postcss: path.resolve(root_folder, 'configurations/drupal/**/*.css'),
  },
  root_folder: root_folder,
  configPath: configPath,
  fullConfigsPath: path.resolve(root_folder, configPath),
  env: 'development',
  appName: 'Novicell Frontend', // name for webapp
  appColor: '#ffffff', // color for webapp icons
  appDescription: 'Novicell Progressive WebApp',
  modulesDir: root_folder + '/src/_base/modules/**/*.js',
  componentsDir: {
    main: root_folder + '/src/',
    atoms: '01-atoms',
    molecules: '02-molecules',
    organisms: '03-organisms',
    pages: '04-pages',
  },
  appGlobalFile: root_folder + '/src/_base/app.js',
  output: {
    images: path.resolve(root_folder, 'dist/images/'),
    scripts: path.resolve(root_folder, 'dist/scripts/'),
    css: path.resolve(root_folder, 'dist/css/')
  }
};