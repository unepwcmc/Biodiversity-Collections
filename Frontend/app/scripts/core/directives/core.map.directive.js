/**
 * Directive for control the button edit and save int the tabs
 *
 */
define(['angularAMD','leaflet.layer'], function (angularAMD) {

    'use strict';

    angularAMD.directive('map', ['$timeout', '$rootScope', '$stateParams', 'leafletData', '$window', '$http', '$cookies',
      function ($timeout, $rootScope, $stateParams, leafletData, $window, $http, $cookies) {

        return {
            restrict: 'E',
            scope: { width:'@', height: '@', name: '@', address: '=', latitude: '=', longitude: '='},
            templateUrl: 'views/core/map.tpl.html',

            controller: ['$scope', '$rootScope', '$stateParams', 'leafletData', '$translate', '$http',
              function($scope, $rootScope, $stateParams, leafletData, $translate, $http){

                  $scope.markers = [];

                  $scope.$watch('address', function(newValue, oldValue) {
                      if (newValue !== undefined && newValue !== '') {
                          $.get('http://maps.google.com/maps/api/geocode/json?address=' + $scope.address,
                              function( data ) {
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
                  invalidateSize();

                  $rootScope.$on('LATITUDE_LONGITUDE_UPDATED', function(type, latitude, longitude) {
                      angular.extend($scope, {
                          markers: {
                              address: {
                                  lat: latitude,
                                  lng: longitude
                              }
                          }
                      });
                      invalidateSize();
                  });

                  $rootScope.$on('MAP_POINTS_UPDATED', function(type, mapName, points) {
                      if (mapName === $scope.name) {
                          var count = 1;
                          angular.forEach(points, function(obj) {
                              var index = count;
                              if (obj.index != undefined) {
                                  index = obj.index;
                              }
                              obj.icon = {
                                  type: 'div',
                                  className: "number-icon",
                                  iconSize: [30, 29],
                                  iconAnchor: [10, 44],
                                  popupAnchor: [3, -40],
                                  html: '<p style="margin: 5px; font-weight: bold; color: #fff;">' + index + '</p>'
                              };
                              obj.draggable = false;
                              count++;
                          });
                          angular.extend($scope, {markers: points});
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
                            map.scrollWheelZoom.disable();
                            L.esri.basemapLayer("Topographic").addTo(map);
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
