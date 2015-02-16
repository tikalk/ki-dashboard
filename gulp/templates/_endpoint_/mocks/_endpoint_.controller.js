var _endpoint_GetMock = require('./_endpoint_.get.mock.json');

exports.index = get;
exports.create = create;
exports.update = update;

function get (req, res) {
	res.json(_endpoint_GetMock);
}

function create (req, res) {
	var _endpoint_ = req.body;
	_endpoint_.id = guid();
	_endpoint_GetMock.push(_endpoint_);
	res.json(_endpoint_);
}

function update (req, res) {
	var _endpoint_ = req.body;
	var id = req.param('id');
	var index = getIndexById(id);
	_endpoint_GetMock.splice(index, 1, _endpoint_);
	res.json(_endpoint_);
}

function getIndexById (id) {
	var _index;
	_endpoint_GetMock.forEach(function(item, index){
		if (item.id === id) {
			_index = index;
		}
	});
	return _index;
}

function guid () {
	return Math.floor((Math.random() * 10000000000) + 1);
}