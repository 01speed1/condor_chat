const express = require("express");
const multer = require("multer");

const router = express.Router();

const { storage } = require("../../config/multerUploader");
const { saveUserImage } = require("./imageUploader.service");

const upload = multer({ storage: storage });

router.get("/", (request, response) => {
  response.send("image uploader controller");
});

router.post(
"/",
  upload.single("image"),
  ({file, body: { userID }}, response) => {

    saveUserImage({file, userID})
      .then(({ imagePath }) => response.status(200).json({ valid: true, imagePath }) )
      .catch(errors => response.status(400).json({ valid: false, errors }))
  }
);

module.exports = router;
