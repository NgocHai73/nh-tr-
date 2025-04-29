const express = require('express');
const router = express.Router();
const paymentCtrl = require('../controllers/payment.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

// Chỉ khách hàng mới có quyền
router.post('/', verifyToken, requireRole(['customer']), paymentCtrl.createPayment);
router.get('/', verifyToken, requireRole(['customer']), paymentCtrl.getMyPayments);
router.get('/search', verifyToken, requireRole(['customer']), paymentCtrl.searchPayments);
router.put('/:id/pay', verifyToken, requireRole(['customer']), paymentCtrl.payPayment);

module.exports = router;
