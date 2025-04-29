const Contract = require('../models/Contract');
const Room = require('../models/Room');

exports.createContract = async (req, res) => {
  try {
    const { roomId, startDate, endDate } = req.body;
    const room = await Room.findById(roomId);
    if (!room || room.status !== 'approved') {
      return res.status(400).json({ error: 'Phòng không hợp lệ hoặc chưa được duyệt' });
    }

    const contract = new Contract({
      customerId: req.user.id,
      hostId: room.hostId,
      roomId,
      startDate,
      endDate,
      price: room.price
    });

    await contract.save();
    res.status(201).json({ message: 'Tạo hợp đồng thành công', contract });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyContracts = async (req, res) => {
  try {
    const filter = req.user.role === 'host' 
      ? { hostId: req.user.id }
      : { customerId: req.user.id };

    const contracts = await Contract.find(filter)
      .populate('roomId', 'title location')
      .populate('customerId', 'fullName email')
      .populate('hostId', 'fullName email');

    res.json(contracts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('roomId', 'title location')
      .populate('customerId', 'fullName email')
      .populate('hostId', 'fullName email');

    if (!contract) return res.status(404).json({ error: 'Không tìm thấy hợp đồng' });

    res.json(contract);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ error: 'Không tìm thấy hợp đồng' });

    if (req.user.id == contract.customerId.toString()) {
      contract.customerSign = true;
    } else if (req.user.id == contract.hostId.toString()) {
      contract.hostSign = true;
    } else {
      return res.status(403).json({ error: 'Bạn không có quyền ký hợp đồng này' });
    }

    if (contract.customerSign && contract.hostSign) {
      contract.status = 'signed';
    }

    await contract.save();
    res.json({ message: 'Ký hợp đồng thành công', contract });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
