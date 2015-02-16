(function() {
    'use strict';

    angular
        .module('login')
        .controller('LoginCtrl', LoginCtrl);

    var opened = false;

    /* @ngInject */
    function LoginCtrl($scope, store, $modal, $timeout, LoginSrv, $window, $location) {
        /*jshint validthis: true */
        var vm = this;

        $scope.vm = vm;

        vm.selected = {
          username : '',
          password : ''
        }

        vm.openDialog = false;

        activate();

        function activate() {
          $scope.$on('event:auth-loginRequired', function(event, data){
            if (!!LoginSrv.isLogging) return;
            openDialog();
          });
        }

        function openDialog() {
          if (!!vm.openDialog) return;
          vm.openDialog = true;
          var modalInstance = $modal.open({
            templateUrl: 'app/login/login.tpl.html',
            size: 'sm',
            scope : $scope
          });

          modalInstance.result.then(function() {
            vm.openDialog = false;
            LoginSrv
              .login(vm.selected.username, vm.selected.password)
              // .then(redirect);
          })
          .catch(function() {
            vm.openDialog = false;
            vm.selected.password = '';
            openDialog();
          })
          .finally(function(){
            vm.selected.password = '';
            redirect();
          });

        }

        function redirect () {
          $window.location.reload();
        }

      }
})();
