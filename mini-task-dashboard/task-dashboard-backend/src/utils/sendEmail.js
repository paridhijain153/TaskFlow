const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTPEmail(email, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "TaskFlow OTP Verification",
    html: `
      <h2>Your OTP</h2>
      <h1>${otp}</h1>
      <p>This OTP expires in 10 minutes.</p>
    `,
  });
}

module.exports = sendOTPEmail;