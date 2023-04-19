const { TwitterApi } = require('twitter-api-v2');
const dotenv = require("dotenv");



const client = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

const tweet = async (data) => {
    const text = "A new flight from " + data.Origin + " to " + data.Destination + " on " + data.flightDate + " for " + data.flightPrice + " just added";

    try {
        const result = await client.v2.tweet(text);
        console.log("Success: ", result);
    } catch (err) {
        console.log("Error: ", err.message);
    }
};

  module.exports = {
    tweet
  };
