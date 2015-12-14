var notifier = require('node-notifier');
var argv = require('yargs').argv;

module.exports = (function () {
    var projectName = "novicell-gulp";

    var projectPath = "./";
    var bowerPath = projectPath + "vendor/bower"; // remember to edit .bowerrc aswell (for CLI)
    var distPath = projectPath + "dist";
    var cleanPaths = [distPath];
    var preprocessor = "less"; //choose between "less" or "scss"

    return {
        // ------------- Bundles -------------
        bundles: [
            {
                name: "vendor",
                ignorePlugins: ["jscs", "jshint", "watch"], // add "minify", to ignore minifaction on a bundle
                scripts: [
                    bowerPath + "/jquery/dist/jquery.js"
                ]
            },
            {
                // For styling Umbraco Grid editors in backoffice
                name: "backofficemaster",
                scripts: [
                    "./scripts/backofficemaster.js"
                ],
                styles: ["./" + preprocessor + "/backofficemaster." + preprocessor],
            },
            {
                name: "master",
                ignorePlugins: ["jscs"],
                scripts: [
                    "./scripts/components/novicell.js",
                    // "./scripts/components/novicell.cookieinfo.js",
                    // "./scripts/components/novicell.imageadjust.js",
                    // "./scripts/components/novicell.overlay.js",
                    // "./scripts/components/novicell.lazyload.js",
                    "./scripts/components/novicell.responsive.js",
                    "./scripts/components/novicell.map.js",
                    "./scripts/master.js"
                ],
                styles: ["./" + preprocessor + "/master." + preprocessor],
                images: ["./images/*.{jpg,png,svg,gif}"],
                icons: ["./images/icons/*.svg"]
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
        iconsDist: distPath,
        spriteConfig: {
            shape : {
                // Set maximum dimensions
                dimension       : {
                    maxWidth    : 32,
                    maxHeight   : 32
                }
            },
            mode : {
                view : {
                    bust : false,
                    render : {
                        less : true
                    },
                    dest : 'icons',
                    sprite : 'icons-css.svg'
                },
                symbol : {
                    dest : 'icons',
                    sprite : 'icons.svg'
                }
            }
        },

        // ------------- Fonts -------------
        fontsDist: distPath + "/fonts",

        // ------------- Images -------------
        imagesDist: distPath + "/images",
        imagesOptimizationLevel: 5,
        imagesProgressive: true,
        imagesInterlaced: true,

        // ------------- Livereload ---------
        livereloadPort: 35729,
        livereloadPaths: [
            "./dist/scripts/*.js",
            "./dist/css/*.css",
            "./Views/**/*.cshtml"
        ],

        // ------------- Watch -------------
        watchImages: [ projectPath + "images/**/*", projectPath + '!images/icons/*' ],
        watchIcons: [ projectPath + "images/icons/*" ],
        watchFonts: [ projectPath + "fonts/*" ],
        watchScripts: [
            projectPath + "scripts/**/*.js",
            projectPath + "vendor/**/*.js"
        ],
        watchStyles: [
            projectPath + preprocessor + "/**/*." + preprocessor,
            projectPath + "vendor/**/*.{less, scss}"
        ],

        // ------------- Copy on build --------
        buildCopy: [{
            from: projectPath + "fonts/**/*",
            to: distPath  + "/fonts"
        }],


        // ------------- Tasks -------------
        loadTasks: [
            "bower", "styles", "scripts",
            "images", "icons", "copy",
            "watch", "build"
        ],
        buildTasks: [
            "styles", "scripts",
            "images", "icons", "copy"
        ],

        // ------------- Return Paths -------------
        projectPath: projectPath,
        bowerPath: bowerPath,
        cleanPaths: cleanPaths,
        preprocessor: preprocessor,

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