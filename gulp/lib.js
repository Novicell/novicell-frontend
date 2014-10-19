var notify = require('gulp-notify');
var fs = require('fs');
var plumber = require('gulp-plumber');

module.exports.notifyError = function (title) {
    return function (message) {
        notify.onError({
            title: "[ERROR] " + title,
            message: message
        })(message);
    };
};

module.exports.notifySuccess = function (title) {
    return function (message) {
        return notify({
            title: "[SUCCESS] " + title,
            message: message
        });
    };
};

module.exports.fileExists = function (filename, successCallback, errorCallback)
{
    return fs.exists(filename, function (exists) {
        return exists ? successCallback(filename) : errorCallback(filename);
    });
};