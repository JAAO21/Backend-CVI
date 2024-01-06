const express = require('express');
const router = express.Router();

const images = require('../controller/images/images.controller.js');

router.post('/upload', images.Upload);
router.post('/uploadImages', images.UploadImages);
router.get('/findKey', images.FindImagesKey);
router.get('/', images.AllImages);
router.delete('/:id', images.DeleteImagesID);
router.get('/:id', images.FindImagesID);


module.exports = router;