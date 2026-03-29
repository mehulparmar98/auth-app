// const express = require('express');
// const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = "mysecret";



const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

// module.exports = router;


// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be 6+ chars" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already existsss" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword
  });

  await user.save();

  res.json({ message: "User registered" });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign({ id: user._id }, "mysecret");

  res.json({ token });
});

module.exports = router;