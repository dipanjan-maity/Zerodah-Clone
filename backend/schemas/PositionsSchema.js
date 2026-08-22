const mongoose = require("mongoose");

const PositionsSchema = new mongoose.Schema({
  product: String,
  name: String,
  quantity: Number,
  average: Number,
  price: Number,
  netValue: String,
  day: String,
  isLoss: Boolean,
});

module.exports = PositionsSchema;