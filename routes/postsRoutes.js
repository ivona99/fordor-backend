const express = require('express');
const multer = require('multer');
const router = express.Router();
const path=require('path');
const postControllers = require('../controllers/postsController');
//const storage = multer.memoryStorage();
//const upload = multer({ storage: storage});
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
 

router.get('/getPosts',postControllers.getPosts);
router.post('/addPost',upload.single('image'),postControllers.createPost);
router.post('/increse/:id',postControllers.increseSeen);
router.get('/getPost/:id',postControllers.getPostById);
router.put('/odobri/:id',postControllers.odobri);
router.delete('/deletePost/:id',postControllers.deletePost);
router.get('/getMostViewed',postControllers.getMostViewd);
router.get('/getKategories/:vrsta',postControllers.getPostsByVrsta);
router.get('/getKategoriesVrsta/:kategorija',postControllers.getPostsByKategorija);
router.get('/getKategoriesAndVrsta/:kategorija/:vrsta',postControllers.getPostsByKategorija);
module.exports = router;

