var http = require('http');
var url = require('url');

var start = function(route, handle) {
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' recived.');

		route(handle, pathname, response);

	}).listen(8888);
	console.log('Server listen at port 8888');
};

exports.start = start;

