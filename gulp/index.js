var config = require('../gulp-config.json');

config.tasks.forEach(function (x) {
    require('./tasks/' + x);
});