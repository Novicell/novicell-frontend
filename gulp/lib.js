var notify = require('gulp-notify');
var fs = require('fs');
var plumber = require('gulp-plumber');

module.exports.notifyError = function (title) {
    return function (message) {
        notify.onError({
            title: title,
            message: "[Error]: " + message
        })(message);
    };
};

module.exports.notifySuccess = function (title) {
    return function (message) {
        return notify({
            title: title,
            message: "[Success]: " + message,
            onLast: true
        });
    };
};

module.exports.notifySuccessFile = function (title) {
    return function (messageFunc) {
        return notify({
            title: title,
            message: function (file) {
                return "[Success]: " + messageFunc(file);
            }
        });
    };
};

module.exports.getFilesNotFound = function (paths)
{
    return paths.map(function (z) {
        return fs.existsSync(z) ? null : z;
    }).filter(function (z) { return z != null; });
};

module.exports.createErrorHandler = function (n) {
    return function (e) {
        n(e.plugin);
        console.log(e.message);
        this.emit("end");
    };
};