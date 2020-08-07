const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../',"public/uploads/"),
  filename: (_, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
})
module.exports = { storage }