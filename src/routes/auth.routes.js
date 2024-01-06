const express = require('express');
const router = express.Router();

const auth = require('../controller/auth/auth.controller.js');

router.post('/signUp', auth.SignUp);
router.post('/signIn', auth.SignIn);


module.exports = router;