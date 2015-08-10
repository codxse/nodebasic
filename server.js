var http = require('http');
var url = require('url');

var start = function(route, handle) {
	http.createServer(function(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' recived.');

		request.setEncoding('utf8');
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Recived POST data chunk '" +
				postDataChunk + "'.");
		});
		request.addListener('end', function() {
			route(handle, pathname, response, postData);
		});

	}).listen(8888);
	console.log('Server listen at port 8888');
};

exports.start = start;

