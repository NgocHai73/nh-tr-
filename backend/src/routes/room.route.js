const express = require('express');
const router = express.Router();
const roomCtrl = require('../controllers/room.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

// Host: CRUD phòng
router.post('/', verifyToken, requireRole(['host']), roomCtrl.createRoom);
router.get('/my-rooms', verifyToken, requireRole(['host']), roomCtrl.getMyRooms);
router.put('/:id', verifyToken, requireRole(['host']), roomCtrl.updateRoom);
router.delete('/:id', verifyToken, requireRole(['host']), roomCtrl.deleteRoom);

// Customer: Xem phòng, tìm kiếm
router.get('/', roomCtrl.getAllApprovedRooms);
router.get('/search', roomCtrl.searchRooms);

// Admin: Duyệt phòng
router.put('/:id/approve', verifyToken, requireRole(['admin']), roomCtrl.adminApproveRoom);

module.exports = router;
