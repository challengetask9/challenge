const express = require("express");
const Session = require("express-session");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const axios = require("axios");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// including mongo database
const mongoose = require("mongoose");

// connecting to mongo db
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// checking if connection to db was successfull
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("Database connected");
});

// including routesFile
const login = require("./routes/loginRoutes");
const metrices = require("./routes/metricRoutes");

// generating authetication url for google analytics api
const googleGenerateAuthUrl = () => {
  return new OAuth2(
    process.env.GA_CLIENT_ID,
    process.env.GA_CLIENT_SECRET,
    process.env.GA_RETURN_URL
  ).generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/analytics.readonly"],
  });
};

const youtubeGenerateAuthUrl = () => {
  return new OAuth2(
    process.env.YT_CLIENT_ID,
    process.env.YT_CLIENT_SECRET,
    process.env.YT_RETURN_URL
  ).generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/yt-analytics.readonly"],
  });
};

// generating git authetication url
const gitGenerateAuthUrl = () => {
  return `https://github.com/login/oauth/authorize?client_id=${process.env.GIT_CLIENT_ID}&scope=repo`;
};

// enabling ejs for sending url to login button
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("pages/index", {
    gitAuthUrl: gitGenerateAuthUrl(),
    googleAuthUrl: googleGenerateAuthUrl(),
    ytAuthUrl: youtubeGenerateAuthUrl(),
  });
});

// adding session to app
app.use(
  Session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// creating routes for authetication and retrieve data from google and github api
app.use("/login", login);
app.use("/metrics", metrices);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// trigger
(async function () {
  while (true) {
    await sleep(15000);
    console.log("Trigger update for youtube")
    axios.get("http://localhost:3000/metrics/yt-updater");
  }
})();

//launching app
app.listen(port, () => console.log("App listening on port " + port));

module.exports = app;
