define(['angularAMD','core/directives/core.map.directive','core/directives/core.paging.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('homeMap', ['$timeout', '$rootScope', '$http', function ($timeout, $rootScope, $http) {
            return {
                restrict: 'E',
                templateUrl: 'views/home/home.map.tpl.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope){

                    angular.extend( $scope.collections, {totalElements : 0, number: 0, size: 5, totalPages: 0});
                    $scope.query = 'ALL';
                    $scope.collections.loadByDefinition($scope.query,$scope.page, $scope.size);

                    $scope.$on('BIODIVERSITY_FILTER_LOADED', function(){
                        console.log('biodiversity home loaded');

                        var markersArray = {};
                        angular.forEach($scope.collections.content, function(value) {
                            if (value.contact)
                                markersArray[value.id] = {
                                    lat: value.contact.latitude,
                                    lng: value.contact.longitude
                                };
                        });

                        $timeout( function() {
                            $rootScope.$broadcast('MAP_POINTS_UPDATED', 'collections', markersArray);
                        }, 3000);
                    });

                    $scope.load = function(page, size) {
                        $scope.collections.loadByDefinition($scope.query, page, size );
                    };


                }],
                link: function (scope, element, attrs) {

                    $("#home-map-filter").change(function() {
                        scope.query = $(this).val();
                        scope.load(scope.collections.number, scope.collections.size);
                    });
                }
            };
        }]);
});
