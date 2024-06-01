const Router= require('express')();
const authenticate=require('../middleware/auth');
const path=require('path');
const multer= require('multer');
const uploadController=require('../controllers/uploadController');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log('MULTER-STORAGE-DESTINATION');
        callback(null, path.join(__dirname, "../","uploads/"));
        console.log('MULTER-STORAGE-DESTINATION-2');
    },
    filename: function (req, file, callback) {
        console.log('MULTER-STORAGE-FILENAME');
        callback(null,Date.now()+file.originalname);
        console.log('MULTER-STORAGE-FILENAME-2');
    },
  });

  const upload = multer({ storage: storage });
  

Router.post('/',authenticate,upload.single('imageupload'),uploadController);

module.exports= Router;