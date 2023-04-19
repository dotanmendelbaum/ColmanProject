const Twit = require("twit");
const dotenv = require("dotenv");
dotenv.config();

// ...

const T = new Twit({
    consumer_key: codes.env.API_KEY,
    consumer_secret: codes.env.API_SECRET,
    access_token: codes.env.ACCESS_TOKEN,
    access_token_secret: codes.env.ACCESS_TOKEN_SECRET,
  });

  // ..

const tweet = () => {
    const text = "Hey!";
  
    const onFinish = (err, reply) => {
      if (err) {
        console.log("Error: ", err.message);
      } else {
        console.log("Success: ", reply);
      }
    };
  
    T.post("statuses/update", { status: text }, onFinish);
  };
  
  tweet();

