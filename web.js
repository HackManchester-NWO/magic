var express = require("express");
var app = express();
var http = require('http');var http = require('http');
app.use(express.logger());
var http = require('http');
var https = require('https');
var redis_client = require("redis").createClient(2854,'50.30.35.9', {auth_pass:'6846153632dec6f9191442a0d881cac2'});

app.get('/', function(request, response) {
	response.send('Hello World!!!!');
});

app.get('/in', function(request, response) {
	var sentTextBody  = "Nothing :(";
	var fromNumber = "";
	var gitRefs;
	if (request.query.content) {
		fromNumber = request.query.from;
	}
	
	if (request.query.content) {
		sentTextBody = request.query.content;
	}
	if (sentTextBody.toLowerCase() == "m") {
		var currentPage
		redis_client.INCRBY("page" + fromNumber, 1, function (err, reply) {
			currentPage = reply
		});
		redis_client.get(fromNumber, function (err, reply) {
			 //getReadMe(reply);
			 console.log("********* repo" + reply);
			 console.log("********* page " + currentPage);
			var gitRefs = reply.split(" ");
			https.get('https://raw.github.com/' + gitRefs[0] +'/' + gitRefs[1] + '/master/README.md', function(response) {
			 console.log("********* " + 'https://raw.github.com/' + gitRefs[0] +'/' + gitRefs[1] + '/master/README.md');
				
				response.on("data", function(chunk) {
					chuckString = chuckString + chunk
									
				});
				response.on("end", function() {
					var thisPage = getPage(chuckString, currentPage);
					//console.log("getting paged text : " + getPage(chuckString, currentPage));
					var sendSMSUrl = '/http/send.aspx?key=0b377aa9114a3c22a0ba512c6ac7f3af3110b8bb&to=447453847173&content=' + encodeURIComponent(thisPage);
					var options = {
						host: 'api.clockworksms.com', 
						path: sendSMSUrl
					};
					//console.log(options);
					http.get(options, function(response) {
					});
				});
			}).on('error', function(e) {
			  console.log('ERROR: ' + e.message);
			});
		});
	} else {
		
		var chuckString = "";
		redis_client.set("page" + fromNumber, 0, function (err, reply) {});
		redis_client.set(fromNumber, sentTextBody, function (err, reply) {
			console.log("********* " + sentTextBody);
			var gitRefs = sentTextBody.split(" ");
			https.get('https://raw.github.com/' + gitRefs[0] +'/' + gitRefs[1] + '/master/README.md', function(response) {
				
				response.on("data", function(chunk) {
					chuckString = chuckString + chunk
									
				});
				response.on("end", function() {
					var thisPage = getPage(chuckString, 0);
					//console.log("getting paged text : " + getPage(chuckString, 0));
					var sendSMSUrl = '/http/send.aspx?key=0b377aa9114a3c22a0ba512c6ac7f3af3110b8bb&to=447453847173&content=' + encodeURIComponent(thisPage);
					var options = {
						host: 'api.clockworksms.com', 
						path: sendSMSUrl
					};
					//console.log(options);
					http.get(options, function(response) {
					});
				});
			}).on('error', function(e) {
			  console.log('ERROR: ' + e.message);
			});
			
		});
	}
	
	response.send('Hello SMS');
	response.end();
});



	  		
function getPage(unpagedText, pageNumber) {
	//console.log("********************************************************************** HELLO IS IT BRIE YOU'RE LOOKING FOR? ");	
	//console.log("************************************************************ " + unpagedText.replace(["^A-Za-z0-9@$_\/.,\"():;\-=+&%#!?<>' \n]","");
	unpagedText = unpagedText.replace("\n", " ");
	var smsLength = 125;
	var newSMSText = unpagedText.substr(pageNumber * smsLength, smsLength);
	newSMSText = newSMSText + "\nReply M for more"
	return newSMSText;
}

function getReadMe(gitRefs, page) {
	var theReadMe = ""
	
		
	https.get('https://raw.github.com/' + gitRefs[0] +'/' + gitRefs[1] + '/master/README.md', function(response) {
		response.on("data", function(chunk) {
			console.log("********************************************************************** HELLO IS IT BRIE YOU'RE LOOKING FOR? ", chunk);
			// var options = {
			  // host: 'api.clockworksms.com',
			  // path: '/http/send.aspx?key=0b377aa9114a3c22a0ba512c6ac7f3af3110b8bb&to=447453847173&content=test')// + encodeURIComponent(theReadMe + chunk)
			// };
			// http.get(options, function(response) {
			  // console.log('STATUS: ' + response.statusCode );
			  // console.log('PATH: ' + options.path );
			  // console.log('SMS sent!');
			// }).on('error', function(e) {
			  // console.log('ERROR: ' + e.message);
			// });
		});
	}).on('error', function(e) {
	  console.log('ERROR: ' + e.message);
	});
}



var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log("Listening on " + port);
});