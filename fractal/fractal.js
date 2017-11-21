'use strict';

/*
* Require the path module
*/
const config = require('../gulp/config.js');
const path = require('path');
const fractal = require('@frctl/fractal').create();
const hbs = require('@frctl/handlebars');
const instance = fractal.components.engine(hbs);
const layouts = require('handlebars-layouts');

// Novicell theme
const novicellTheme = require('@frctl/mandelbrot')({
    favicon: '/fractal/favicon.ico',
    nav: ['docs', 'components'],
    styles: [
        'default',
        "/dist/css/master.min.css"
    ]
});
novicellTheme.addLoadPath(__dirname + '/fractal');
novicellTheme.addStatic(__dirname + "/fractal/novicell-fractal-styles.css"); 

// Project config
fractal.set('project.title', config.appName);
layouts.register(instance.handlebars);

// Components config
fractal.components.set('default.preview', '@preview');
fractal.components.set('path', config.projectPath + 'patterns');

// Docs config
fractal.docs.set('path', config.projectPath + 'documentation');

// Web UI config
fractal.web.theme(novicellTheme);
fractal.web.set('static.mount', config.distPath);
fractal.web.set('builder.dest', config.projectPath + 'docs');

// Export config
module.exports = fractal;