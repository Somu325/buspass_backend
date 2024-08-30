import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
// import OTP from '../db/models/Otpmodel'; // Adjust the import path based on your project structure
import User from '../models/user.js';   // Adjust the import path based on your project structure

dotenv.config();

const OTPRouter = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const APP_ID = process.env.APP_ID;
const service_id = 1;

if (!CLIENT_ID || !CLIENT_SECRET || !APP_ID) {
  throw new Error('CLIENT_ID, CLIENT_SECRET, or APP_ID is not defined in environment variables');
}

// Generate and send OTP
OTPRouter.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // Sanitize and validate phone number
  const sanitizedPhone = phone.replace(/\D/g, '');
  if (sanitizedPhone.length < 10 || sanitizedPhone.length > 15) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }

  try {
    const response = await axios.post('https://auth.otpless.app/auth/otp/v1/send', {
      phoneNumber: sanitizedPhone,
      otpLength: 4,
      channel: 'WHATSAPP',
      expiry: 600
    }, {
      headers: {
        'Content-Type': 'application/json',
        'clientId': CLIENT_ID,
        'clientSecret': CLIENT_SECRET,
        'appId': APP_ID
      }
    });

    console.log('OTP send response:', response.data);

    if (response.data.orderId) {
      res.json({ message: 'OTP sent successfully', orderId: response.data.orderId });
    } else {
      throw new Error(`Failed to send OTP: ${response.data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error sending OTP:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: `Failed to send OTP: ${error.response?.data?.message || error.message}`
    });
  }
});

// Verify OTP
OTPRouter.post('/verify-otp', async (req, res) => {
  const { phone, otp, orderId } = req.body;

  if (!phone || !otp || !orderId) {
    return res.status(400).json({ error: 'Phone number, OTP, and orderId are required' });
  }

  // Sanitize and validate phone number
  const sanitizedPhone = phone.replace(/\D/g, '');
  if (sanitizedPhone.length < 10 || sanitizedPhone.length > 15) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }

  try {
    const response = await axios.post('https://auth.otpless.app/auth/otp/v1/verify', {
      phoneNumber: sanitizedPhone,
      otp,
      orderId
    }, {
      headers: {
        'Content-Type': 'application/json',
        'clientId': CLIENT_ID,
        'clientSecret': CLIENT_SECRET,
        'appId': APP_ID
      }
    });

    console.log('OTP verify response:', response.data);

    if (response.data.isOTPVerified) {
      // Check if user already exists
      let user = await User.findOne({ where: { phone: sanitizedPhone } });

      if (!user) {
        // Create a new user if not found
        user = await User.create({ phone: sanitizedPhone, service_id });

        console.log('New User Created:', user);
        res.json({ message: 'OTP Verified and user signed up successfully!', user });
      } else {
        res.json({ message: 'OTP Verified Successfully!', user });
      }
    } else {
      res.status(400).json({ error: 'Invalid OTP or phone number' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: `Failed to verify OTP: ${error.response?.data?.message || error.message}`
    });
  }
});

export default OTPRouter;
