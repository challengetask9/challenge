const axios = require("axios");

// average session duration
/*https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.A0ARrdaM859Vfbhyuzk2WZmfIVTc6M4IOIBejy0E2_3io4vayTELVJpId1aUCdNvGD3KPHuaOUPvV7W8YLZatvIPsOnk-N3wgVQJnl3lWucfPciNX2oAalYTD_dIOh2YItsCrhtyyMg3nAAq24faXJJpXQXwP1&ids=ga%3A258121173&metrics=ga%3AavgSessionDuration&start-date=7daysAgo&end-date=today*/
const getAverageSession = async (userCredentials) => {
  axios({
    method: "get",
    url: `https://www.googleapis.com/analytics/v3/data/ga?access_token=${userCredentials.credentials.access_token}&ids=ga%3A258121173&metrics=ga%3AavgSessionDuration&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const averageSessionMetric = {
      dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(),
      averageSessionDuration:
        response.data.totalsForAllResults["ga:avgSessionDuration"],
    };
    console.log(averageSessionMetric);
  });
};

// new users
/* https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.A0ARrdaM859Vfbhyuzk2WZmfIVTc6M4IOIBejy0E2_3io4vayTELVJpId1aUCdNvGD3KPHuaOUPvV7W8YLZatvIPsOnk-N3wgVQJnl3lWucfPciNX2oAalYTD_dIOh2YItsCrhtyyMg3nAAq24faXJJpXQXwP1&ids=ga%3A258121173&metrics=ga%3AnewUsers&start-date=7daysAgo&end-date=today */
const getNewUsers = async (userCredentials) => {
  axios({
    method: "get",
    url: `https://www.googleapis.com/analytics/v3/data/ga?access_token=${userCredentials.credentials.access_token}&ids=ga%3A258121173&metrics=ga%3AnewUsers&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const newUsersMetric = {
      dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(),
      newUsers: response.data.totalsForAllResults["ga:newUsers"],
    };
    console.log(newUsersMetric);
  });
};

// pageviews
//https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.A0ARrdaM859Vfbhyuzk2WZmfIVTc6M4IOIBejy0E2_3io4vayTELVJpId1aUCdNvGD3KPHuaOUPvV7W8YLZatvIPsOnk-N3wgVQJnl3lWucfPciNX2oAalYTD_dIOh2YItsCrhtyyMg3nAAq24faXJJpXQXwP1&ids=ga%3A258121173&metrics=ga%3Apageviews&start-date=7daysAgo&end-date=today

const getPageViews = async(userCredentials) => {
  axios({
    method: "get",
    url: `https://www.googleapis.com/analytics/v3/data/ga?access_token=${userCredentials.credentials.access_token}&ids=ga%3A258121173&metrics=ga%3Apageviews&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const pageviewsMetric = {
      dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(),
      pageviews: response.data.totalsForAllResults["ga:pageviews"],
    };
    console.log(pageviewsMetric);
  });
};

// percent new sessions
//https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.A0ARrdaM859Vfbhyuzk2WZmfIVTc6M4IOIBejy0E2_3io4vayTELVJpId1aUCdNvGD3KPHuaOUPvV7W8YLZatvIPsOnk-N3wgVQJnl3lWucfPciNX2oAalYTD_dIOh2YItsCrhtyyMg3nAAq24faXJJpXQXwP1&ids=ga%3A258121173&metrics=ga%3ApercentNewSessions&start-date=7daysAgo&end-date=today
const getPercentOfNewSessions = async(userCredentials) => {
  axios({
    method: "get",
    url: `https://www.googleapis.com/analytics/v3/data/ga?access_token=${userCredentials.credentials.access_token}&ids=ga%3A258121173&metrics=ga%3ApercentNewSessions&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const percentageOfNewSessionsMetric = {
      dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(),
      percentage: response.data.totalsForAllResults["ga:percentNewSessions"],
    };
    console.log(percentageOfNewSessionsMetric);
  });
};

// pageviews per sessions
//www.googleapis.com/analytics/v3/data/ga?access_token=ya29.A0ARrdaM859Vfbhyuzk2WZmfIVTc6M4IOIBejy0E2_3io4vayTELVJpId1aUCdNvGD3KPHuaOUPvV7W8YLZatvIPsOnk-N3wgVQJnl3lWucfPciNX2oAalYTD_dIOh2YItsCrhtyyMg3nAAq24faXJJpXQXwP1&ids=ga%3A258121173&metrics=ga%3ApageviewsPerSession&start-date=7daysAgo&end-date=today

const getPageviewsPerSession = async (userCredentials) => {
  axios({
    method: "get",
    url: `https://www.googleapis.com/analytics/v3/data/ga?access_token=${userCredentials.credentials.access_token}&ids=ga%3A258121173&metrics=ga%3ApageviewsPerSession&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const pagebviewsPerSessionMetric = {
      dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(),
      pageviewsPerSession:
        response.data.totalsForAllResults["ga:pageviewsPerSession"],
    };
    console.log(pagebviewsPerSessionMetric);
  });
};

//session per user
// https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.A0ARrdaM859Vfbhyuzk2WZmfIVTc6M4IOIBejy0E2_3io4vayTELVJpId1aUCdNvGD3KPHuaOUPvV7W8YLZatvIPsOnk-N3wgVQJnl3lWucfPciNX2oAalYTD_dIOh2YItsCrhtyyMg3nAAq24faXJJpXQXwP1&ids=ga%3A258121173&metrics=ga%3AsessionsPerUser&start-date=7daysAgo&end-date=today
const getSessionsPerUser = async (userCredentials) => {
  axios({
    method: "get",
    url: `https://www.googleapis.com/analytics/v3/data/ga?access_token=${userCredentials.credentials.access_token}&ids=ga%3A258121173&metrics=ga%3AsessionsPerUser&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const sessionsPerUserMetric = {
      dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(),
      sessionsPerUser: response.data.totalsForAllResults["ga:sessionsPerUser"],
    };
    console.log(sessionsPerUserMetric);
  });
};

// users from country and city
// https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.A0ARrdaM859Vfbhyuzk2WZmfIVTc6M4IOIBejy0E2_3io4vayTELVJpId1aUCdNvGD3KPHuaOUPvV7W8YLZatvIPsOnk-N3wgVQJnl3lWucfPciNX2oAalYTD_dIOh2YItsCrhtyyMg3nAAq24faXJJpXQXwP1&ids=ga%3A258121173&dimensions=ga%3Acountry%2Cga%3Acity&metrics=ga%3Ausers&start-date=7daysAgo&end-date=today
const getUsersFilteredByCountyAndCity = async (userCredentials) => {
  axios({
    method: "get",
    url: `https://www.googleapis.com/analytics/v3/data/ga?access_token=${userCredentials.credentials.access_token}&ids=ga%3A258121173&dimensions=ga%3Acountry%2Cga%3Acity&metrics=ga%3Ausers&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const filteredUsersByCountryMetric = {
      dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(),
      numUsers: response.data.totalsForAllResults["ga:users"],
      data: response.data.rows,
    };
    console.log(filteredUsersByCountryMetric);
  });
};

// sessions based on browser and OS settings
// https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.A0ARrdaM859Vfbhyuzk2WZmfIVTc6M4IOIBejy0E2_3io4vayTELVJpId1aUCdNvGD3KPHuaOUPvV7W8YLZatvIPsOnk-N3wgVQJnl3lWucfPciNX2oAalYTD_dIOh2YItsCrhtyyMg3nAAq24faXJJpXQXwP1&ids=ga%3A258121173&dimensions=ga%3Abrowser%2Cga%3AbrowserVersion%2Cga%3AoperatingSystem%2Cga%3AbrowserSize&metrics=ga%3Asessions&start-date=7daysAgo&end-date=today
const getSessionsBasedOnBrowserAndOperatingSystemProperties = async (userCredentials) => {
  axios({
    method: "get",
    url: `https://www.googleapis.com/analytics/v3/data/ga?access_token=${userCredentials.credentials.access_token}&ids=ga%3A258121173&dimensions=ga%3Abrowser%2Cga%3AbrowserVersion%2Cga%3AoperatingSystem%2Cga%3AbrowserSize&metrics=ga%3Asessions&start-date=7daysAgo&end-date=today`,
  }).then((response) => {
    const filteredSessionsByBrowserAndOSMetric = {
      dateStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(),
      numSessions: response.data.totalsForAllResults["ga:sessions"],
      data: response.data.rows,
    };
    console.log(filteredSessionsByBrowserAndOSMetric);
  });
};

module.exports = {
  getAverageSession,
  getNewUsers,
  getPageViews,
  getPageviewsPerSession,
  getPercentOfNewSessions,
  getSessionsBasedOnBrowserAndOperatingSystemProperties,
  getSessionsPerUser,
  getUsersFilteredByCountyAndCity
};
