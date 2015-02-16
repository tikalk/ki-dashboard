(function() {
    'use strict';

    angular
        .module('_ngdirective_')
        .directive('_ngdirective_', _ngdirective_);

    /* @ngInject */
    function _ngdirective_ () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();