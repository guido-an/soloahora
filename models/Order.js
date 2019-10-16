const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Table = require('../models/Table');
const Product = require('../models/Product');

const orderSchema = new Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  status: String,
  takeway: Boolean,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
