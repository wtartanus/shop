var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var cors = require('cors')
var bodyParser = require('body-parser');
var connect = require('connect');
connect = connect();
// var zlib = require('zlib');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client2/donate_download/web/index.html'));
});


app.use(express.static('client2/donate_download/web'));



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
  console.log("@@@@", __dirname);
});