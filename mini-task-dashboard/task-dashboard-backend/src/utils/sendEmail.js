const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

async function sendOTPEmail(email, otp) {
  const info = await transporter.sendMail({
    from: '"TaskFlow" <paridhijain153@gmail.com>',
    to: email,
    subject: "TaskFlow OTP Verification",
    html: `
      <h2>Your OTP is:</h2>
      <h1>${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  });

  console.log("EMAIL SENT:", info.messageId);
}

module.exports = sendOTPEmail;