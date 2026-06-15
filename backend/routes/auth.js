const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// 🔥 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "Utilisateur créé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    res.json({
      message: "Login OK",
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
