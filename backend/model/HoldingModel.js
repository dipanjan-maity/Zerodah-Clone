const mongoose = require("mongoose");
const HoldingSchema = require("../schemas/HoldingSchema");

const HoldingModel = mongoose.model("Holding", HoldingSchema);

module.exports = HoldingModel;