import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

const otpStore = new Map();

// Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) console.error('SMTP Error:', error);
  else console.log('SMTP Ready!');
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const isOTPExpired = (expires) => Date.now() > expires;

// Send OTP
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    const otp = generateOTP();
    const expires = Date.now() + 5 * 60 * 1000;
    otpStore.set(email, { otp, expires });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP - Minor Project',
      html: `<h2>Your OTP: <strong style='font-size: 32px; letter-spacing: 5px;'>${otp}</strong></h2><p>Expires in 5 min</p>`,
    });

    console.log(`OTP sent to ${email}`);
    res.json({ success: true, message: 'OTP sent! Check email.' });
  } catch (error) {
    console.error('Send error:', error);
    res.status(500).json({ success: false, message: 'Send failed' });
  }
});

// Verify OTP
app.post('/api/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;
    const stored = otpStore.get(email);
    if (!stored || isOTPExpired(stored.expires) || stored.otp !== otp) {
      otpStore.delete(email);
      return res.status(400).json({ success: false, message: 'Invalid/expired OTP' });
    }
    otpStore.delete(email);
    res.json({ success: true, message: 'Verified!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Verify failed' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.listen(PORT, () => {
  console.log(`🚀 Backend on http://localhost:${PORT}`);
});
