const nodemailer = require('nodemailer');
const router = require('express').Router();
require('dotenv').config(); // Load environment variables from .env file

router.post('/register', async (req, res) => {
  const { recipientEmail, subject, message, message2 } = req.body;

  // Create a transporter using the environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address from .env
      pass: process.env.EMAIL_PASS, // Your Gmail password from .env
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use the email from environment
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  const mailOptionsToSender = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Email to yourself
    subject: "Order Received",
    text: `${message2}`,
  };

  try {
    // Send the email to the recipient
    await transporter.sendMail(mailOptions);

    // Send the confirmation email to yourself
    await transporter.sendMail(mailOptionsToSender);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error });
  }
});

module.exports = router;
