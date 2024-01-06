const express = require('express');
const router = express.Router();

const seller = require('../controller/seller/seller.controller.js');

router.post('/', seller.create);
router.put('/updateStateSellers', seller.updateStateSellers);
router.get('/', seller.findNumberIdentificationSeller);
router.get('/allSellers', seller.allSellers);
router.put('/:id', seller.updateSellers);

module.exports = router;