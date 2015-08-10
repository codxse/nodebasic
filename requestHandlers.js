var querystring = require('querystring');
var fs = require('fs');

var start = function(response, postData) {
	console.log('Request handler \'start\' was called.');

	var body = '<doctype html>' +
		'<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'<form action="/upload" method="post">' +
		'<textarea name="text" rows="10" cols="30"></textarea>' + 
		'<br /><br />' +
		'<input type="submit" value="Submit text" />' +
		'</form>' +
		'</body>' +
		'</html>';

	response.writeHead(200, {
		"Content-Type": "text/html"
	});
	response.write(body);
	response.end();		
};

var upload = function(response, postData) {
	console.log('Request handler \'upload\' was called.');
	response.writeHead(200, {
		"Content-Type": "text/plain"
	});
	response.write('You have sent: ' + 
		querystring.parse(postData).rext);
	response.end();
};

var show = function(response, postData) {
	console.log('Request handler \'show\' was called.');
	fs.readFile("./tmp/test.png", function(error, file) {
		if (error) {
			response.writeHead(500, {
				"Content-Type": "text/plain"
			});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {
				"Content-Type": "image/png"
			});
			response.write(file);
			response.end();
		}
	});
};

exports.start = start;
exports.upload = upload;
exports.show = show;