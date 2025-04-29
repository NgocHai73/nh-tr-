const User = require('../models/User');
const Room = require('../models/Room');
const Support = require('../models/Support');
const { createNotification } = require('./notification.controller');

// [USER] Lấy danh sách tất cả user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [USER] Khóa hoặc mở khóa tài khoản
exports.lockUnlockUser = async (req, res) => {
  try {
    const { lock } = req.body; // lock: true/false
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Không tìm thấy user' });

    user.isLocked = lock;
    await user.save();

    await createNotification(user._id, 
      lock ? 'Tài khoản bị khóa' : 'Tài khoản được mở khóa', 
      lock ? 'Tài khoản của bạn đã bị khóa bởi quản trị viên.' : 'Tài khoản của bạn đã được mở khóa.');

    res.json({ message: lock ? 'Đã khóa tài khoản' : 'Đã mở khóa tài khoản', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
