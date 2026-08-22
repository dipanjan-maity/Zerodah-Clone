const mongoose = require("mongoose");

const HoldingSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  average: Number,
  price: Number,
  netValue: String,
  day: String,
  isLoss: Boolean,
});

module.exports = HoldingSchema;