const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, role });
    await user.save();
    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: 'Sai email hoặc mật khẩu' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Không tìm thấy email' });

    // mock OTP gửi về mail là 1111
    res.json({ message: 'OTP là 1111 (mock)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateProfile = async (req, res) => {
    try {
      const { fullName, phone, address } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { fullName, phone, address },
        { new: true, runValidators: true }
      ).select('-password');
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  exports.requireRole = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Không đủ quyền' });
      }
      next();
    };
  };
  
  
