const Support = require('../models/Support');

exports.createSupport = async (req, res) => {
  try {
    const { subject, message } = req.body;

    const support = new Support({
      userId: req.user.id,
      subject,
      message
    });

    await support.save();
    res.status(201).json({ message: 'Gửi yêu cầu hỗ trợ thành công', support });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSupports = async (req, res) => {
  try {
    const supports = await Support.find()
      .populate('userId', 'fullName email role')
      .sort({ createdAt: -1 });
    res.json(supports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.replySupport = async (req, res) => {
  try {
    const { reply } = req.body;
    const support = await Support.findById(req.params.id);
    if (!support) return res.status(404).json({ error: 'Không tìm thấy yêu cầu hỗ trợ' });

    support.reply = reply;
    support.status = 'resolved';
    await support.save();

    res.json({ message: 'Phản hồi yêu cầu thành công', support });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
