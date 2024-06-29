const express = require('express');
const users = require('./users');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/sbahn', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/users', users);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});