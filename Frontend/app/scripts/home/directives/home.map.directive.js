define(['angularAMD','core/directives/core.map.directive','core/directives/core.paging.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('homeMap', ['$timeout', '$rootScope', function ($timeout, $rootScope) {
            return {
                restrict: 'E',
                templateUrl: 'views/home/home.map.tpl.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope){

                    angular.extend( $scope.collections, {totalElements : 0, number: 0, size: 9, totalPages: 0});
                    $scope.query = 'ALL';
                    $scope.collections.loadByDefinition($scope.query, $scope.collections.page, $scope.collections.size);

                    $rootScope.$on('AuthenticationDone', function() {
                        $scope.load(0);
                    });

                    $rootScope.$on('LogoutDone', function() {
                        $scope.load(0);
                    });

                    $scope.$on('BIODIVERSITY_FILTER_LOADED', function(){
                        console.log('biodiversity home loaded');

                        var markersArray = {};
                        var index = $scope.collections.number * $scope.collections.size;
                        angular.forEach($scope.collections.content, function(value) {
                            index++;
                            if (value.contact)
                                markersArray[value.id] = {
                                    lat: value.contact.latitude,
                                    lng: value.contact.longitude,
                                    index: index
                                };
                        });

                        $timeout( function() {
                            $rootScope.$broadcast('MAP_POINTS_UPDATED', 'collections', markersArray);
                        }, 3000);
                    });

                    $scope.load = function(page) {
                        $scope.collections.loadByDefinition($scope.query, page, $scope.collections.size );
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