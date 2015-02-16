// usage:
// <pr-grid 
// 		config="config" 
// 		selected="selected" 
// ></pr-grid>
// 
// config: { headers: [{prop: 'in json', label: '', col:'', checkbox: boolean}], items: []}
// selected: {json} optional - if not set in html, checkbox won't show
// 		checkbox property must be specified in one of the headers as checkbox: true
// 

angular.module('ki.directives')
.directive('prGrid', function($parse){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'common/directives/grid/ki.grid.tpl.html',
		scope: {
			config: '=',
			onChange: '&'
		},
		link: function (scope, element, attrs) {
			var selected = attrs.selected? $parse(attrs.selected)(scope.$parent) : []
			scope.selected = selected;
			scope.headers = scope.config.headers;
			scope.items = scope.config.items;
			scope.filterObj = scope.config.filter || {};
			// build map of props for direct access
			scope.map = {};
			scope.headers.forEach(function(header){
				scope.map[header.prop] = header;
			});
			scope.itemClick = scope.config.itemClick;
		},
		controller: function ($scope, $element, $attrs) {
			this.addItem = function (item) {
				$scope.selected.push(item);
				if ($scope.onChange) $scope.onChange();
			};

			this.indexOf = function (collection, item) {
				var indexOfItem = null;
				collection.every(function(el, index){
					if (item.id === el.id) {
						indexOfItem = index;
						return false
					}
					return true;
				});
				return indexOfItem;
			}
			this.removeItem = function(item) {
				var indexOfItem = this.indexOf($scope.selected, item);
				
				if (angular.isNumber(indexOfItem)) {
					$scope.selected.splice(indexOfItem, 1);
				}
				if ($scope.onChange) $scope.onChange();
			};

			this.isSelected = function (item) {
				var indexOfItem = this.indexOf( $scope.selected, item);
				return angular.isNumber(indexOfItem);
			};
			// true if 'selected' attribute is set on the html
			this.checkboxEnabled = function() {
				return $attrs.selected;
			};

			this.propsToShow = function () {
				return $scope.headers.map(function(h){
					return h.prop;
				});
			};

			this.getPropVal = function(prop, key){
				return $scope.map[prop][key];
			}
		}
	};
})
.directive('gridItem', function(){
	return {
		restrict: 'E',
		replace: true,
		require: '^prGrid',
		templateUrl: 'common/directives/grid/grid-item.tpl.html',
		scope: {
			model: '='
		},
		link: function (scope, element, attrs, prGrid) {
			// icon suffixes by bootstrap glyphicons
			var actions = {
				'1': 'pencil',
				'2': 'remove',
				'3': 'align-right'
			};
			scope.props = prGrid.propsToShow();
			// scope.actions = scope.props.pop();
			scope.style = {
				display: prGrid.checkboxEnabled() ? 'inline' : 'none'
			};

			scope.state = {
				checked: prGrid.checkboxEnabled() && prGrid.isSelected(scope.model)
			};

			scope.onChange = function (ev) {
				if (scope.state.checked){
					prGrid.addItem(scope.model);
				} else {
					prGrid.removeItem(scope.model);
				}
			};

			scope.getActionIcon = function (action) {
				return actions[action.id];
			};

			scope.getPropVal = function(prop, key){
				return prGrid.getPropVal(prop, key);
			}
		}
	};
});