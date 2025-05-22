// OrderData.js - Express route for handling order data
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Order Schema (MongoDB Model)
const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  order_data: [
    {
      name: String,
      qty: Number,
      size: String,
      price: Number,
    },
  ],
  order_date: {
    type: String,
    required: true,
  },
  delivery_address: {
    type: String,
    required: true,
  },
});

// Create an Order Model
const Order = mongoose.model('Order', OrderSchema);

// POST route to save order data
router.post('/orderData', async (req, res) => {
  const { order_data, email, order_date, delivery_address } = req.body;

  // Validate input data
  if (!email || !order_data || !order_date || !delivery_address) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Create a new order entry
    const newOrder = new Order({
      email,
      order_data,
      order_date,
      delivery_address,
    });

    // Save the order to the database
    await newOrder.save();
    res.status(200).json({ message: 'Order successfully placed.' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing the order. Please try again.' });
  }
});

// Export the router for use in the main server file
module.exports = router;
