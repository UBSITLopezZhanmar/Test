require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, () => console.log("Server running"));

const Order = mongoose.model('orders', {
  name: String,
  price: Number,
  quantity: Number
});

// GET
app.get('/api/orders', async(req,res)=>{
  res.send(await Order.find());
});

// POST
app.post('/api/orders', async(req,res)=>{
  const order = new Order(req.body);
  await order.save();
  res.send(order);
});