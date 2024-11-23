const mongoose = require("mongoose");
const URI = process.env.MONGO_URI || 'mongodb://admin:admin1234@mongo_db:27017/gym_db?authSource=admin';

const dbconnect = () => {
  let retries = 5;
  let retryInterval = 5000;

  const connectWithRetry = () => {
    mongoose
      .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 20000,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        retryWrites: true,
      })
      .then(() => {
        console.log("DB is connected");
      })
      .catch((err) => {
        console.log("Failed connection: ", err);
        if (retries === 0) {
          console.log("Max retries reached. Exiting...");
          process.exit(1);
        } else {
          retries -= 1;
          console.log(`Reconnecting... Attempts left: ${retries}`);
          setTimeout(connectWithRetry, retryInterval);
        }
      });
  };

  connectWithRetry();
};

module.exports = dbconnect;
