# Novicell Frontend

[![Netlify Status](https://api.netlify.com/api/v1/badges/cd7530b5-4978-44cf-8719-be271a0b157a/deploy-status)](https://app.netlify.com/sites/novicell-frontend/deploys)

Novicell Default Frontend package is a framework for your frontend setup. This setup helps developer by automizing frontend workflow using certain technologies like NPM Scripts and Webpack.
It includes PostCSS, Stylelint, Webpack, ESLint, Babel, Fractal.
When setup, it also helps you optimize images, combine SVGs to a sprite, generate favicons, minifying/optimizing CSS and Javascript.

## Table of content

-   [Quick start](#setup)
-   [Configuration and paths](#configuration-and-paths)
-   [NPM Scripts](#npm-scripts)
-   [Generate component](#generate-component)
-   [Additional](#additional)
-   [Contribution](#contribution)
-   [License](#license)

## Setup

-   Download and install Node.js min. v. 8.9.2 (https://nodejs.org/en/download/)

1. Clone the repo `git clone https://github.com/Novicell/novicell-frontend.git`.
2. Run `npm install` to install all dependencies.
3. Insert paths/variables to config.js and package.json. [Configuration and paths](#configuration-and-paths)
4. Run `npm run build:dev` to build the dist folder with all the minified/optimized files.
5. Run `npm run dev` to start watching file changes and continuous copilation.

## Configuration and paths

The whole automized build system looks for paths and variables in order to work dynamically with different projects.
Therefore, when starting new project edit options in 2 files (they are both in root directory):

-   `config.js`
-   `package.json`

config.js:

```js
const dist = '/dist/'; // /dist by default. Folder where all the built files will go to (minified/optimized/compiled)
const sourceRootFolder = '/src/'; // /src by default. Folder where ATOM modules belong
const modulesDir = '/src/modules/**/*.js'; // Where JavaScript files should be placed. Add CSS files here if you want them as separate bundle
const assetsDir = '/assets/'; // Wheer you keep images, fonts, icons...
```

Look for "config" field in package.json and fill in:

```json
    "config": {
        "DIST": "dist",
        "CSS_MODULES": "src/modules/*.css"
    },
```

## NPM Scripts

These are most often used scripts:

-   for development: `npm run dev` and `npm run build:dev`
-   for production: `npm run prod` and `npm run build:prod`

But there are more available in this package (add `npm run` before script name):

-   `fractal` - Runs fractal
-   `fractal:build` - Builds static site
-   `clean` - Deletes the files/directories defined in: `gulp/config.js > pathsToClean`
-   `fonts` - Copies the fonts defined in: `config.js` to `dist`
-   `images` - Minifies images defined in: `config.js` to `dist/images`
-   `sprites` - Minifies all sprites from `assets/icons` to `dist/icons`.
-   `styles` - Minifies/lints and bundles CSS files defined in: `src/modules` to `dist/styles`
-   `webpack` - Minifies/optimizes/lints and bundles JS files defined in: `src/modules` to `dist/scripts`
-   `watch:styles` - Automatically bundles CSS changes while developing
-   `watch:webpack` - Automatically bundles JS changes while developing
-   `deploy` - Uploads file via FTP, configuration can be found in `gulp/config.js`
-   `dev` - webpack:watch + styles:watch + fractal
-   `start` - Equal to `dev`
-   `prod` - Same as dev but in production (extra optimization) but slower build,
-   `fix` - Fixes all possible linting for JavaScript
-   `buildDrupal` - (For drupal projects) Bundles JavaScript and CSS into same location
-   `generateFavicon` - generates a favicon based on config/favicon/faviconDescription.json settings

## Generate component

1. To allow generating components write: `npm link` in the root dir. (only have to do it once)
2. Run

```
createComponent -t a -n my-component
```
This example will create files in /src/01-atoms/my-component

| Argument | Name | Type | Description |
| --- | --- | --- | --- |
| -t | Type | `a/m/o/p` | Defines the type of your component, this decides where the component is created. a = atom, m = molecule, o = organism, p = page;
| -n | Name |`string` | Sets the filename of the component files, and a capitalized version will be used as title in the config file


## Additional

If you need more information, we have a Wiki that contains in-depth explanations:

-   [Home](https://github.com/Novicell/novicell-frontend/wiki)
-   [Adding new files](https://github.com/Novicell/novicell-frontend/wiki/Adding-new-files)
-   [Atomic guidelines](https://github.com/Novicell/novicell-frontend/wiki/Atomic-guidelines)
-   [BEM](https://github.com/Novicell/novicell-frontend/wiki/BEM)
-   [CSS (PostCSS)](<https://github.com/Novicell/novicell-frontend/wiki/CSS-(PostCSS)>)
-   [Fractal guidelines](https://github.com/Novicell/novicell-frontend/wiki/Fractal-guidelines)
-   [FAQ](https://github.com/Novicell/novicell-frontend/wiki/Frequently-asked-questions)
-   [HTML + Handlebars](https://github.com/Novicell/novicell-frontend/wiki/HTML-and-Handlebars)
-   [VueJS Usage](https://github.com/Novicell/novicell-frontend/wiki/VueJS-in-the-setup)
-   [Prettier extension](https://github.com/Novicell/novicell-frontend/wiki/Prettier-extension-on-VSCode)
-   [Netlify](https://github.com/Novicell/novicell-frontend/wiki/Setting-up-Netlify-CI)

## Contribution

Looking to contribute something? **Here's how you can help.**
Please take a moment to review our [contribution guidelines](https://github.com/Novicell/novicell-frontend/wiki/Contribution-guidelines) in order to make the contribution process easy and effective for everyone involved.

## License

The Novicell Frontend is licensed under the MIT license. (http://opensource.org/licenses/MIT)

## Collaborators

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://www.novicell.dk"><img src="https://avatars1.githubusercontent.com/u/1523780?v=4" width="70px;" alt="Danni Larsen"/><br /><sub><b>Danni Larsen</b></sub></a><br /><a href="https://github.com/Novicell/Novicell-Frontend/commits?author=Dan9boi" title="Code"></a></td><td align="center"><a href="https://github.com/ankeris"><img src="https://avatars2.githubusercontent.com/u/31132643?v=4" width="70px;" alt="Juozas Rastenis"/><br /><sub><b>Juozas Rastenis</b></sub></a><br /><a href="https://github.com/Novicell/Novicell-Frontend/commits?author=ankeris" title="Code"></a></td><td align="center"><a href="https://github.com/jhavmoeller"><img src="https://avatars2.githubusercontent.com/u/16593791?v=4" width="70px;" alt="Jonas Havmøller"/><br /><sub><b>Jonas Havmøller</b></sub></a><br /><a href="https://github.com/Novicell/Novicell-Frontend/commits?author=jhavmoeller" title="Code"></a></td><td align="center"><a href="https://github.com/shp-novicell"><img src="https://avatars3.githubusercontent.com/u/19607667?v=4" width="70px;" alt="shp-novicell"/><br /><sub><b>shp-novicell</b></sub></a><br /><a href="https://github.com/Novicell/Novicell-Frontend/commits?author=shp-novicell" title="Code"></a></td><td align="center"><a href="https://github.com/heense"><img src="https://avatars1.githubusercontent.com/u/8288150?v=4" width="70px;" alt="Henrik Madsen"/><br /><sub><b>Henrik Madsen</b></sub></a><br /><a href="https://github.com/Novicell/Novicell-Frontend/commits?author=heense" title="Code"></a></td><td align="center"><a href="https://github.com/Bjornnyborg"><img src="https://avatars0.githubusercontent.com/u/5557038?v=4" width="70px;" alt="Bjornnyborg"/><br /><sub><b>Bjornnyborg</b></sub></a><br /><a href="https://github.com/Novicell/Novicell-Frontend/commits?author=Bjornnyborg" title="Code"></a></td><td align="center"><a href="https://github.com/emilankersen"><img src="https://avatars1.githubusercontent.com/u/6448879?v=4" width="70px;" alt="emilankersen"/><br /><sub><b>emilankersen</b></sub></a><br /><a href="https://github.com/Novicell/Novicell-Frontend/commits?author=emilankersen" title="Code"></a></td><td align="center"><a href="https://github.com/MKAndersen"><img src="https://avatars3.githubusercontent.com/u/19702371?v=4" width="70px;" alt="MKAndersen"/><br /><sub><b>MKAndersen</b></sub></a><br /><a href="https://github.com/Novicell/Novicell-Frontend/commits?author=MKAndersen" title="Code"></a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
