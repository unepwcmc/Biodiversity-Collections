define(['angularAMD',
    'core/directives/core.map.directive',
    'core/directives/core.paging.directive',
    'core/factory/biodiversityCollectionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('homeMap', ['$timeout', '$rootScope','BiodiversityCollection', function ($timeout, $rootScope, BiodiversityCollection) {
            return {
                restrict: 'E',
                templateUrl: 'views/home/home.map.tpl.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope){

                    $scope.collections = new BiodiversityCollection();
                    $scope.coordinates = new BiodiversityCollection();
                    angular.extend( $scope.collections, {totalElements : 0, number: 0, size: 9, totalPages: 0});
                    $scope.query = 'ALL';

                    $scope.collections.loadByDefinition($scope.query, 0, $scope.collections.size);
                    $scope.coordinates.loadCoordinatesByDefinition($scope.query);


                    $rootScope.$on('AuthenticationDone', function() {
                        $scope.load(0);
                    });

                    $rootScope.$on('LogoutDone', function() {
                        $scope.load(0);
                    });

                    $scope.$on('BIODIVERSITY_COORDINATES_FILTER_LOADED', function(){
                        console.log('biodiversity home loaded');

                        var markersArray = {};
                        var index = 0;
                        angular.forEach($scope.coordinates, function(value) {
                            index++;
                            if (value[3])
                                markersArray[value[0]] = {
                                    lat: value[3],
                                    lng: value[4],
                                    index: index,
                                    message: "<strong><a href='/#/collection/" + value[0] + "'>" + value[1] + "</a></strong><br/>" + value[2]
                                };
                        });

                        $timeout( function() {
                            $rootScope.$broadcast('MAP_POINTS_UPDATED', 'collections', markersArray);
                        }, 3000);
                    });

                    $scope.load = function(page) {
                        $scope.collections.loadByDefinition($scope.query, page, $scope.collections.size );
                        $scope.coordinates.loadCoordinatesByDefinition($scope.query);
                    };


                }],
                link: function (scope, element, attrs) {

                    $("#home-map-filter").change(function() {
                        scope.query = $(this).val();
                        scope.load(0);
                    });
                }
            };
        }]);
});
