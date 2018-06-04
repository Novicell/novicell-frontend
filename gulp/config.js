'use strict';

var notifier = require('node-notifier');
var argv = require('yargs').argv;
var path = require('path');

module.exports = (function () {
    var projectPath = "./"; // path for the source files
    var assetPath = projectPath + "assets/"; // path for fractal assets such as images, icons and more
    var webPath = projectPath + ""; // path for the website - usually path to livereload views, and used for distPath
    var vendorPath = projectPath + "node_modules/"; // path for vendor scripts
    var distPath = webPath + "dist/"; // path for production files
    var cleanPaths = [distPath]; // files/folders to be removed with "clean"-task


    /*
     * App manifest and favicon variables
     */
    var appName = "Novicell Frontend"; // name for webapp
    var appColor = "#ffffff"; // color for webapp icons
    var appDescription = "Novicell Progressive WebApp";

    return {
        // ------------- Bundles -------------
        bundles: [
            {
                name: 'vendor',
                ignorePlugins: ['jscs', 'jshint', 'watch', 'babel'], // add 'minify', to ignore minifaction on a bundle
                scripts: [
                    vendorPath + "svg4everybody/dist/svg4everybody.js",
                    vendorPath + "validate/dist/validate.js",
                    vendorPath + "vanilla-text-mask/dist/vanillaTextMask.js",
                    vendorPath + "novicell-debounce/js/novicell.debounce.js",
                    vendorPath + "novicell-lazyload/js/novicell.dynamic-image.js",
                    vendorPath + "novicell-lazyload/js/lazy-images.js",
                    vendorPath + "lazysizes/lazysizes.js",
                    vendorPath + "flickity/dist/flickity.pkgd.js",
		            vendorPath + "novicell-cookie-info/js/novicell.cookieinfo.js"
                ]
            },
            {
                name: 'master',
                scripts: [
                    assetPath + "scripts/components/**/*.js",
                    assetPath + "scripts/master.js"
                ],
                styles: [
                    projectPath + "patterns/_base/master.css"
                ],
                images: [ assetPath + "images/**/*.{jpg,png,svg,gif}"]
            },
            {
                name: "icons",
                icons: [ assetPath + "icons/**/*.svg" ]
            }
        ],


        // ------------- Styles -------------
        stylesDist: distPath + "css",

        // ------------- Scripts -------------
        scriptsDist: distPath + "scripts",

        // ------------- Icons ---------------
        iconsDist: distPath + "icons/",

        // ------------- Fonts -------------
        fontsDist: distPath + "fonts",

        // ------------- Images -------------
        imagesDist: distPath + "images",

        // ------------- Livereload ---------
        livereloadPort: 35729,
        livereloadPaths: [
            distPath + "**/*.*",
            webPath + "Views/**/*.cshtml", // Umbraco, Sitecore
            webPath + "Files/Templates/Designs/**/*.cshtml", // Dynamicweb
            webPath + "**/*.php" // Wordpress, Drupal
        ],

        // ------------- Watch -------------
        watchImages: [ assetPath + 'images/**/*' ],
        watchIcons: [ assetPath + 'icons/*' ],
        watchFonts: [ assetPath + 'fonts/*' ],
        watchScripts: [
            assetPath + 'scripts/**/*.js'
        ],
        watchStyles: [
            projectPath + "/patterns/**/*.css"
        ],

        // ------------- Deploy task --------
        deployHost: "",
        deployUser: "",
        deployPass: "",
        deployDest: "/public_html/",
        deployGlobs: [ distPath + '**' ],

        // ------------- Copy on build --------
        buildCopy: [{
            from: assetPath + "fonts/**/*",
            to: distPath  + "fonts"
        }],


        // ------------- Tasks -------------
        loadTasks: [
            "styles", "scripts", "images", "icons", "copy", "build", "favicons", "watch", "deploy", "fractal"
        ],
        buildTasks: [
            "styles", "scripts", "images", "icons", "copy"
        ],

        // ------------- Return Paths -------------
        projectPath: projectPath,
        vendorPath: vendorPath,
        cleanPaths: cleanPaths,
        distPath: distPath,
        assetPath: assetPath,
        webPath: webPath,
        
        // ------------- Return Variables -------------
        appName: appName,
        appColor: appColor,
        appDescription: appDescription,
        

        // ---------- Errorhandler ------
        errorHandler: function(taskName)
        {
            return function (e) {
                notifier.notify({
                    'title': taskName,
                    'message': 'An error occured in the ' + e.plugin + ' plugin.'
                });
                console.error(e.message);
                this.emit('end');
            };
        }
    }
})();
