'use strict';
const settings = require("./settings");
const rootFolder = settings.root_folder;
/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
fractal.set('project.title', 'Novicell Component Library');
fractal.web.set('static.path', rootFolder + '/dist');

/* Tell Fractal where the components will live */
fractal.components.set('path', rootFolder + '/src/components');
// set Layout for all components:
fractal.components.set('default.preview', '@preview');
/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', rootFolder + '/src/docs');