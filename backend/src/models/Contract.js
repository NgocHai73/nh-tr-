const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'signed'], default: 'pending' },
  customerSign: { type: Boolean, default: false },
  hostSign: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);
