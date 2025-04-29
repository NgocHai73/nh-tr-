const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/forgot-password', authCtrl.forgotPassword);

// Profile
router.get('/profile', verifyToken, authCtrl.getProfile);
router.put('/profile', verifyToken, authCtrl.updateProfile);

module.exports = router;
