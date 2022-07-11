const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

function transporter() {
  const ACCESS_TOKEN = oAuth2Client.getAccessToken();
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "myerscasper73@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
  });
}

function sendWelcome(email, name) {
  const transport = transporter();
  transport.sendMail({
    from: "myerscasper73@gmail.com",
    to: email,
    subject: "Welcome to the app",
    text: `Welcome to the app, ${name}. Let me know how you liek it`,
  });
}

function sendCancel(email, name) {
  const transport = transporter();
  transport.sendMail({
    from: "myerscasper73@gmail.com",
    to: email,
    subject: "We hope you enjoyed",
    text: `Sorry to see you leave, ${name}. Thank your for using our app`,
  });
}

module.exports = {
  sendWelcome,
  sendCancel,
};
