var http = require("http");


/* function start() {
	function onRequest(request, response) {
		console.log("Request received.");
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
		response.end();
	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
	} */
	
function magic1(pageText) {
	var fullText = pageText;
	
	this.getPageText = function () {
		return fullText.text;
	}
}
	
exports.magic1 = magic1;
