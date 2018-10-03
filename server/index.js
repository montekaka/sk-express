var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(cors())
app.use(bodyParser.json());

// Serve up the public folder since that's where our client bundle.js file will end up.
app.use(express.static(__dirname + '/../client/dist'));

app.listen(4200, function() {
  console.log('listening on port 4200!');
});

