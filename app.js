const express = require("express");
const Session = require("express-session");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const app = express();
const axios = require("axios");
require("dotenv").config();

const gitClientID = process.env.GIT_CLIENT_ID;
const gitClientSecret = process.env.GIT_CLIENT_SECRET;
const gitReturnUrl = process.env.GIT_RETURN_URL;

const googleClientId = process.env.GA_CLIENT_ID;
const googleClientSecret = process.env.GA_CLIENT_SECRET;
const googleReturnUrl = process.env.GA_RETURN_URL;

const port = process.env.PORT || 3000;
const gitQuery = require("./queries/gitQuery");
const googleQuery = require("./queries/googleQuery");
var access_token = "";
var userCredentials = null;

function getAuthUrl() {
  var oauth2Client = new OAuth2(
    googleClientId,
    googleClientSecret,
    googleReturnUrl
  );
  var scopes = ["https://www.googleapis.com/auth/analytics.readonly"];
  var url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  return url;
}

app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("pages/index", {
    client_id: gitClientID,
    googleAuthUrl: getAuthUrl(),
  });
});
app.use(
  Session({
    secret: "secret-786576474",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/login/github/return", (req, res) => {
  const requestToken = req.query.code;
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${gitClientID}&client_secret=${gitClientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    access_token = response.data.access_token;
    res.redirect("/github-metrics");
  });
});

app.get("/github-metrics", (req, res) => {
  axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      Authorization: "token " + access_token,
    },
  }).then(async (data) => {
    await gitQuery.getTrafficViews(data, access_token);
    await gitQuery.getTrafficClones(data, access_token);
    await gitQuery.getStatsContributors(data, access_token);
    res.render("pages/metrics", { userData: data.data });
  });
});

app.get("/google-metrics", async (req, res) => {
  await googleQuery.getAverageSession(userCredentials);
  await googleQuery.getNewUsers(userCredentials);
  await googleQuery.getPageViews(userCredentials);
  await googleQuery.getPercentOfNewSessions(userCredentials);
  await googleQuery.getPageviewsPerSession(userCredentials);
  await googleQuery.getSessionsPerUser(userCredentials);
  await googleQuery.getUsersFilteredByCountyAndCity(userCredentials);
  await googleQuery.getSessionsBasedOnBrowserAndOperatingSystemProperties(
    userCredentials
  );

  res.send(`<html><body>
            <h3>Metrics</h3>
            </body>
            </html>
        `);
});

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

(async function () {
  while (true) {
    await sleep(4000);
    console.log("triggered");
  }
})();

app.use("/login/google/return", function (req, res) {
  var oauth2Client = new OAuth2(
    googleClientId,
    googleClientSecret,
    googleReturnUrl
  );
  var session = req.session;
  var code = req.query.code;
  oauth2Client.getToken(code, function (err, tokens) {
    console.log("tokens : ", tokens);
    if (!err) {
      oauth2Client.setCredentials(tokens);
      session["tokens"] = tokens;
      userCredentials = oauth2Client;
      console.log(userCredentials);
      res.send(`
                  <html>
                  <body>
                      <h3>Login successful!!</h3>
                      <a href="/google-metrics">Get metrics</a>
                  <body>
                  <html>
              `);
    } else {
      res.send(`
                  <html>
                  <body>
                      <h3>Login failed!!</h3>
                  </body>
                  </html>
              `);
    }
  });
});

app.listen(port, () => console.log("App listening on port " + port));
