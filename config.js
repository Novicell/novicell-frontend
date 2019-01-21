const path = require('path');
const root_folder = __dirname;
let configPath = 'configurations/';

const drupal = {
  postcss: {
    compile: true,
    path: path.resolve(root_folder, 'src/testdir/**/*.css')
  },
  javascript: {
    compile: true,
    path: path.resolve(root_folder, 'src/testdir/**/*.js')
  }
}

module.exports = {
  root_folder: root_folder,
  configPath: configPath,
  fullConfigsPath: path.resolve(root_folder, configPath),
  env: 'development',
  appName: 'Novicell Frontend', // name for webapp
  appColor: '#ffffff', // color for webapp icons
  appDescription: 'Novicell Progressive WebApp',
  modulesDir: root_folder + '/src/_base/modules/**/*.js',
  appGlobalFile: root_folder + '/src/_base/app.js',
  componentsDir: {
    main: root_folder + '/src/',
    atoms: '01-atoms',
    molecules: '02-molecules',
    organisms: '03-organisms',
    pages: '04-pages',
  },
  output: {
    images: path.resolve(root_folder, 'dist/images/'),
    scripts: path.resolve(root_folder, 'dist/scripts/'),
    css: path.resolve(root_folder, 'dist/css/')
  },
  drupal
};
