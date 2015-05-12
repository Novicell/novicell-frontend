# Novicell Default Frontend

##  Preparation

- Download and install Node.js (https://nodejs.org/download/)
- Download and install Git (http://git-scm.com/downloads)
  Remember to check "Git bash here" in context menu options

  To check if node is working, go to CMD / Powershell / Gitbash / Terminal and type `node -v`
  If you get a version number, you'r good to go.

##  Installation

First navigate to your website and install novicell fronend package:

    cd "c:\Visual studio projects\project-name\Project.Website"
    npm install github:Novicell/novicell-frontend

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
- fonts -	Copies the fonts defined in: gulp-config.json > bundles > {bundleName} > fonts
- watch

  - Runs the scripts, styles, images, icons and fonts task whenever a file has changed. The paths it listens on, is defined in the file gulp-config.json > watch.
  - Also it automatically refreshes your browser window, using livereload (port can be changed in gulp-config.json > livereload > port).
  The paths it listens on, is defined in: gulp-config.json > livereload > paths.

  Google Chrome Plugin: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

  - Generates sourcemaps, if debug is set to true in gulp-config.json.

NOTE: The distribution path for each task, can be defined in gulp-config.json - so can the basePath.

## How to use SVG sprite sheet

Use the following HTML. Remember to set correct path and id of chosen symbol, in svg href value.

    <svg class="icon-instagram">
    	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/dist/icons/icons.svg#instagram">
    </use></svg>


#### CSS/LESS:
Use classes in "/dist/icons/icons.less".

## What is GULP by the way?

GULP is a streaming build system - or short for:

"I'll take care of minifiyng the images, scripts, styles and icons
- now you just focus on doing what you do best: CODE!"

# License
The Novicell Default Frontend is licensed under the MIT Open Source license.
