const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());

app.use('/protected', require('./routes/protected'));
app.use('/notes', require('./routes/notes'));
// DB connect
connectDB();

// Routes
app.use('/auth', require('./routes/auth'));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});