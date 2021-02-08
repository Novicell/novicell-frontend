const { exec } = require('child_process');
const path = require('path');
const settings = require('../../config');
const fontsDistFolderName = '/fonts';

exec(`copyfiles -u 2 assets/fonts/**/* ${path.join(settings.mainSettings.dist, fontsDistFolderName)} -V`, (err, stdout, stderr) => {
  if (err) {
    console.log(`node couldn't execute the command: ${err}`);
    return;
  }
});