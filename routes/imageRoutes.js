const express = require('express');
const multer = require('multer');
const router = express.Router();
const path=require('path');
const { nextTick } = require('process');
const imageControllers = require('../controllers/imageController');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var filename = file.originalname;
      var fileExtension = filename.split(".")[1];
      if(fileExtension=='mp4'){
        cb(null, 'videos')
      }else{
      cb(null, 'images')}
    },
    filename: function (req, file, cb) {
      var filename = file.originalname;
      var fileExtension = filename.split(".")[1];
      cb(null, Date.now() + "." + fileExtension);
    }
  }); 
 
  var upload = multer({storage: storage});

router.post('/addImages/:postId',upload.array('images',3),imageControllers.upploadImages);
router.get('/getImages/:postId',imageControllers.getImagesByPostId);



module.exports = router;