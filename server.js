var http = require('http');
var url = require('url');

var start = function(route, handle) {
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' recived.');


		response.writeHead(200, {
			"Content-Type": "text/plain"
		});
		var content = route(handle, pathname);
		response.write(content);
		response.end();
	}).listen(8888);
	console.log('Server listen at port 8888');
};

exports.start = start;

