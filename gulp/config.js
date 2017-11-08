'use strict';

var notifier = require('node-notifier');
var argv = require('yargs').argv;
var path = require('path');

module.exports = (function () {
    var projectPath = "./"; // path for the source files
    var webPath = projectPath + ""; // path for the website - usually path to livereload views, and used for distPath
    var vendorPath = projectPath + "node_modules/"; // path for vendor scripts
    var distPath = webPath + "dist/"; // path for production files
    var cleanPaths = [distPath]; // files/folders to be removed with "clean"-task
    var faviconPath = "/dist/"; // productions path for favicons. Change for none Umbraco


    //App manifest and favicon variables
    var appName = "Novicell Frontend"; // name for webapp
    var appColor = "#ffffff"; // color for webapp icons
    var appDescription = "Novicell Progressive WebApp";

    return {
        // ------------- Bundles -------------
        bundles: [
            {
                name: 'vendor',
                ignorePlugins: ['jscs', 'jshint', 'watch'], // add 'minify', to ignore minifaction on a bundle
                scripts: [
                    vendorPath + "svg4everybody/dist/svg4everybody.js"
                ]
            },
            {
                name: 'master',
                scripts: [
                    projectPath + "scripts/components/**/*.js",
                    projectPath + "scripts/master.js"
                ],
                styles: [
                    projectPath + "post-css/master.css"
                ],
                images: [ projectPath + "images/**/*.{jpg,png,svg,gif}"],
                html: [ projectPath + "html/*.html" ]
            },
            {
                name: "icons",
                icons: [ projectPath + "icons/**/*.svg" ]
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
            webPath + "Views/**/*.cshtml",
            webPath + "html/**/*.html",
            webPath + "**/*.php"
        ],

        // ------------- Watch -------------
        watchImages: [ projectPath + 'images/**/*' ],
        watchIcons: [ projectPath + 'icons/*' ],
        watchFonts: [ projectPath + 'fonts/*' ],
        watchHtml: [ projectPath + 'html/**/*' ],
        watchScripts: [
            projectPath + 'scripts/**/*.js'
        ],
        watchStyles: [
            projectPath + 'post-css/**/*.css',
            projectPath + 'less/**/*.less'
        ],

        // ------------- Deploy task --------
        deployHost: "",
        deployUser: "",
        deployPass: "",
        deployDest: "/public_html/",
        deployGlobs: [ distPath + '**' ],

        // ------------- Copy on build --------
        buildCopy: [{
            from: projectPath + "fonts/**/*",
            to: distPath  + "fonts"
        }],


        // ------------- Tasks -------------
        loadTasks: [
            "styles", "scripts", "images", "icons", "favicons", "copy", "watch", "build", "html", "deploy"
        ],
        buildTasks: [
            "styles", "scripts", "images", "icons", "copy"
        ],

        // ------------- Return Paths -------------
        projectPath: projectPath,
        vendorPath: vendorPath,
        cleanPaths: cleanPaths,
        distPath: distPath,
        faviconPath: faviconPath,
        

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
                console.log(e.message);
                this.emit('end');
            };
        }
    }
})();
