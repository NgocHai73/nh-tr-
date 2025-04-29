const express = require('express');
const router = express.Router();
const supportCtrl = require('../controllers/support.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

// Người dùng gửi yêu cầu hỗ trợ
router.post('/', verifyToken, supportCtrl.createSupport);

// Admin lấy danh sách yêu cầu hỗ trợ
router.get('/', verifyToken, requireRole(['admin']), supportCtrl.getAllSupports);

// Admin phản hồi yêu cầu hỗ trợ
router.put('/:id/reply', verifyToken, requireRole(['admin']), supportCtrl.replySupport);

module.exports = router;
