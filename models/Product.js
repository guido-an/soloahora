const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  picture: String,
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  preparationTime: Number,
  startRange: Number,
  endRange: Number
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
