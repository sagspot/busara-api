import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './userModel.js';

export const users_get_all = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const users_post_register = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).send('Email already exist');
  if (req.body.password1 !== req.body.password2)
    return res.status(400).json('Passwords do not match');

  const hash = await bcrypt.hashSync(req.body.password1, 10);

  const newUser = new User({
    username: req.body.email,
    email: req.body.email,
    full_name: req.body.name,
    password1: hash,
    password2: hash,
    referral_code: req.body.referralCode,
    phone_number: req.body.phoneNumber,
    device: req.body.device,
    location: req.body.location,
  });

  try {
    const savedUser = await newUser.save();

    const currentUser = {
      id: savedUser._id,
      name: savedUser.full_name,
      email: savedUser.email,
    };

    const token = jwt.sign(currentUser, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });

    res.status(201).json({ user: currentUser, token });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const users_post_login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Authentication failed');

  const validPassword = await bcrypt.compareSync(
    req.body.password,
    user.password1
  );

  if (!validPassword) return res.status(400).send('Authentication failed');

  try {
    const token = jwt.sign(
      { id: user._id, name: user.full_name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );
    res.status(200).json({ message: 'Authentication successful', token });
  } catch (err) {
    res.status(500).send(err);
  }
};
