const fs = require('fs');
const path = require('path');
const glob = require('glob');

const settings = require('../config');
const rootFolder = settings.root_folder;
const args = require('minimist')(process.argv.slice(2));

const sourcePath = path.join(rootFolder, args.i);
const destPath = path.join(rootFolder, args.o);

glob(`${sourcePath}`, (error, files) => {
    if (!error) {
        fs.access(destPath, err => {
            if (err) fs.mkdirSync(destPath);
            files.forEach(x => {
                const filename = path.basename(x);
                copyFile(x, path.join(destPath, filename));
            });
        });
    } else {
        console.log(er);
    }
});

function copyFile(sourcePath, dest) {
    const readStream = fs.createReadStream(sourcePath);

    readStream.once('error', err => {
        console.error(err);
    });

    readStream.once('end', () => {
        console.log(`Copied: ${path.basename(sourcePath)}`);
    });

    readStream.pipe(fs.createWriteStream(dest));
}
