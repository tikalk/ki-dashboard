describe('Controllers: login', function(){
  var controller, scope, loginCtrl;

  beforeEach(function(){
    module('login');
    inject(function($controller, $rootScope, _loginCtrl_) {
      // use window.mocks['name.of.mock.json'] for json mocks
      scope = $rootScope.$new();
      controller = $controller('loginCtrl as vm', {
        $scope: scope
      });
      loginCtrl = _loginCtrl_
    });

  });

  // un"x" the describe and it 
  xdescribe('login actions here...', function(){

    xit('should what it is supposed to do', function() {
      
    });

  });
});