const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); 

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/cart", require("./routes/cart"));

mongoose.connect("mongodb+srv://waoumahadi_db_user:Wiam2003@cluster0.1ksjtvn.mongodb.net/")
  .then(() => console.log("MongoDB OK"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});