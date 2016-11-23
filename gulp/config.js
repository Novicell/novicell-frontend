'use strict';

var notifier = require('node-notifier');
var argv = require('yargs').argv;
var path = require('path');

module.exports = (function () {
    var projectName = "novicell-gulp";

    var projectPath = "./";
    var bowerPath = projectPath + "vendor/bower"; // remember to edit .bowerrc aswell (for CLI)
    var distPath = projectPath + "dist";
    var typescriptPath = projectPath + "scripts/typescript";
    var cleanPaths = [distPath];
    var enableTypescript = false; // Set to false to disable

    return {
        // ------------- Bundles -------------
        bundles: [
            {
                name: "vendor",
                ignorePlugins: ["jscs", "jshint", "watch"], // add "minify", to ignore minifaction on a bundle
                scripts: [
                    bowerPath + "/svg4everybody/dist/svg4everybody.js",
                    bowerPath + "/jquery/dist/jquery.js"
                ]
            },
            {
                name: "master",
                scripts: [
                    projectPath + "scripts/components/novicell.js",
                    projectPath + "scripts/components/novicell.debounce.js",
                    projectPath + "scripts/components/novicell.visible.js",
                    projectPath + "scripts/components/novicell.lazyloadResponsive.js",
                    projectPath + "scripts/components/novicell.embed.js",
                    projectPath + "scripts/components/novicell.overlay.js",
                    projectPath + "scripts/components/novicell.cookieinfo.js",
                    projectPath + "scripts/components/novicell.map.js",
                    projectPath + "scripts/components/novicell.font.js",
                    projectPath + "scripts/master.js"
                ],
                themes: [ projectPath + "less/themes/*"] ,
                styles: [ projectPath + "less/master.less"] ,
                images: [ projectPath + "images/**/*.{jpg,png,svg,gif}"] ,
                html: [ projectPath + "html/*.html" ]
            },
            {
                name: "webfont",
                styles: [ projectPath + "less/base/base.fonts.less"] ,
            },
            {
                name: "icons",
                icons: [ projectPath + "icons/**/*.svg" ]
            }
        ],


        // ------------- Styles -------------
        stylesDist: distPath + "/css",
        stylesVendorPrefixes: [
            "last 2 version",
            "safari 5",
            "ie 9",
            "opera 12.1",
            "ios 8",
            "android 4"
        ],

        // ------------- Scripts -------------
        scriptsDist: distPath + "/scripts",

        // ------------- Icons ---------------
        iconsDist: distPath + "/icons/",
        spriteConfig: {
            shape : {
                // Set maximum dimensions
                dimension       : {
                    maxWidth    : 32,
                    maxHeight   : 32
                },
                // Exclude path from id
                id: {
                    generator: function (name) {
                        return path.basename(name, '.svg');
                    }
                },
                // Convert style to attributes
                transform : [
                    {svgo       : {
                        plugins : [
                            { removeStyleElement  : true}
                        ]
                    }}
                ],
            },
            mode : {
                symbol : true
            }
        },

        // ------------- Fonts -------------
        fontsDist: distPath + "/fonts",

        // ------------- Images -------------
        imagesDist: distPath + "/images",
        imagesOptimizationLevel: 5,
        imagesProgressive: true,
        imagesInterlaced: true,

        // -------------- HTML --------------
        htmlFileIncludeConfig: {
            prefix: '@@',
            basepath: '@file'
        },

        // ------------- Livereload ---------
        livereloadPort: 35729,
        livereloadPaths: [
            "./dist/scripts/*.js",
            "./dist/css/*.css",
            "./Views/**/*.cshtml",
            "./html/**/*.html"
        ],

        // ------------- Watch -------------
        watchImages: [ projectPath + "images/**/*" ],
        watchIcons: [ projectPath + "icons/*" ],
        watchFonts: [ projectPath + "fonts/*" ],
        watchHtml: [ projectPath + "html/**/*" ],
        watchScripts: [
            projectPath + "scripts/**/*.js"
        ],
        watchStyles: [
            projectPath + "less/**/*.less"
        ],

        // ------------- Copy on build --------
        buildCopy: [{
            from: projectPath + "fonts/**/*",
            to: distPath  + "/fonts"
        }],


        // ------------- Tasks -------------
        loadTasks: [
            "bower", "typescript", "styles", "themes",
            "scripts", "images", "icons",
            "copy", "watch", "build", "html"
        ],
        buildTasks: [
            "styles", "themes", "typescript", "scripts",
            "images", "icons", "copy", "html"
        ],

        // ------------- Return Paths -------------
        projectPath: projectPath,
        bowerPath: bowerPath,
        cleanPaths: cleanPaths,
        typescriptPath: typescriptPath,
        enableTypescript: enableTypescript,
        distPath: distPath,

        // ---------- Errorhandler ------
        errorHandler: function(taskName)
        {
            return function (e) {
                notifier.notify({
                    "title": taskName,
                    "message": "An error occured in the " + e.plugin + " plugin."
                });
                console.log(e.message);
                this.emit("end");
            };
        }
    }
})();
