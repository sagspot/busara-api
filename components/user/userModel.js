import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Email exist'],
    dropDups: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: [true, 'Email exist'],
    dropDups: true,
    trim: true,
  },
  password1: { type: String, required: true, min: 6, max: 1024 },
  password2: { type: String, required: true, min: 6, max: 1024 },
  referral_code: { type: String },
  phone_number: { type: String, required: true },
  full_name: { type: String, required: true, trim: true },
  device_details: {
    device: { type: String, default: 'Dummy', trim: true },
  },
  location: { type: String, default: 'Dummy' },
});

export default mongoose.model('User', userSchema);
