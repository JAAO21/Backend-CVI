const express = require('express');
const router = express.Router();

const menu = require('../controller/menu/menu.controller.js');

router.get('/', menu.Menu);

module.exports = router;