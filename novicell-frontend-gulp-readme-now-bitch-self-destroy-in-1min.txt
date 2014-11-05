GULP installation:
-----------------------------------------------------------------------------

cd c:\"Visual studio projects"\project-name\Project.Website
npm install


What is GULP?
----------------------------------------------------------------------------

GULP is a streaming build system - or short for:

"I'll take care of minifiyng the images, scripts, styles and icons 
- now you just focus on doing what you do best: CODE!"

In this package, the following tasks are available:

- build     Runs all the tasks defined in: gulp-config.json > tasksToBuild
- clean     Deletes the files/directories defined in: gulp-config.json > pathsToClean
- rebuild   Runs the clean task, and then the build task.
- styles*   Minifies and bundles CSS files defined in: gulp-config.json > bundles > {bundleName} > styles
- scripts*  Minifies and bundles JS files defined in: gulp-config.json > bundles > {bundleName} > scripts
- images    Minifies images defined in: gulp-config.json > bundles > {bundleName} > images
- icons     Minifies icons defined in: gulp-config.json > bundles > {bundleName} > icons
- fonts     Copies the fonts defined in: gulp-config.json > bundles > {bundleName} > fonts

- watch     
    Runs the scripts, styles, images, icons and fonts task whenever a file has changed. 
    The paths it listens on, is defined in: gulp-config.json > watch.

    Also it automatically refreshes your browser window, using livereload (port can be changed in gulp-config.json > livereload > port).
    The paths it listens on, is defined in: gulp-config.json > livereload > paths.

    Google Chrome Plugin: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

* Generates sourcemaps, if debug is set to true in gulp-config.json.

NOTE: The distribution path for each task, can be defined in gulp-config.json - so can the basePath.

How to use GULP:
-----------------------------------------------------------------------------

First navigate to your website:
cd c:\"Visual studio projects"\project-name\Project.Website

To build whats already in there:        gulp        => (runs the build task)
To never touch the cmd window again:    gulp watch  => (runs the watch task)
To Stop/Restart GULP:                   CTRl + c

All tasks can be run like: "gulp <task name>".