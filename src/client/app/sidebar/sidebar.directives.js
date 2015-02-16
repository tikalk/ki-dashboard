(function() {
    'use strict';

    angular
        .module('sidebar')
        .directive('readGitHash', readGitHash);

    /* @ngInject */
    function readGitHash ($rootScope, $document, $http) {
        // Usage:
        //	<read-git-hash></read-git-hash>
        // Creates:
        //	broadcasts a 'git-hash-ready' event with git hash value
        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {},
            template: '<a class="btn btn-link" href="https://github.com/ConduitMiddlewareServices/DoBetter-UI/commit/{{version}}" target="_blank">commit: {{version}}</a>'
        };
        return directive;

        function link(scope) {
            $http.get('version.json').success(function(res){
            	scope.version = res.version;
            });
        }
    }
})();