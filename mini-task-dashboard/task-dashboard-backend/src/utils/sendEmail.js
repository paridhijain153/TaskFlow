const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTPEmail(email, otp) {
  console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
  console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
  console.log("Trying to send email to:", email);

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "TaskFlow OTP Verification",
    html: `
      <h2>Your OTP is:</h2>
      <h1>${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  });

  console.log("Email sent:", info.messageId);
}

module.exports = sendOTPEmail;