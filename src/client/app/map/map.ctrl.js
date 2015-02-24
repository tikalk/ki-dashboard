/**
 * Created by naor on 2/24/15.
 */
(function () {
  'use strict';

  angular.module('map').controller('MapCtrl', function ($scope) {
    $scope.mapProps = {
      //latitude: 1.335690,
      //longitude: 103.801575,
      defaults: {
        interactions: {
          mouseWheelZoom: true
        },
        controls: {
          //zoom: false,
          //rotate: false,
          attribution: false
        }
      }
    };
  });
})();