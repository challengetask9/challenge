const express = require('express')
const router = express.Router()
const axios = require("axios");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

const gitClientID = process.env.GIT_CLIENT_ID;
const gitClientSecret = process.env.GIT_CLIENT_SECRET;

const googleClientId = process.env.GA_CLIENT_ID;
const googleClientSecret = process.env.GA_CLIENT_SECRET;
const googleReturnUrl = process.env.GA_RETURN_URL;

const ytClientId = process.env.YT_CLIENT_ID;
const ytClientSecret = process.env.YT_CLIENT_SECRET;
const ytReturnUrl = process.env.YT_RETURN_URL;

router.get("/github/return", (req, res) => {
  const requestToken = req.query.code;
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${gitClientID}&client_secret=${gitClientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    req.session.git_access_token = response.data.access_token;
    res.redirect("/metrics/github-metrics");
  });
});

router.use("/google/return", function (req, res) {
  var oauth2Client = new OAuth2(
    googleClientId,
    googleClientSecret,
    googleReturnUrl
  );
  var code = req.query.code;
  oauth2Client.getToken(code, function (err, tokens) {
    if (!err) {
      oauth2Client.setCredentials(tokens);
      req.session.tokens = tokens;
      userCredentials = oauth2Client;
      res.redirect("/metrics/google-metrics");
    } else {
      res.render("pages/index");
    }
  });
});


router.use("/yt/return", function (req, res) {
  var oauth2Client = new OAuth2(
    ytClientId,
    ytClientSecret,
    ytReturnUrl
  );
  var code = req.query.code;
  oauth2Client.getToken(code, function (err, tokens) {
    if (!err) {
      oauth2Client.setCredentials(tokens);
      req.session.yt_tokens = tokens;
      userCredentials = oauth2Client;
      res.redirect("/metrics/yt-metrics");
    } else {
      res.render("pages/index");
    }
    console.log(err)
  });
});

module.exports = router