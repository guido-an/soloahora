const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tableSchema = new Schema({
  name: String,
});


const Table = mongoose.model('Table', tableSchema);
module.exports = Table;
