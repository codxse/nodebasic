var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

var start = function(request, response) {
	console.log('Request handler \'start\' was called.');

	var body = '<doctype html>' +
		'<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'<form action="/upload" method="post">' +
		'<input type="file" name="upload" />' + 
		'<br /><br />' +
		'<input type="submit" value="Upload file" />' +
		'</form>' +
		'</body>' +
		'</html>';

	response.writeHead(200, {
		"Content-Type": "text/html"
	});
	response.write(body);
	response.end();		
};

var upload = function(request, response) {
	console.log('Request handler \'upload\' was called.');
	
	var form = new formidable.IncomingForm();
	console.log('about to parse');
	form.parse(request, function(error, fields, files) {
		console.log('parsing done');
		fs.rename(fields.upload + '', '/tmp/test.png', function(error) {
			if (error) {
				fs.unlink('/tmp/test.png');
				fs.rename(fields.upload + '', '/tmp/test.png');
			}
		});
		response.writeHead(200, {
			"Content-Type": "text/html"
		});
		response.write('recived image: <br />');
		response.write('<img src="/show" />');
		response.end();
	});
};

var show = function(request, response) {
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