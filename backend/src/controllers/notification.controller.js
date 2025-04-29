const Notification = require('../models/Notification');

exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Không tìm thấy thông báo' });
    if (notification.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Không có quyền truy cập' });
    }

    notification.isRead = true;
    await notification.save();
    res.json({ message: 'Đã đánh dấu là đã đọc', notification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createNotification = async (userId, title, message) => {
  try {
    const noti = new Notification({
      userId,
      title,
      message
    });
    await noti.save();
  } catch (err) {
    console.error('Lỗi gửi thông báo:', err.message);
  }
};
