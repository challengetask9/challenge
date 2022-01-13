const axios = require("axios");
const report = require("../models/report");

const createReport = (data, success) => {
  report.create(
    {
      serviceName: "YouTube",
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

const getYtMetrics = async (databoxClient, yt_access_token) => {
    const base = "https://youtubeanalytics.googleapis.com/v2/reports?";
    axios({
        method: "get",
        url:
          base +
          `metrics=views,likes,subscribersGained,estimatedMinutesWatched,videosAddedToPlaylists&ids=channel==MINE&startDate=2014-07-03&endDate=2022-01-11&key=${process.env.YT_API_KEY}&access_token=${yt_access_token}`,
        headers: {
          Authorization: "token " + yt_access_token,
        },
      }).then(async (data) => {
        console.log();
        const channelMetrics = [
            {
              key: "channelViews",
              value: data.data.rows[0][0],
              date: new Date(),
            },
            {
              key: "channelLikes",
              value: data.data.rows[0][1],
              date: new Date(),
            },
            {
              key: "channelSubscribersGained",
              value: data.data.rows[0][2],
              date: new Date(),
            },
            {
              key: "channelMinWatched",
              value: data.data.rows[0][3],
              date: new Date(),
            },
            {
              key: "channelVideosAtPlaylist",
              value: data.data.rows[0][4],
              date: new Date(),
            },
          ];
          databoxClient.insertAll(channelMetrics, (res) => {
              if(res.status !== 'OK') createReport(channelMetrics, false);
              else createReport(channelMetrics, true);
          });
      }).catch((err)=>{
        console.log(err)
      });
};


module.exports = {
  getYtMetrics,
};
