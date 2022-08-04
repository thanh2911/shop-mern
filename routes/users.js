const express = require('express');
const router = express.Router();
const usersctrl = require('../controllers/usersCtrl');
const auth = require('../middleware/auth');

router.post('/register' , usersctrl.register);
router.post('/login' , usersctrl.login);
router.get('/logout' , usersctrl.logout);
router.get('/refresh_token', usersctrl.refreshToken);
router.get('/infor' ,auth, usersctrl.getUser);
router.patch('/addcart', auth, usersctrl.addCart);


module.exports = router ;