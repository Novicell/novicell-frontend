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
    favicon: config.webPath +'favicon.ico',
    styles: [
        'default',
        "/fractal/novicell-fractal-styles.css"
    ]
});

novicellTheme.addStatic(__dirname, 'fractal'); 
novicellTheme.addStatic(path.join(__dirname, '../' + config.webPath + 'dist'), 'dist'); 

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
fractal.web.set('builder.dest', config.projectPath + 'build');
fractal.web.set('server.syncOptions', {
    // open: true, // open the server on 'gulp fractal'
    // browser: ['chrome'],
    // notify: true,
    files: [path.join(__dirname, '../' + config.webPath + 'dist'), path.join(__dirname, '../patterns/**/*[.hbs, .json]')]
});

// Export config
module.exports = fractal;
