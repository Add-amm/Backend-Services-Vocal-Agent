import express from 'express';
import { sendEmail } from './mailer.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    await sendEmail({ to, subject, html });
    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;