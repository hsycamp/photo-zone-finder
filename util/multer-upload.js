const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "photo-zone-finder",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      console.log(file);
      cb(null, new Date().valueOf() + file.originalname);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;
