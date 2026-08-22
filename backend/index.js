require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const HoldingModel = require("./model/HoldingModel");
const PositionsModel = require("./model/PositionsModel");
const { OrderModel } = require("./model/OrderModel");
const { UserModel } = require("./model/UserModel");

const app = express();

const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend server is running successfully!");
});

// Get all holdings
app.get("/allHoldings", async (req, res) => {
  try {
    const holdings = await HoldingModel.find();

    const formattedHoldings = holdings.map((stock) => ({
      name: stock.name,
      qty: stock.quantity,
      avg: stock.average,
      price: stock.price,
      net: stock.netValue,
      day: stock.day,
      isLoss: stock.isLoss,
    }));

    res.json(formattedHoldings);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Get all positions
app.get("/allPositions", async (req, res) => {
  try {
    const positions = await PositionsModel.find();

    res.json(positions);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Create new BUY / SELL order
app.post("/neworder", async (req, res) => {
  try {
    console.log("Received order:", req.body);

    const newOrder = new OrderModel({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      mode: req.body.mode,
    });

    const savedOrder = await newOrder.save();

    console.log("Order saved:", savedOrder);

    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      order: savedOrder,
    });
  } catch (err) {
    console.error("Order Error:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Register new user
app.post("/register", async (req, res) => {
  try {
    console.log("Registration data:", req.body);

    const { name, email, mobile, password } = req.body;

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email already registered",
      });
    }

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      mobile,
      password,
    });

    // Save user
    const savedUser = await newUser.save();

    console.log("User saved:", savedUser);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (err) {
    console.error("Registration Error:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Start server
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
}

start();