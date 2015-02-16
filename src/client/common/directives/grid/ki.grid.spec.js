describe('Unit: pr-grid directive', function () {
	var element, scope, compile;

	beforeEach(module('ki.directives'));
	beforeEach(module('templates'));

	beforeEach(inject(function($compile, $rootScope) {
	    compile = $compile;
	    scope = $rootScope;
	    scope.config = {
	    	headers: [{prop: 'name', label: 'name', col: 2, checkbox: true}, {prop: 'actions', label: 'Actions', col: 2}],
	    	items: [
	    		{ id: 1, name: 'john doe' },
	    		{ id: 2, name: 'paranoid android' }
	    	]
	    };
	 	scope.selected = [];
	    element = angular.element('<pr-grid config="config" selected="selected"></pr-grid>');
	    $compile(element)(scope);
		scope.$digest();
	}));

	it('should render a grid element', function () {
	    expect(element.hasClass('grid')).toBeTruthy();
	});

	it("should render grid item elements", function() {
		expect(element.find('.grid-item').length).toBe(scope.config.items.length)
	});

	it("should render checkboxes if 'selected' is set html", function(){
		expect(element.find('.grid-item input').length).toBeGreaterThan(0)
	});
	
	it("should add an item to the selected array", function() {
		var firstItem = element.find('.grid-item').eq(0).children().first();
		var itemScope = angular.element(firstItem).scope();
		expect(itemScope.model).toBeDefined();
		itemScope.state.checked = true;
		scope.$digest();
		itemScope.onChange();
		expect(scope.selected.length).toBe(1);
	});

	it("should remove an item from the selected array", function() {
		var firstItem = element.find('.grid-item').eq(0).children().first();
		var itemScope = angular.element(firstItem).scope();
		expect(itemScope.model).toBeDefined();
		itemScope.state.checked = true;
		scope.$digest();
		itemScope.onChange();
		expect(scope.selected.length).toBe(1);
		itemScope.state.checked = false;
		scope.$digest();
		itemScope.onChange();
		expect(scope.selected.length).toBe(0);
	});

	it("should select an item if grid is configured with selected array", function () {
		var firstItem, itemScope;
		scope.selected.push(scope.config.items[0]);
		element = angular.element('<pr-grid config="config" selected="selected"></pr-grid>');
	    compile(element)(scope);
		scope.$digest();
		firstItem = element.find('.grid-item').eq(0).children().first();
		itemScope = angular.element(firstItem).scope();
		expect(itemScope.state.checked).toBeTruthy();
	});
});