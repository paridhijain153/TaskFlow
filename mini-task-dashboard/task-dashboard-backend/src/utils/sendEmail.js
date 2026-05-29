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
        <h2>Your OTP is:</h2>
        <h1>${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    });

  console.log("BREVO RESULT:", result);
}

module.exports = sendOTPEmail;