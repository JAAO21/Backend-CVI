const express = require('express');
const router = express.Router();

const user = require('../controller/user/user.controller.js');

router.get('/', user.list);
router.get('/name', user.findNameUser);


module.exports = router;