// [ROOM] Lấy danh sách các phòng cần duyệt
exports.getPendingRooms = async (req, res) => {
    try {
      const rooms = await Room.find({ status: 'pending' }).populate('hostId', 'fullName email');
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // [ROOM] Duyệt hoặc từ chối phòng
  exports.approveRoom = async (req, res) => {
    try {
      const { approve } = req.body; // approve: true/false
      const room = await Room.findById(req.params.id);
      if (!room) return res.status(404).json({ error: 'Không tìm thấy phòng' });
  
      room.status = approve ? 'approved' : 'rejected';
      await room.save();
  
      await createNotification(room.hostId, 
        approve ? 'Phòng của bạn đã được duyệt' : 'Phòng của bạn bị từ chối',
        approve ? 'Phòng bạn đăng đã được admin phê duyệt.' : 'Phòng bạn đăng đã bị admin từ chối.');
  
      res.json({ message: approve ? 'Đã duyệt phòng' : 'Đã từ chối phòng', room });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  