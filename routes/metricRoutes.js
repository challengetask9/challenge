const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

var Databox = require("databox");
var databoxClient = new Databox({
  push_token: process.env.DATABOX_TOKEN,
});

const gitQuery = require("../queries/gitQuery");
const googleQuery = require("../queries/googleQuery");
const ytQuery = require("../queries/ytQuery");
var ytActiveAccount = null;

router.get("/github-metrics", (req, res) => {
    axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: {
        Authorization: "token " + req.session.git_access_token,
      },
    }).then(async (data) => {
      gitQuery.getGitMetrics(data, databoxClient, req.session.git_access_token);
      res.render("pages/metrics", { userData: data.data });
    }).catch((err)=>{
      res.json(err)
    });
});

router.get("/google-metrics", async (req, res) => {
  try {
    googleQuery.getGoogleMetrices(
      req.session.tokens.access_token,
      databoxClient
    );
    res.render("pages/metrics");
  } catch (error) {
    res.json(error);
  }
});

router.get("/yt-metrics", async (req, res) => {
  try {
    ytActiveAccount = req.session.yt_tokens.access_token;
    await ytQuery.getYtMetrics(
      databoxClient,
      req.session.yt_tokens.access_token
    );
    res.render("pages/metrics");
  } catch (error) {
    res.json(error);
  }
});

router.get("/yt-updater", async (req, res) => {
  if (ytActiveAccount != null)
    await ytQuery.getYtMetrics(databoxClient, ytActiveAccount);
});

module.exports = router;
