const express = require('express');
const users = require('./users');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);

app.use('/api/users', users);

// app.use(express.static(__dirname + '/public/'));
// app.get(/.*/, (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});