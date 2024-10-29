const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
require('.env').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql@123',
  database: 'ecommerce'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    throw err;
  }
  console.log('MySQL connected');
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // For testing; remove in production
  }
});

// Signup Route
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const verificationToken = crypto.randomBytes(20).toString('hex');

  const user = { username, email, password, verificationToken, isVerified: false };

  const sql = 'INSERT INTO users SET ?';

  db.query(sql, user, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Server error');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the link: http://localhost:${PORT}/verify/${verificationToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error); // Log detailed error
        return res.status(500).send('Failed to send verification email');
      }

      console.log('Email sent: ' + info.response);
      res.status(200).send('Verification email sent');
    });
  });
});

// Email Verification Route
app.get('/verify/:token', (req, res) => {
  const { token } = req.params;

  const sql = 'UPDATE users SET isVerified = TRUE WHERE verificationToken = ?';

  db.query(sql, [token], (err, result) => {
    if (err) {
      console.error('Error verifying email:', err);
      return res.status(500).send('Server error');
    }

    if (result.affectedRows === 0) {
      return res.status(400).send('Invalid token');
    }

    res.send('Email verified successfully!');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
