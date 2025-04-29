const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // 'Bearer token_here'
  if (!token) return res.status(401).json({ error: 'Không có token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu user info vào req.user
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token không hợp lệ' });
  }
};
