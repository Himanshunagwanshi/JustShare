require('dotenv').config();
const mongoose = require('mongoose');

function connecDB() {
  //Database Connection

  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
  
  });
  const connection = mongoose.connection;
connection
  .once("open", function () {
    console.log("Database Connected");
  })
  .on("error", function (err) {
    console.log(err);
  });
}
module.exports = connecDB;
