const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey =
  process.env.BREVO_API_KEY;

const apiInstance =
  new SibApiV3Sdk.TransactionalEmailsApi();

async function sendOTPEmail(email, otp) {
  const result =
    await apiInstance.sendTransacEmail({
  sender: {
    email: "paridhijain153@gmail.com",
    name: "TaskFlow",
  },
  to: [
    {
      email,
    },
  ],
  subject: "TaskFlow OTP Verification",

  htmlContent: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">

    <h2 style="color:#6D28D9;">Welcome to TaskFlow 🚀</h2>

    <p>We're excited to have you on board.</p>

    <p>Use the verification code below to complete your registration:</p>

    <div style="
      background:#F3F4F6;
      padding:20px;
      text-align:center;
      border-radius:10px;
      margin:20px 0;
    ">
      <h1 style="
        margin:0;
        letter-spacing:8px;
        color:#6D28D9;
      ">
        ${otp}
      </h1>
    </div>

    <p>⏳ This code will expire in <strong>10 minutes</strong>.</p>

    <p>If you didn't create a TaskFlow account, please ignore this email.</p>

    <hr>

    <p style="color:#6B7280; font-size:14px;">
      This is an automated message from TaskFlow. Please do not reply to this email.
    </p>

    <p>
      Regards,<br>
      <strong>TaskFlow Team</strong>
    </p>

  </div>
  `,
});


  console.log("BREVO RESULT:", result);
}

module.exports = sendOTPEmail;