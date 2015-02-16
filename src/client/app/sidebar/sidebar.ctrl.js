(function() {
	angular.module('sidebar')
	.controller('SidebarCtrl', SidebarCtrl);

	/* @ngInject */
	function SidebarCtrl($scope, $http, $state){
		var vm = this;
		vm.items = [
			{ label: 'List', icon: 'fa-list-th', sref : 'list' },
			{ label: 'Grids', icon: 'fa-list', sref : 'grids', active: true }
		];
		vm.isItemActive = isItemActive;

		function isItemActive (item, index) {
			return item.active && $state.includes(item.sref);
		}
	}
})();