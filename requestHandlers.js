var exec = require('child_process').exec;

var start = function() {
	console.log('Request handler \'start\' was called.');
	var content = 'empthy';

	exec("ls -a", function(error, stdout, stderr) {
		content = stdout;
	});

	return content;
};

var upload = function() {
	console.log('Request handler \'upload\' was called.');
	return 'Hello Upload';
};

exports.start = start;
exports.upload = upload;