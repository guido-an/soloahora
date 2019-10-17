const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tableSchema = new Schema({
  name: {type: String, required: true}
});


const Table = mongoose.model('Table', tableSchema);
module.exports = Table;
