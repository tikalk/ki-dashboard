describe('controllers: sidebar', function(){
  var scope, state, rootScope;

  beforeEach(module('ki'));

  beforeEach(inject(function($rootScope, $controller, $state, $rootScope) {
  	scope = $rootScope.$new();
    state = $state;
    rootScope = $rootScope;
    $controller('SidebarCtrl as vm', {
      $scope: scope
    });
  }));

  it('should have items', function() {
    expect(scope.vm.items).toBeDefined();
  });

  // The result of this test (and the next one) are based
  // on the ui-router state object that need to load the html
  // template of the state.
  xit('should return true when item is active', function(){
    var item = scope.vm.items[0];
    // item.active = true;
    state.go(item.sref);
    rootScope.$digest();
    expect(scope.isItemActive(item)).toBeTruthy();
  });

  xit('should return false when item is active', function(){
    var item = scope.vm.items[2];
    item.active = false;
    expect(scope.vm.isItemActive(item)).toBeFalsy();
  });

  it('should return false when item has no active property', function(){
    var item = { label: 'Testing', icon: 'test' };
    expect(scope.vm.isItemActive(item)).toBeFalsy();
  })
});