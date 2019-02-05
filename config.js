const path = require('path');
const root_folder = __dirname;
// vars
const configPath = 'configurations/'
const fullConfigsPath = path.resolve(root_folder, configPath);
const dist = path.resolve(root_folder + '/dist/');
console.log(dist);

const mainSettings = {
  env: 'development',
  modulesDir: root_folder + '/src/Modules/**/*.js',
  assetsDir: root_folder + '/assets/',
  appGlobalFile: root_folder + '/src/_base/app.js',
  dist,
}

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

const novicell = {
  appName: 'Novicell Frontend', // name for webapp
  appColor: '#ffffff', // color for webapp icons
  appDescription: 'Novicell Progressive WebApp'
}

module.exports = {
  root_folder: root_folder,
  mainSettings,
  configPath: configPath,
  fullConfigsPath: fullConfigsPath,
  componentsDir: {
    main: root_folder + '/src/',
    atoms: '01-atoms',
    molecules: '02-molecules',
    organisms: '03-organisms',
    pages: '04-pages',
  },
  drupal,
  novicell
};
