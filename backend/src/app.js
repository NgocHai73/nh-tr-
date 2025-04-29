const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');

const app = express();
const roomRoutes = require('./routes/room.route');
const contractRoutes = require('./routes/contract.route');
const paymentRoutes = require('./routes/payment.route');
const supportRoutes = require('./routes/support.route');
const notificationRoutes = require('./routes/notification.route');
const adminRoutes = require('./routes/admin.route');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
