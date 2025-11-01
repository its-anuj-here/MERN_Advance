const fs = require("fs");
const path = require("path");
const Busboy = require("busboy");

function busboyUploadMiddleware(uploadDir) {
  return function (req, res, next) {
    if (!req.headers["content-type"] || !req.headers["content-type"].includes("multipart/form-data")) {
      return next();
    }

    const busboy = Busboy({ headers: req.headers });
    req.body = {};
    req.files = [];

    busboy.on("field", (fieldname, val) => {
      if (req.body[fieldname]) {
        if (Array.isArray(req.body[fieldname])) {
          req.body[fieldname].push(val);
        } else {
          req.body[fieldname] = [req.body[fieldname], val];
        }
      } else {
        req.body[fieldname] = val;
      }
    });

    busboy.on("file", (fieldname, fileStream, fileInfo) => {
    const { filename, encoding, mimeType } = fileInfo;

    if (!filename) {
      fileStream.resume();
      return;
    }

    const saveTo = path.join(uploadDir, Date.now() + "-" + filename);
    const writeStream = fs.createWriteStream(saveTo);

    fileStream.pipe(writeStream);

    writeStream.on("close", () => {
        req.files.push({
          fieldname,
          originalname: filename,
          encoding,
          mimetype: mimeType,
          path: saveTo,
        });
      });
    });

    busboy.on("finish", () => {
      next();
    });

    busboy.on("error", (err) => {
      next(err);
    });

    req.pipe(busboy);
  };
}

module.exports = busboyUploadMiddleware;
