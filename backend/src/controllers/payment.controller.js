const Payment = require('../models/Payment');
const Contract = require('../models/Contract');

exports.createPayment = async (req, res) => {
  try {
    const { contractId, dueDate } = req.body;
    const contract = await Contract.findById(contractId);
    if (!contract || contract.status !== 'signed') {
      return res.status(400).json({ error: 'Hợp đồng không hợp lệ hoặc chưa ký' });
    }

    const payment = new Payment({
      contractId,
      customerId: contract.customerId,
      amount: contract.price,
      dueDate
    });

    await payment.save();
    res.status(201).json({ message: 'Tạo khoản thanh toán thành công', payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ customerId: req.user.id })
      .populate('contractId');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchPayments = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { customerId: req.user.id };
    if (status) query.status = status;

    const payments = await Payment.find(query)
      .populate('contractId');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.payPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Không tìm thấy khoản thanh toán' });
    if (payment.customerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Không có quyền thanh toán khoản này' });
    }
    if (payment.status === 'paid') {
      return res.status(400).json({ error: 'Khoản này đã thanh toán' });
    }

    payment.status = 'paid';
    payment.paidAt = new Date();
    await payment.save();

    res.json({ message: 'Thanh toán thành công', payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
