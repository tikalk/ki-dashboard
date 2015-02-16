angular.module('stats')
.controller('StatsCtrl', function ($scope) {
	$scope.items = [
		{ label: 'users', value: 0 },
		{ label: 'packages', value: 0 }
	];

	activate();

	function activate () {
	}
});
