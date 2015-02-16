(function() {
    'use strict';

    angular
        .module('_ngmodule_')
        .controller('Ctrl', Ctrl);

    /* @ngInject */
    function Ctrl(dependencies) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Ctrl';

        activate();

        function activate() {
        }
    }
})();
