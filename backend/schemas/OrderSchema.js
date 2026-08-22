const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  mode: String,
});

module.exports = mongoose.model("Order", OrderSchema);