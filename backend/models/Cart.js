const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: String,
      qty: Number,
    }
  ]
});

module.exports = mongoose.model("Cart", CartSchema);