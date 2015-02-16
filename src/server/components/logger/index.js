var winston = require('winston');
var config = require('../../config/environment');
var fs = require('fs');
var files = {
    logs: config.root + '/logs/all.log',
    exceptions: config.root + '/logs/exceptions.log'
};

winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: files.logs,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: files.exceptions })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
