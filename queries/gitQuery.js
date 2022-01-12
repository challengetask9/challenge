const axios = require("axios");
const targetedProjectName = "challenge-test-website";

const getStatsContributors = async (response,access_token) => {
  axios({
    method: "get",
    url: `https://api.github.com/repos/${response.data.login}/${targetedProjectName}/stats/contributors`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
    },
  })
    .then((response) => {
      const max = response.data.reduce((prev, current) =>
        prev.total > current.total ? prev : current
      );
      const statsContributorsMetric = {
        date: new Date(),
        additionsNum: max.weeks[0].a,
        deletionsNum: max.weeks[0].d,
        totalComitsNum: max.weeks[0].c,
        author: max.author.login,
      };
      console.log(statsContributorsMetric);
    })
    .catch((err) => {});
};

const getTrafficViews = async (response,access_token) => {
  axios({
    method: "get",
    url: `https://api.github.com/repos/${response.data.login}/${targetedProjectName}/traffic/views`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
    },
  })
    .then((response) => {
      const viewsRepoMetric = {
        date: new Date(),
        viewsNum: response.data.count,
        uniqueViewsNum: response.data.uniques,
      };
      console.log(viewsRepoMetric);
    })
    .catch((err) => {});
};

const getTrafficClones = async (response,access_token) => {
  axios({
    method: "get",
    url: `https://api.github.com/repos/${response.data.login}/${targetedProjectName}/traffic/clones`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.mercy-preview+json",
    },
  })
    .then((response) => {
      const clonesRepoMetric = {
        date: new Date(),
        clonesNum: response.data.count,
        uniqueClonesNum: response.data.uniques,
      };
      console.log(clonesRepoMetric);
    })
    .catch((err) => {});
};

module.exports = {
  getTrafficViews,
  getTrafficClones,
  getStatsContributors,
};
