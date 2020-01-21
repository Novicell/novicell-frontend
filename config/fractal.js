'use strict';
const config = require('../config');
const path = require('path');
/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = require('@frctl/fractal').create();
const hbs = require('@frctl/handlebars');
const layouts = require('handlebars-layouts');

/* Diable Bluebird warnings */
const bluebird = require('bluebird');
bluebird.config({
    warnings: false,
});

const instance = fractal.components.engine(hbs);

// Novicell theme
const novicellTheme = require('@frctl/mandelbrot')({
    //favicon: config.webPath +'favicon.ico',
    styles: ['default', '/fractal/styles/novicell-fractal-styles.css']
});

/* Set the title of the project */
fractal.set('project.title', 'Novicell Component Library');
fractal.web.set('static.path', config.root_folder + '/' + config.relativeDist);

/* Tell Fractal where the components will live */
fractal.components.set('path', config.componentsDir.main);
// set Layout for all components:
fractal.components.set('default.preview', '@preview');
/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', config.componentsDir.main + '/docs');
fractal.docs.set('default.preview', '@preview');
fractal.docs.set('ext', 'hbs');
// Project config
fractal.set('project.title', config.appName);
layouts.register(instance.handlebars);
novicellTheme.addStatic(config.fullConfigsPath, 'fractal');
novicellTheme.addStatic(config.root_folder + '/' + config.relativeDist, 'dist');

fractal.web.theme(novicellTheme);

//Helpers
instance.handlebars.registerHelper('times', function (n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i) accum += block.fn(i);
    return accum;
});

instance.handlebars.registerHelper('math', function (lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return {
        '+': lvalue + rvalue,
        '-': lvalue - rvalue,
        '*': lvalue * rvalue,
        '/': lvalue / rvalue,
        '%': lvalue % rvalue
    } [operator];
});

instance.handlebars.registerHelper('section', function (name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
});

instance.handlebars.registerHelper('compare', function (lvalue, rvalue, options) {
    if (arguments.length < 3) throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    var operator = options.hash.operator || '==';

    var operators = {
        '==': function (l, r) {
            return l == r;
        },
        '===': function (l, r) {
            return l === r;
        },
        '!=': function (l, r) {
            return l != r;
        },
        '<': function (l, r) {
            return l < r;
        },
        '>': function (l, r) {
            return l > r;
        },
        '<=': function (l, r) {
            return l <= r;
        },
        '>=': function (l, r) {
            return l >= r;
        },
        typeof: function (l, r) {
            return typeof l == r;
        }
    };

    if (!operators[operator]) throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);

    var result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

// Web UI config
fractal.web.set('builder.dest', path.join(config.root_folder + '/build'));
fractal.web.set('server.syncOptions', {
    // open: true, // open the server on 'gulp fractal'
    // browser: ['chrome'],
    // notify: true,
    files: [path.join(__dirname, '../' + config.webPath + 'dist'), path.join(config.componentsDir.main, '**/*[.hbs, .json]')]
});

// Export config
module.exports = fractal;