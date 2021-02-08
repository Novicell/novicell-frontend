const { exec } = require('child_process');
const path = require('path');
const settings = require('../../config');
const faviconsDistFolderName = '/favicons';

exec(`real-favicon generate config/favicon/faviconDescription.json config/favicon/faviconData.json ${path.join(settings.mainSettings.dist, faviconsDistFolderName)}`, (err, stdout, stderr) => {
  if (err) {
    console.log(`node couldn't execute the command: ${err}`);
    return;
  }
});