const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  try {
    const { title, description, price, location, images } = req.body;
    const room = new Room({
      hostId: req.user.id,
      title,
      description,
      price,
      location,
      images
    });
    await room.save();
    res.status(201).json({ message: 'Đăng bài thành công. Chờ admin duyệt.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ hostId: req.user.id });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate(
      { _id: req.params.id, hostId: req.user.id },
      req.body,
      { new: true }
    );
    if (!room) return res.status(404).json({ error: 'Không tìm thấy phòng' });

    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ _id: req.params.id, hostId: req.user.id });
    if (!room) return res.status(404).json({ error: 'Không tìm thấy phòng' });

    res.json({ message: 'Xoá thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllApprovedRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ status: 'approved' });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchRooms = async (req, res) => {
  try {
    const { keyword, minPrice, maxPrice, location } = req.query;
    const query = { status: 'approved' };

    if (keyword) query.title = { $regex: keyword, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);

    const rooms = await Room.find(query);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.adminApproveRoom = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' hoặc 'rejected'
    const room = await Room.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!room) return res.status(404).json({ error: 'Không tìm thấy phòng' });

    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
