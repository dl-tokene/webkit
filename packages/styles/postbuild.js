const fs = require('fs');

function postBuild(dirpath) {
  try {
    fs.unlinkSync(`${dirpath}/dist/styles.js`)
  } catch (error) {}
}


postBuild(__dirname)
