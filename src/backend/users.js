const express = require('express');
const User = require('./userModel');
const router = express.Router();

// get all users
router.get('/', async (req, res) => {
  console.log('getting all users');
  const users = await User.find();
  res.send(users);
});

// get a user by name
router.get('/:name', async (req, res) => {
  console.log('getting user', req.params.name);
  const { name } = req.params;
  const user = await User.findOne({ name });
  console.log('user found', user);
  res.send(user);
});

// create a new user
router.post('/', async (req, res) => {
  console.log('creating user', req.body);
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

// add a trip to a user
router.post('/:name', async (req, res) => {
  console.log('adding trip to user', req.params.name, req.body);
  const { name } = req.params;
  const user = await User.findOne({ name });
  user.trips.unshift(req.body);
  await user.save();
  res.send(user);
});

module.exports = router;