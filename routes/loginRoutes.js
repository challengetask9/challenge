var express = require('express')
var router = express.Router()

const gitClientID = process.env.GIT_CLIENT_ID;
const gitClientSecret = process.env.GIT_CLIENT_SECRET;
const gitReturnUrl = process.env.GIT_RETURN_URL;

router.get('/', function (req, res) {
  res.send('Birds home page')
})

router.get("/github/return", (req, res) => {
  const requestToken = req.query.code;
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${gitClientID}&client_secret=${gitClientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    access_token = response.data.access_token;
    res.redirect("/metrics");
  });
});


module.exports = router