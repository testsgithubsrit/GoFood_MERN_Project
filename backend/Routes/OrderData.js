

const express = require("express");
const router = express.Router();
const Order = require("../modals/Orders");

router.post("/orderData", async (req, res) => {
  const { email, order_data, order_date } = req.body;

  // Validate required fields
  if (!email || !Array.isArray(order_data) || !order_date) {
    return res.status(400).json({ error: "Invalid or missing fields." });
  }

  // Prepare order data with order_date
  const orderEntry = { order_date, items: order_data };

  try {
    // Check if an order document exists for the email
    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // Create a new order document
      await Order.create({
        email,
        order_data: [orderEntry], // Wrap orderEntry in an array
      });
      return res.status(201).json({ success: true, message: "Order created successfully." });
    } else {
      // Update the existing document
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: orderEntry } }
      );
      return res.status(200).json({ success: true, message: "Order added successfully." });
    }
  } catch (error) {
    if (error.code === 11000) {
      // Explicit handling for duplicate key errors
      return res.status(409).json({ error: "Duplicate email. Document already exists." });
    }

    console.error("Error processing order:", error.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});


module.exports = router;
