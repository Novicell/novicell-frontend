#! /usr/bin/env node

const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const path = require('path');
const options = require('../../config');

const log = console.log;

const componentsDir = options.componentsDir.main;

// Templates
function getComponentTemplate(name) {
  return `<div class="${name}"></div>`;
}

function getComponentJSON(name) {
  return `{
  "title": "${name}",
  "status": "prototype",
  "context": {
  }
}`;
}

function getComponentCss(name) {
  return `.${name} {
}`;
}

// Helpers
function createDir(dir) {

  // Check if the folder exits, if not - create one
  if (!fs.existsSync(dir)) {
    checkAndCreateDestinationPath(dir);
    log(chalk.green(`Created folder in ${dir}`));
  }
}

function checkAndCreateDestinationPath(fileDestination) {
  const dirPath = fileDestination.split('/');
  dirPath.forEach((element, index) => {
    const joined = dirPath.slice(0, index + 1).join('/');
    const joinedNormalized = path.normalize(joined);
    if (!fs.existsSync(joinedNormalized)) {
      fs.mkdirSync(joinedNormalized);
    }
  });
}

const writeFile = function (filetype, dir, data, name) {

  const file = `${dir}/${name}.${filetype}`;

  fs.writeFile(file, data, {
    flag: 'wx'
  }, (err) => {
    if (err) {
      log(chalk.red(`File: ${file} already exits`));
      return;
    }
    log(chalk.green(`${file} was created`));
  });
}

function createComponent(name, type) {

  // Capitalize name for title
  let title = name.replace(/-/g, ' ');
  title = title.charAt(0).toUpperCase() + title.slice(1);

  // Generate directory path, and create it
  const dir = `${componentsDir}/${options.componentsDir[type]}/${name}`;
  createDir(dir);

  // Create the files
  writeFile('hbs', dir, getComponentTemplate(name), name);
  writeFile('config.json', dir, getComponentJSON(title), name);
  writeFile('css', dir, getComponentCss(name), name);
}

const types = {
  a: "atoms",
  m: "molecules",
  o: "organisms",
  p: "pages"
}

const type = types[args.t];
const name = args.n;

if (!type) {
  log(chalk.red('Invalid type argument - the valid types are: ' + Object.keys(types).toString().replace(/,/g, ', ')));
  return;
}

if (!name) {
  log(chalk.red('No name argument found - name is mandatory, look in readme for more information'));
}

createComponent(name, type);