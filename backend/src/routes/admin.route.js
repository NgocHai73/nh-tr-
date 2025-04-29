const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

// Chỉ ADMIN mới được vào
router.get('/users', verifyToken, requireRole(['admin']), adminCtrl.getAllUsers);
router.put('/users/:id/lock', verifyToken, requireRole(['admin']), adminCtrl.lockUnlockUser);

router.get('/rooms/pending', verifyToken, requireRole(['admin']), adminCtrl.getPendingRooms);
router.put('/rooms/:id/approve', verifyToken, requireRole(['admin']), adminCtrl.approveRoom);

module.exports = router;
