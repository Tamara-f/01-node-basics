const path = require('path');
const fs = require('fs-extra');
require('dotenv').config();

const IMG_DIR = path.join(process.cwd(), 'public', 'images', '/');

const moveFile = async (req, res, next) => {
  if (req.file) {
    await fs.move(
      req.file.path,
      path.join(IMG_DIR, req.file.filename),
      function (err) {
        if (err) return console.error(err);
        console.log('Successfully moved');
      }
    );
  }

  next();
};

module.exports = moveFile;
