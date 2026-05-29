const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOTPEmail(email, otp) {
  const result = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "TaskFlow OTP Verification",
    html: `
      <h2>Your OTP is:</h2>
      <h1>${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  });

  console.log("RESEND RESULT:", result);
}

module.exports = sendOTPEmail;