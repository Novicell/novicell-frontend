var notifier = require('node-notifier');
var argv = require('yargs').argv;

module.exports = (function () {
    var projectName = "novicell-gulp";

    var projectPath = "./";
    var bowerPath = projectPath + "vendor/bower";
    var distPath = projectPath + "dist";
    var cleanPaths = [distPath];

    var debug = true;

    return {
        debug: (argv.debug !== undefined ? argv.debug.toLowerCase() == "true" : debug),

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
        },

        // If Wordpress, Drupal (php) set to false
        // Requires a .csproj-file, if set to true.
        isVSSolution: true,

        // Add masterTemplates for gulp to inject assets into
        masterTemplates: [
            //projectPath + "Views/Master.cshtml", // in umbraco, do like this
            projectPath + "index.html"
        ],

        projectPath: projectPath,

        bowerPath: bowerPath,
        cleanPaths: cleanPaths,

        loadTasks: [
            "bower", "styles", "scripts",
            "images", "icons", "copy",
            "watch", "build", "revision"
        ],
        buildTasks: [
            "bower", "styles", "scripts",
            "images", "icons", "copy"
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

        // ------------- Styles -------------
        stylesDist: distPath + "/css",
        stylesVendorPrefixes: [
            "last 2 version",
            "safari 5",
            "ie 8",
            "ie 9",
            "opera 12.1",
            "ios 6",
            "android 4"
        ],

        // ------------- Images -------------
        imagesDist: distPath + "/images",
        imagesOptimizationLevel: 5,
        imagesProgressive: true,
        imagesInterlaced: true,

        // ------------- Livereload -------------
        livereloadPort: 35729,
        livereloadPaths: [
            "./dist/scripts/*.js",
            "./dist/css/*.css",
            "./Views/*.cshtml",
            "./macroScripts/*.cshtml",
            "./MasterPages/*.master"
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
            projectPath + "less/**/*.less",
            projectPath + "vendor/**/*.less"
        ],

        // ------------- Copy on build -------------
        buildCopy: [{
            from: projectPath + "fonts/**/*",
            to: distPath  + "/fonts"
        }],

        // ------------- Bundles -------------
        bundles: [
        {
            name: "vendor",
            ignorePlugins: ["jscs", "jshint"],
            scripts: [
                bowerPath + "/jquery/dist/jquery.js",
                bowerPath + "/novicell-default-scripts/scripts/novicell.js",
                // bowerPath + "/novicell-default-scripts/scripts/novicell.cookieinfo.js",
                // bowerPath + "/novicell-default-scripts/scripts/novicell.imageadjust.js",
                // bowerPath + "/novicell-default-scripts/scripts/novicell.overlay.js",
                // bowerPath + "/novicell-default-scripts/scripts/novicell.lazyload.js",
                bowerPath + "/novicell-default-scripts/scripts/novicell.responsive.js"
            ]
        },
        {
            name: "master",
            scripts: [
                "./scripts/**/*.js"
            ],
            styles: ["./less/master.less"],
            images: ["./images/*.{jpg,png}"],
            icons: ["./images/icons/*.svg"],
            tpl: [ "./tpl/*.tpl.html" ]
        }]
    }
})();