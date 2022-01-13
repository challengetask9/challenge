const axios = require("axios");
const base = `https://www.googleapis.com/analytics/v3/data/ga?access_token=`;
const viewId = `&ids=ga%3A258121173`;
const report = require("../models/report");

// create local report with success or failure
const createReport = (data, success) => {
  report.create(
    {
      serviceName: "Google",
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

// average session duration
const getAverageSession = async (access_token, databoxClient) => {
  axios({
    method: "get",
    url: `${
      base + access_token + viewId
    }&metrics=ga%3AavgSessionDuration&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const averageSessionMetric = {
      key: "averageSession",
      value: response.data.totalsForAllResults["ga:avgSessionDuration"],
      attributes: {
        dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    };
    // console.log(averageSessionMetric);
    databoxClient.push(averageSessionMetric, (res) => {
      if (res.status != "OK") createReport(averageSessionMetric, false);
      else createReport(averageSessionMetric, true);
    });
  });
};

// new users
const getNewUsers = async (access_token, databoxClient) => {
  axios({
    method: "get",
    url: `${
      base + access_token + viewId
    }&metrics=ga%3AnewUsers&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const newUsersMetric = {
      key: "newUsers",
      value: response.data.totalsForAllResults["ga:newUsers"],
      attributes: {
        dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    };
    // console.log(newUsersMetric);
    databoxClient.push(newUsersMetric, (res) => {
      if (res.status != "OK") createReport(newUsersMetric, false);
      else createReport(newUsersMetric, true);
    });
  });
};

// pageviews
const getPageViews = async (access_token, databoxClient) => {
  axios({
    method: "get",
    url: `${
      base + access_token + viewId
    }&metrics=ga%3Apageviews&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const pageviewsMetric = {
      key: "pageviews",
      value: response.data.totalsForAllResults["ga:pageviews"],
      attributes: {
        dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    };
    // console.log(pageviewsMetric);
    databoxClient.push(pageviewsMetric, (res) => {
      if (res.status != 'OK') createReport(pageviewsMetric, false);
      else createReport(pageviewsMetric, true);
    });
  });
};

// percent new sessions
const getPercentOfNewSessions = async (access_token, databoxClient) => {
  axios({
    method: "get",
    url: `${
      base + access_token + viewId
    }&metrics=ga%3ApercentNewSessions&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const percentageOfNewSessionsMetric = {
      key: "percentNewSessions",
      value: response.data.totalsForAllResults["ga:percentNewSessions"],
      attributes: {
        dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    };
    //  console.log(percentageOfNewSessionsMetric);
    databoxClient.push(percentageOfNewSessionsMetric, (res) => {
      if (res.status != 'OK') createReport(percentageOfNewSessionsMetric, false);
      else createReport(percentageOfNewSessionsMetric, true);
    });
  });
};

// pageviews per sessions
const getPageviewsPerSession = async (access_token, databoxClient) => {
  axios({
    method: "get",
    url: `${
      base + access_token + viewId
    }&metrics=ga%3ApageviewsPerSession&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const pagebviewsPerSessionMetric = {
      key: "pageviewsPerSession",
      value: response.data.totalsForAllResults["ga:pageviewsPerSession"],
      attributes: {
        dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    };
    //  console.log(pagebviewsPerSessionMetric);
    databoxClient.push(pagebviewsPerSessionMetric, (res) => {
      if (res.status != 'OK') createReport(pagebviewsPerSessionMetric, false);
      else createReport(pagebviewsPerSessionMetric, true);
    });
  });
};

//session per user
const getSessionsPerUser = async (access_token, databoxClient) => {
  axios({
    method: "get",
    url: `${
      base + access_token + viewId
    }&metrics=ga%3AsessionsPerUser&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const sessionsPerUserMetric = {
      key: "sessionsPerUser",
      value: response.data.totalsForAllResults["ga:sessionsPerUser"],
      attributes: {
        dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    };
    // console.log(sessionsPerUserMetric);
    databoxClient.push(sessionsPerUserMetric, (res) => {
      if (res.status != 'OK') createReport(sessionsPerUserMetric, false);
      else createReport(sessionsPerUserMetric, true);
    });
  });
};

// users from country and city
const getUsersFilteredByCountyAndCity = async (access_token, databoxClient) => {
  axios({
    method: "get",
    url: `${
      base + access_token + viewId
    }&dimensions=ga%3Acountry%2Cga%3Acity&metrics=ga%3Ausers&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const filteredUsersByCountryMetric = {
      key: "usersLocations",
      value: response.data.totalsForAllResults["ga:users"],
      attributes: {
        dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        locations: response.data.rows,
      },
    };
    //  console.log(filteredUsersByCountryMetric);
    databoxClient.push(filteredUsersByCountryMetric, (res) => {
      if (res.status != 'OK') createReport(filteredUsersByCountryMetric, false);
      else createReport(filteredUsersByCountryMetric, true);
    });
  });
};

// sessions based on browser and OS settings
const getSessionsBasedOnBrowserAndOperatingSystemProperties = async (
  access_token,
  databoxClient
) => {
  axios({
    method: "get",
    url: `${
      base + access_token + viewId
    }&dimensions=ga%3Abrowser%2Cga%3AbrowserVersion%2Cga%3AoperatingSystem%2Cga%3AbrowserSize&metrics=ga%3Asessions&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const filteredSessionsByBrowserAndOSMetric = {
      key: "sessionBrowsers",
      value: response.data.totalsForAllResults["ga:sessions"],
      attributes: {
        dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        properties: response.data.rows,
      },
    };
    // console.log(filteredSessionsByBrowserAndOSMetric);
    databoxClient.push(filteredSessionsByBrowserAndOSMetric, (res) => {
      if (res.status != 'OK') createReport(filteredSessionsByBrowserAndOSMetric, false);
      else createReport(filteredSessionsByBrowserAndOSMetric, true);
    });
  });
};

// extracting metrices from api and pushing them into databox
const getGoogleMetrices = async (google_access_token, databoxClient) => {
  await getAverageSession(google_access_token, databoxClient);
  await getNewUsers(google_access_token, databoxClient);
  await getPageViews(google_access_token, databoxClient);
  await getPercentOfNewSessions(google_access_token, databoxClient);
  await getPageviewsPerSession(google_access_token, databoxClient);
  await getSessionsPerUser(google_access_token, databoxClient);
  await getUsersFilteredByCountyAndCity(google_access_token, databoxClient);
  await getSessionsBasedOnBrowserAndOperatingSystemProperties(
    google_access_token,
    databoxClient
  );
};

module.exports = {
  getAverageSession,
  getNewUsers,
  getPageViews,
  getPageviewsPerSession,
  getPercentOfNewSessions,
  getSessionsBasedOnBrowserAndOperatingSystemProperties,
  getSessionsPerUser,
  getUsersFilteredByCountyAndCity,
  getGoogleMetrices,
};
