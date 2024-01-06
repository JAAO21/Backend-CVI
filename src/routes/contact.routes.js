const express = require('express');
const router = express.Router();

const contact = require('../controller/contact/conctact.controller.js');

router.post('/sendMessage', contact.SendMessageNodemailer);



module.exports = router;