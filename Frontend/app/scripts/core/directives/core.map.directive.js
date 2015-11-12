/**
 * Directive for control the button edit and save int the tabs
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.directive('map', ['$timeout', '$rootScope', '$stateParams', 'leafletData', '$window', '$http', '$cookies',
      function ($timeout, $rootScope, $stateParams, leafletData, $window, $http, $cookies) {

        return {
            restrict: 'E',
            scope: { width:'=', height: '='},
            templateUrl: 'views/core/map.tpl.html',

            controller: ['$scope', '$rootScope', '$stateParams', 'leafletData', '$translate',
              function($scope, $rootScope, $stateParams, leafletData, $translate){

                  $scope.markers = [];

                  angular.extend( $scope, {
                      layers: {
                          baselayers: {
                              osm: {
                                  name: 'OpenStreetMap',
                                  type: 'xyz',
                                  url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                  layerParams: {
                                      attribution:  '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                  }
                              }
                          },
                          overlays: {
                              occurrences: {
                                  name: 'occurrences',
                                  type: 'markercluster',
                                  visible: true
                              }
                          }
                      },
                      center: {
                          lat: -10.186819,
                          lng: -48.333694,
                          zoom: 3
                      },
                      defaults: {
                      }
                  });

                $scope.$on('ToggleSectionRequested', function(event, args) {
                    invalidateSize();
                });

                function invalidateSize(){

                    leafletData.getMap().then(function(map) {
                        $timeout(function() {
                            map.invalidateSize();
                        }, 300);
                    });
                }
            }],
            link: function (scope, element, attrs) {
                // Empty
            }
        };
    }]);
});
