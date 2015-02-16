'use strict';

var fs = require('fs'),
    tasks = fs.readdirSync('./gulp/tasks/');

tasks.forEach(function (task) {
	require('./tasks/' + task);
});