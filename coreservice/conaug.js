require("dotenv").config({ path: __dirname + "/.env" });
var settings = require("./common/settings").Settings;
var pushNotificationSettings = require("./common/settings")
  .PushNotificationSettings;
var databaseModule = require("./database/database");
var express = require("express");
var cors = require("cors");


var app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
var bodyParser = require("body-parser");
var appLib = require("applib");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

var logger = new appLib.Logger(null, null);
startServerProcess(logger);

var customerRoute = require("./routes/customerRoutes");
app.use("/api/customer", customerRoute);


// Fetch Primary Setings From Database Residing in applib
async function startServerProcess(logger) {
  try {
    logger.logInfo(`StartServerProcess Invoked()`);
    app.listen(process.env.NODE_PORT, () => {
      logger.logInfo("server running on port " + process.env.NODE_PORT);
      console.log("server running on port " + process.env.NODE_PORT);
    });
  } catch (errFetchDBSettings) {
    logger.logInfo(
      "Error occured in starting node services. Need immediate check."
    );
  }
}
