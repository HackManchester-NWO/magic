var express = require("express");
var app = express();
var http = require('http');var http = require('http');
app.use(express.logger());
var http = require('http');

app.get('/', function(request, response) {
	response.send('Hello World!!!!');
});

app.get('/in', function(request, response) {
	var sentTextBody  = "Nothing :(";
	if (request.query.content) {
		sentTextBody = request.query.content
	}
	var options = {
	  host: 'api.clockworksms.com',
	  path: '/http/send.aspx?key=0b377aa9114a3c22a0ba512c6ac7f3af3110b8bb&to=447453847173&content=' + "fredW"
	};
	http.get(options, function(res) {
	  console.log('STATUS: ' + res.statusCode );
	  console.log('PATH: ' + options.path );
	  
	}).on('error', function(e) {
	  console.log('ERROR: ' + e.message);
	});
	response.send('Hello SMS');
});

var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log("Listening on " + port);
});