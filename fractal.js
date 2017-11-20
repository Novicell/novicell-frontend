'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Add layouts helper
 */
const hbs = require('@frctl/handlebars');

const instance = fractal.components.engine(hbs);

// Using handlebars-layouts (https://www.npmjs.com/package/handlebars-layouts)

const layouts = require('handlebars-layouts');
layouts.register(instance.handlebars);

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Novicell Pattern Library');

/*
 * Tell Fractal which preview file to use.
 */
fractal.components.set('default.preview', '@preview');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'patterns'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'documentation'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, '/dist'));

/*
 * Tell Fractal where to build to.
 */
fractal.web.set('builder.dest', __dirname + '/docs');
