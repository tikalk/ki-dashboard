var config = require('../../config/environment');

exports.handle = handler;

function handler(mockHandler, productionHandler) {
	var result = mockHandler;
	if (config.env === 'production' || config.env === 'integration') {
		result = productionHandler;
	}
	return result;
}