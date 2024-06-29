const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: String,
  trips: [
    {
      origin: String,
      destination: String,
      duration: String
    }
  ]
});

module.exports = User;