var config = require('../gulp-config.json');

config.tasksToRun.forEach(function (x) {
    console.log(x);
    require('./tasks/' + x);
});