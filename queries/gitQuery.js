const axios = require("axios");
const targetedProjectName = "challenge-test-website";
const report = require("../models/report");

const createReport = (data, success) => {
  report.create(
    {
      serviceName: "Github",
      time: new Date(),
      metric: data,
      numKPI: 1,
      success: success,
    },
    (err, result) => {
      if (err) console.log(err);
      else console.log(result);
    }
  );
};

const getStatsContributors = async (response, access_token, databoxClient) => {
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
      const statsMetrics = [
        {
          key: "additionsToRepo",
          date: new Date(),
          value: max.weeks[0].a,
          attributes: {
            author: max.author.login,
          },
        },
        {
          key: "deletionsToRepo",
          date: new Date(),
          value: max.weeks[0].d,
          attributes: {
            author: max.author.login,
          },
        },
        {
          key: "totalCommitsToRepo",
          date: new Date(),
          value: max.weeks[0].c,
          attributes: {
            author: max.author.login,
          },
        },
      ];
      databoxClient.insertAll(statsMetrics, (res) => {
        if (res.status != "OK") createReport(statsMetrics, false);
        else createReport(statsMetrics, true);
      });
    })
    .catch((err) => {
    });
};

const getTrafficViews = async (response, access_token, databoxClient) => {
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
      const viewsRepoMetric = [
        {
          key: "viewsRepo",
          date: new Date(),
          value: response.data.count,
        },
        {
          key: "uniqueViewsRepo",
          date: new Date(),
          value: response.data.uniques,
        },
      ];
      databoxClient.insertAll(viewsRepoMetric, (res) => {
        if (res.status != "OK") createReport(viewsRepoMetric, false);
        else createReport(viewsRepoMetric, true);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getTrafficClones = async (response, access_token, databoxClient) => {
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
      const clonesRepoMetric = [
        {
          key: "clonesRepo",
          date: new Date(),
          value: response.data.count,
        },
        {
          key: "uniqueClonesRepo",
          date: new Date(),
          value: response.data.uniques,
        },
      ];
      databoxClient.insertAll(clonesRepoMetric, (res) => {
        if (res.status != "OK") createReport(clonesRepoMetric, false);
        else createReport(clonesRepoMetric, true);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getGitMetrics = async (data, databoxClient, git_access_token) => {
  await getTrafficViews(data, git_access_token, databoxClient);
  await getTrafficClones(data, git_access_token, databoxClient);
  await getStatsContributors(data, git_access_token, databoxClient);
};

module.exports = {
  getTrafficViews,
  getTrafficClones,
  getStatsContributors,
  getGitMetrics,
};
