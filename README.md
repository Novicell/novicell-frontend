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
* `config.js`
* `package.json`

config.js:
```js
const dist = '/dist/'; // /dist by default. Folder where all the built files will go to (minified/optimized/compiled)
const sourceRootFolder = '/src/'; // /src by default. Folder where ATOM modules belong
const modulesDir = '/src/Modules/**/*.js'; // Where JavaScript files should be placed. Add CSS files here if you want them as separate bundle
const assetsDir = '/assets/'; // Wheer you keep images, fonts, icons...
```

Look for "config" field in package.json and fill in:
```json
    "config": {
        "DIST": "dist",
        "CSS_MODULES": "src/Modules/*.css" 
    },
```

## NPM Scripts

These are most often used scripts:
* for development: `npm run dev` and `npm run build:dev`
** 
* for production: `npm run prod` and `npm run build:prod`

But there are more available in this package (add `npm run` before script name):
-   `fractal` - Runs fractal
-   `fractal:build` - Builds static site
-   `clean` - Deletes the files/directories defined in: `gulp/config.js > pathsToClean`
-   `fonts` - Copies the fonts defined in: `config.js` to `dist`
-   `images` - Minifies images defined in: `config.js` to `dist/images`
-   `sprites` - Minifies all sprites from `assets/icons` to `dist/icons`.
-   `styles` - Minifies/lints and bundles CSS files defined in: `src/Modules` to `dist/styles`
-   `webpack` - Minifies/optimizes/lints and bundles JS files defined in: `src/Modules` to `dist/scripts`
-   `watch:styles` - Automatically bundles CSS changes while developing
-   `watch:webpack` - Automatically bundles JS changes while developing
-   `deploy` - Uploads file via FTP, configuration can be found in `gulp/config.js`
-   `dev` - webpack:watch + styles:watch + fractal
-   `start` - Equal to `dev`
-   `prod` - Same as dev but in production (extra optimization) but slower build,
-   `fix` - Fixes all possible linting for JavaScript
-   `buildDrupal` - (For drupal projects) Bundles JavaScript and CSS into same location
-   `generateFavicon` - generates a favicon based on configurations/faviconDescription.json settings

## Generate component

1. To allow generating components write: `npm link` in the root dir. (only have to do it once)
2. Run 
```
createComponent -t a -n testName
```

a - atom, m - molecule, o - organism, p - page;
```bash
-t a/m/o/p # choose one from these
```

```bash
-n # name of component
```

## Additional
If you need more information, we have a Wiki that contains in-depth explanations:
-   [Home](https://github.com/Novicell/novicell-frontend/wiki)
-   [Adding new files](https://github.com/Novicell/novicell-frontend/wiki/Adding-a-new-files)
-   [Atomic guidelines](https://github.com/Novicell/novicell-frontend/wiki/Atomic-guidelines)
-   [BEM](https://github.com/Novicell/novicell-frontend/wiki/BEM)
-   [CSS (PostCSS)](https://github.com/Novicell/novicell-frontend/wiki/CSS-(PostCSS))
-   [Fractal guidelines](https://github.com/Novicell/novicell-frontend/wiki/Fractal-guidelines)
-   [FAQ](https://github.com/Novicell/novicell-frontend/wiki/Frequently-asked-questions)
-   [HTML + Handlebars](https://github.com/Novicell/novicell-frontend/wiki/HTML-and-Handlebars)
-   [Webpack](#)
-   [VueJS Usage](#)
-   [Prettier extension](https://github.com/Novicell/novicell-frontend/wiki/Prettier-extension-on-VSCode)
-   [Netlify](https://github.com/Novicell/novicell-frontend/wiki/Setting-up-Netlify-CI)

## Contribution

Looking to contribute something? **Here's how you can help.**
Please take a moment to review our [contribution guidelines](https://github.com/Novicell/novicell-frontend/wiki/Contribution-guidelines) in order to make the contribution process easy and effective for everyone involved.

## License

The Novicell Frontend is licensed under the MIT license. (http://opensource.org/licenses/MIT)
