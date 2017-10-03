# Novicell Frontend

[![Greenkeeper badge](https://badges.greenkeeper.io/Novicell/novicell-frontend.svg)](https://greenkeeper.io/)

Novicell Default Frontend package is a framework for your frontend setup, and a Gulp based boilerplate for optimizing your frontend flow. It includes PostCSS, CSSNext and Flexboxgrid, for starting your new website's development.
When setup, it also helps you optimize images, combine SVGs to a sprite, minifying CSS and Javascript.

### Table of content
* [Quick start](#quick-start)
* [Installation](#installation)
* [Setup](#setup)
* [Contribution](#contribution)
* [What is GULP](#what-is-gulp)
* [How to use GULP](#how-to-use-gulp)
* [Tasks in this package](#tasks-in-this-package)
* [How to use SVG sprite sheet](#how-to-use-svg-sprite-sheet)
* [Post-CSS components](#less-components)
  * [The grid](#the-grid)
  * [Buttons](#buttons)
  * [Forms](#forms)
  * [Tables](#tables)
* [Third party plugins](#third-party-plugins)
* [License](#license)

## Quick start

Browse to your project folder and clone the repo `git clone https://github.com/novicell/novicell-frontend.git/.`. Then run `npm install` for getting the latest dependencies and start the build proccess. Run `gulp watch` to start watching file changes and continuous copilation.


##  Installation

- Download and install Node.js min. v. 6.9.x (https://nodejs.org/en/download/)
- Download and install Git (newest) (http://git-scm.com/downloads)
  Remember to check "Git bash here" in context menu options

  To check if node is working, go to Gitbash / Terminal and type `node -v`
  If you get a version number, you'r good to go :+1:
  
  If you NEVER before did run any Gulp based setup, you need to install Gulp globally on your machine.
```
npm install -g gulp
```

##  Setup

First navigate to your website and install novicell frontend package. After running `npm install` it automatically rund:

    cd "c:\Visual studio projects\project-name\Project.Frontend"
    git clone https://github.com/Novicell/novicell-frontend.git
    npm install

## Contribution

Looking to contribute something? **Here's how you can help.**
Please take a moment to review our [contribution guidelines](https://github.com/Novicell/novicell-frontend/wiki/Contribution-guidelines) in order to make the contribution process easy and effective for everyone involved.

## What is GULP

GULP is a streaming build system - or short for:

"I'll take care of minifiyng the images, scripts, styles and icons.
Now you just focus on doing what you do best: CODE!"

## How to use GULP

First navigate to your website

    cd c:\"Visual studio projects"\project-name\Project.Website

* To build everything and get the latest dependencies (also runs the build task): `npm i`
* To build whats already in there (runs the build task): `gulp`
* To never touch the cmd window again (runs the watch task): `gulp watch`
* To Stop/Restart GULP: `CTRL + c`

All tasks can be run like: `gulp <task name>`.

## Tasks in this package

The following tasks are available:

* `build` - Runs all the tasks defined in: gulp-config.json > tasksToBuild
* `clean` - Deletes the files/directories defined in: gulp-config.json > pathsToClean
* `rebuild` - Runs the clean task, and then the build task.
* `styles` -  Minifies and bundles CSS files defined in: gulp-config.json > bundles > {bundleName} > styles
* `scripts` - Minifies and bundles JS files defined in: gulp-config.json > bundles > {bundleName} > scripts
* `images` -  Minifies images defined in: gulp-config.json > bundles > {bundleName} > images
* `icons` - Minifies and generates a svg sprite, from the icons defined in: gulp-config.json > bundles > {bundleName} > icons
* `copy` -  Copies the fonts defined in: gulp-config.json > bundles > {bundleName} > fonts
* `deploy` -  Uploads file via FTP, configuration can be found in gulp/config.js
* `html` - Will run through the html folder (not subfolders by default), looking for the `@@include`, to then partially replace them with the path. To learn more, go to the [HTML task in details](#HTML-task-in-details)
* `watch`

  * Runs the scripts, styles, images, icons and fonts task whenever a file has changed. The paths it listens on, is defined in the file gulp/config.json > watch.
  * Also it automatically refreshes your browser window, using livereload (port can be changed in gulp/config.json > livereload > port).

  Google Chrome Plugin: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

  * Generates sourcemaps for CSS and JS.

**NOTE:** The distribution path for each task, can be defined in gulp/config.json - so can the basePath.


### HTML task in details
The HTML task enables us to develop html with a component type of mind such as storing a site header in a single file. `@@include('components/breadcrumb.html')`.
What this means is that we only have to maintain pieces of reusable html in 1 place. This is especially useful when working with navigational elements.

You can also pass data to the included files, by adding a object to the end of the `@@include`, like this:

```html
@@include('components/breadcrumb.html', {
  "parentPaths": [
    {
      "name": "Frontpage",
      "link": "/"
    },
    {
      "name": "Page",
      "link": "page.html",
    }
  ],
  "path": "Subpage"
})
```

In your included file, you can check for the data like this:
```html
<div class="breadcrumb">
    <div class="container">
        @@for (var i = 0; i < parentPaths.length; i++) {
            <span class="breadcrumb__link"><a href="`+parentPaths[i].link+`">`+parentPaths[i].name+`</a></span>
        }
        <span class="breadcrumb__link breadcrumb__link--active">@@path</span>
    </div>
</div>
```

The for loop traverses through our array of parentPaths, while the path is put inside the active link.

There are some limits of what you can do, but the developer of the gulp-file-include is constantly adding more functionality.
For an updated list of possibilities, check here: https://github.com/coderhaoxin/gulp-file-include


## How to use SVG sprite sheet

Use SVG's from the SVG sprite generated by GULP like the following. The `#icon-lock` is the ID of the current SVG in the sprite. This is based on the name of the original SVG in the `/images/icons/`-directory.
So ´/images/icons/lock.svg` are referenced like this:

```html
<svg class="icon icon-lock">
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/dist/icons/icons.svg#icon-lock"></use>
</svg>
```

## Post-CSS components
As a grid we recommend to use [Flexboxgrid](http://flexboxgrid.com/) as it is almost a plug-n-play replacement for the Bootstrap grid.
There's a few basic setups that you will always need for all your projects. Buttons, Grid, Form elements, Tables. (Well, maybe you won't use tables).
There's also an example of a component and a view, just to show how the naming convention should be, as well as how you should both write and organize your CSS files.

## BEM syntax
Quick example of [BEM class notation](https://css-tricks.com/bem-101/). For further info take a look at the [Novicell frontend guidelines](https://novicell.github.io/frontenddocs/)

### Buttons
There's some default styling for buttons as well, including two modifiers.
```html
<button class="button">Primary button</button>
<button class="button button--secondary">Secondary button</button>
<button class="button button--ghost">Ghost button</button>
```

### Forms
Default styling for form inputs. In regards to checkboxes and radiobuttons, refer to the `base.forms.less` file.
```html
<input type="text" class="input" placeholder="Default input">
```

### Tables
```html
<table class="table">
    etc...
</table>
```

## Third party plugins
Third party javascript plugins like `jquery` or `owl-carousel` is handled by *[NPM](https://www.npmjs.com/)*.
Install a new plugin by running `npm install <plugin> --save` or adding the plugin and version to the `package.json` under "dependencies".

**NOTE**: The section called `devDependencies` is **reserved for the build tool only.**

**Always remember to specify a specific version number without `^` or `~`.**

**Here's an example of a `package.json`**
```javascript
...
"devDependencies": {
    ...
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-concat": "^2.6.0",
    "gulp-cssnano": "^2.1.2",
    "gulp-file-include": "^1.0.0",
    "gulp-if": "^2.0.1",
    "gulp-imagemin": "^3.0.2"
    ...
},
"dependencies" : {
    "svg4everybody": "2.1.3",
    "owl-carousel": "2.2.0",
    "angular": "1.6.0"
    ...
  },
```

Next you have to add your plugins in the `gulp/config.js`, in your vendor bundle for minfication an concatination.

**Here's an example of a bundle in the `gulp/config.js`**
```javascript
bundles: [
{
  name: "vendor",
  ignorePlugins: ["jscs", "jshint", "watch"], // add "minify", to ignore minifaction on a bundle
  scripts: [
    vendorPath + "/svg4everybody/dist/svg4everybody.js",
    vendorPath + "/jquery/dist/jquery.js",
    vendorPath + "/owl.carousel/dist/owl.carousel.min.js"
    ...
  ]
}
```

## License
The Novicell Frontend is licensed under the MIT license. (http://opensource.org/licenses/MIT)
