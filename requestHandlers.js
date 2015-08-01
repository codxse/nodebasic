var start = function() {
	console.log('Request handler \'start\' was called.');
	return 'Hello Start';
};

var upload = function() {
	console.log('Request handler \'upload\' was called.');
	return 'Hello Upload';
};

exports.start = start;
exports.upload = upload;