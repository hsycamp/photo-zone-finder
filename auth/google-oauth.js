const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT_URL
);

const scopes = [
  "https://www.googleapis.com/auth/plus.login",
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email"
];

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes
});

const getGooglePlusApi = auth => {
  return google.plus({ version: "v1", auth });
};

module.exports = {
  url,
  oauth2Client,
  getGooglePlusApi
};
