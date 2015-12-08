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
            scope: { width:'@', height: '@', name: '@', address: '=' },
            templateUrl: 'views/core/map.tpl.html',

            controller: ['$scope', '$rootScope', '$stateParams', 'leafletData', '$translate', '$http',
              function($scope, $rootScope, $stateParams, leafletData, $translate, $http){

                  $scope.markers = [];

                  $scope.$watch('address', function(newValue, oldValue) {
                      if (newValue !== undefined && newValue !== '') {
                          $http.get('http://maps.google.com/maps/api/geocode/json?address=' + $scope.address)
                              .success(function (data) {
                                  if (data.status == 'OK') {
                                      var latitude = data.results[0].geometry.location.lat;
                                      var longitude = data.results[0].geometry.location.lng;
                                      angular.extend($scope, {
                                          markers: {
                                              address: {
                                                  lat: latitude,
                                                  lng: longitude
                                              }
                                          }
                                      });
                                      $rootScope.$broadcast("LATITUDE_LONGITUDE_LOADED", latitude, longitude);
                                  }
                              });
                      }
                  },true);

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


                  $rootScope.$on('MAP_POINTS_UPDATED', function(type, mapName, points) {
                      if (mapName === $scope.name) {
                          angular.extend($scope, { markers: points });
                          invalidateSize();
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
