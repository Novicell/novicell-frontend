const stylelint = require('stylelint');
const stylelintConfig = require('./stylelint.config.js');
const settings = require('../../config');
const rootFolder = settings.root_folder;
const watch = require('glob-watcher');

const watcher = watch([rootFolder + '/test.css', '!./something.js']);
 
// Listen for the 'change' event to get `path`/`stat`
// No async completion available because this is the raw chokidar instance
watcher.on('change', function(pathChanged, stat) {
    stylelint.lint({
        config: stylelintConfig,
        fix: true,
        configBasedir: rootFolder,
        files: pathChanged
    })
});