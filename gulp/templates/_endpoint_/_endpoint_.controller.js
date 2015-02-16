var _ = require('lodash');
var promise = require('es6-promise').Promise;
var rest = require('restler');
var config = require('../../config/environment');
var restUrl = config.restUrl + '/_endpoint_';

exports.index = get;
exports.create = create;
exports.update = update;
exports.clone = clone;

function get (req, res) {
	rest.get(restUrl).on('complete', handleGet);
	
	function handleGet (response){
		res.json(response._endpoint_);
	}
}

function create (req, res) {
	var data = { _endpoint_: req.body };
	var url = restUrl;
	rest.post(url, data).on('complete', handleCreate);

	function handleCreate (data, response) {
		res.json(data);
	}
}

function update (req, res) {
	var id = req.param('id');
	var data = { _endpoint_: req.body };
	var url = restUrl + '/' + id;
	rest.putJson(url, data).on('complete', handleUpdate);

	function handleUpdate (data, response) {
		res.json(data);
	}
}