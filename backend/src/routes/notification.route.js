const express = require('express');
const router = express.Router();
const notificationCtrl = require('../controllers/notification.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Lấy danh sách thông báo
router.get('/', verifyToken, notificationCtrl.getMyNotifications);

// Đánh dấu 1 thông báo là đã đọc
router.put('/:id/read', verifyToken, notificationCtrl.markAsRead);

module.exports = router;
