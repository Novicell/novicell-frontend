# Novicell Frontend

Novicell Default Frontend package is a framework for your frontend setup and a Gulp based boilerplate for optimizing your frontend flow. It includes a BEM'ified version of Bootstrap's bare necessities (LESS), for starting your new website's development.
When setup, it also helps you optimize images, combine SVGs to a sprite, compiling LESS to CSS and minifying Javascript.

### Table of content
* [Quick start](#quick-start)
* [Installation](#installation)
* [Setup](#setup)
* [What is GULP](#what-is-gulp)
* [How to use GULP](#how-to-use-gulp)
* [Tasks in this package](#tasks-in-this-package)
* [How to use SVG sprite sheet](#how-to-use-svg-sprite-sheet)
* [License](#license)

## Quick start

Browse to your project folder and clone the repo `git clone https://github.com/novicell/novicell-frontend.git`. Then run `npm install` and then run `gulp` for the build proccess to start.


##  Installation

- Download and install Node.js v. 4.x.x (https://nodejs.org/download/)
- Download and install Git (http://git-scm.com/downloads)
  Remember to check "Git bash here" in context menu options

  To check if node is working, go to Gitbash / Terminal and type `node -v`
  If you get a version number, you'r good to go.

##  Setup

First navigate to your website and install novicell fronend package:

    cd "c:\Visual studio projects\project-name\Project.Website"
    npm install github:Novicell/novicell-frontend
    npm install
    

## What is GULP

GULP is a streaming build system - or short for:

"I'll take care of minifiyng the images, scripts, styles and icons
- now you just focus on doing what you do best: CODE!"

## How to use GULP

First navigate to your website

    cd c:\"Visual studio projects"\project-name\Project.Website

- To build whats already in there (runs the build task): `gulp`
- To never touch the cmd window again (runs the watch task): `gulp watch`
- To Stop/Restart GULP: `CTRl + c`

All tasks can be run like: `gulp <task name>`.

## Tasks in this package

The following tasks are available:

- build -	Runs all the tasks defined in: gulp-config.json > tasksToBuild
- clean -	Deletes the files/directories defined in: gulp-config.json > pathsToClean
- rebuild -	Runs the clean task, and then the build task.
- styles -	Minifies and bundles CSS files defined in: gulp-config.json > bundles > {bundleName} > styles
- scripts -	Minifies and bundles JS files defined in: gulp-config.json > bundles > {bundleName} > scripts
- images -	Minifies images defined in: gulp-config.json > bundles > {bundleName} > images
- icons -	Minifies and generates a svg sprite, from the icons defined in: gulp-config.json > bundles > {bundleName} > icons
- copy -	Copies the fonts defined in: gulp-config.json > bundles > {bundleName} > fonts
- watch

  - Runs the scripts, styles, images, icons and fonts task whenever a file has changed. The paths it listens on, is defined in the file gulp/config.json > watch.
  - Also it automatically refreshes your browser window, using livereload (port can be changed in gulp/config.json > livereload > port).

  Google Chrome Plugin: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

  - Generates sourcemaps for CSS and JS.

NOTE: The distribution path for each task, can be defined in gulp/config.json - so can the basePath.

## How to use SVG sprite sheet

Use the following HTML. Remember to set correct path and id of chosen symbol, in svg href value.

    <svg class="icon-instagram">
    	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/dist/icons/icons.svg#instagram"></use>
    </svg>

## License
The Novicell Default Frontend is licensed under the MIT license. (http://opensource.org/licenses/MIT)
