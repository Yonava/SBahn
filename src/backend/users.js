const express = require('express');
const User = require('./userModel');
const router = express.Router();

// get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// get a user by name
router.get('/:name', async (req, res) => {
  const { name } = req.params;
  const user = await User.findOne({ name });
  res.send(user);
});

// create a new user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

// add a trip to a user
router.post('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  user.trips.push(req.body);
  await user.save();
  res.send(user);
});

module.exports = router;