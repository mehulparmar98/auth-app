const jwt = require('jsonwebtoken');

const SECRET = "mysecret";

const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next(); // આગળ જવા દે
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;