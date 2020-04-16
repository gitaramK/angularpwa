//Install express server
const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "cardetails";

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/carBidding'));
app.use(bodyParser.json());

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/carBidding/index.html'));
});

// Save database object from the callback for reuse.
db = database;
console.log("Database connection ready");

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
// Start the app by listening on the default Heroku port







// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log('Databse connection error'+err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});