const stylelint = require('stylelint');
const stylelintConfig = require('./stylelint.config.js');
const settings = require('../../config');
const sourceRootFolder = settings.sourceRootFolder;
const watch = require('glob-watcher');

const watcher = watch([sourceRootFolder + '/**/*css']);
 
// Listen for the 'change' event to get `path`/`stat`
// No async completion available because this is the raw chokidar instance
watcher.on('change', function(pathChanged, stat) {
    stylelint.lint({
        config: stylelintConfig,
        fix: true,
        configBasedir: sourceRootFolder,
        files: pathChanged
    })
});
