var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
//app.use(express.static(path.join(__dirname, 'dist')))


// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Set Port
var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));