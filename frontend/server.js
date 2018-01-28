var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var connect = require('connect');
connect = connect();
var zlib = require('zlib');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

connect.use('/song', function fooMiddleware(req, res, next) {
  console.log(req.files)
  var body = fs.createReadStream('bigfile').pipe(zlib.createGzip());
  var s3obj = new AWS.S3({params: {Bucket: 'lemusic', Key: req.files }});
  s3obj.upload({Body: body}).
    on('httpUploadProgress', function(evt) { console.log(evt); }).
    send(function(err, data) { console.log(err, data) });
  next();
});


app.use(express.static('client/build'));



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});