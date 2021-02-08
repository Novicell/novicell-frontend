const { exec } = require('child_process');
const path = require('path');
const settings = require('../../config');
const cssDistFolderName = '/css';

var watch = settings.mainSettings.watch ? ' --watch' : '';

exec(`postcss src/modules/*.css --dir ${path.join(settings.mainSettings.dist, cssDistFolderName)} --ext min.css --config config/styles/postcss.config.js${watch}`, (err, stdout, stderr) => {
      if (err) {
    console.log(`node couldn't execute the command: ${err}`);
    return;
  }
});