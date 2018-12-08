const fs = require('fs');
const path = require('path');
const glob = require('glob');

const settings = require('../config');
const rootFolder = settings.root_folder;
let args = require('minimist')(process.argv.slice(2));

let sourcePath = path.join(rootFolder, args.i);
let destPath = path.join(rootFolder, args.o);

glob(`${sourcePath}`, function(error, files) {
    if (!error) {
        fs.access(destPath, err => {
            if (err) fs.mkdirSync(destPath);
            files.forEach(x => {
                let filename = path.basename(x);
                copyFile(x, path.join(destPath, filename));
            });
        });
    } else {
        console.log(er);
    }
});

function copyFile(sourcePath, dest) {
    let readStream = fs.createReadStream(sourcePath);

    readStream.once('error', err => {
        console.log(err);
    });

    readStream.once('end', () => {
        console.log('Coppied: ' + path.basename(sourcePath));
    });

    readStream.pipe(fs.createWriteStream(dest));
}
