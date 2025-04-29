const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  reply: { type: String },
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Support', supportSchema);
