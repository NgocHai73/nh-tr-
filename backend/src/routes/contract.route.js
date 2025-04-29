const express = require('express');
const router = express.Router();
const contractCtrl = require('../controllers/contract.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Khách thuê tạo hợp đồng
router.post('/', verifyToken, contractCtrl.createContract);

// Host và Khách xem hợp đồng
router.get('/', verifyToken, contractCtrl.getMyContracts);

// Xem chi tiết hợp đồng
router.get('/:id', verifyToken, contractCtrl.getContractById);

// Ký hợp đồng
router.put('/:id/sign', verifyToken, contractCtrl.signContract);

module.exports = router;
