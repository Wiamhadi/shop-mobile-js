const router = require("express").Router();
const Cart = require("../models/Cart");

// GET CART
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart);
});

// ADD
router.post("/add", async (req, res) => {
  const { userId, product } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ productId: product.id, qty: 1 }],
    });
  } else {
    const item = cart.items.find(i => i.productId === product.id);

    if (item) item.qty += 1;
    else cart.items.push({ productId: product.id, qty: 1 });
  }

  await cart.save();
  res.json(cart);
});

// UPDATE QTY
router.post("/update", async (req, res) => {
  const { userId, productId, type } = req.body;

  const cart = await Cart.findOne({ userId });

  const item = cart.items.find(i => i.productId === productId);

  if (type === "inc") item.qty++;
  if (type === "dec") item.qty--;

  cart.items = cart.items.filter(i => i.qty > 0);

  await cart.save();
  res.json(cart);
});

// REMOVE
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });

  cart.items = cart.items.filter(i => i.productId !== productId);

  await cart.save();
  res.json(cart);
});

module.exports = router;