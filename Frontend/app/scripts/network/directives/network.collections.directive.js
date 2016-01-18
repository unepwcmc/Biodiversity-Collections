define(['angularAMD','waypoints',
    'core/directives/core.map.directive',
    'core/factory/biodiversityCollectionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('networkCollections', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies', 'toastr', 'BiodiversityCollection',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, toastr, BiodiversityCollection) {

            return {
                restrict: 'EA',
                templateUrl: 'views/network/collections.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate', '$http', 'toastr',
                    function($scope, $rootScope, $stateParams, $translate, $http, toastr){

                        $scope.maxHeight = 500;
                        $scope.collectionSelected = null;
                        $scope.collections = new BiodiversityCollection();
                        angular.extend( $scope.collections, { totalElements : 0, number: 0, size: 2000, totalPages: 0 });

                        $scope.collections.loadByNetwork( $stateParams.id,  $scope.collections.number, $scope.collections.size);

                        $rootScope.$watch('editMode', function(newValue, oldValue) {
                            if (newValue)
                                $scope.maxHeight = 440;
                            else
                                $scope.maxHeight = 500;
                        });

                        $scope.$on('NETWORK_COLLECTION_LOADED', function() {
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

                            $scope.network.collections = $scope.collections.content;

                        });

                        $scope.collectionAutocomplete = function( userInputString, timeoutPromise ) {
                            if(userInputString == null)
                                return null;
                            return $http.get( $rootScope.getHost() + "collections/search/not/network/" + $stateParams.id + "/collection?name=" + userInputString ,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        };

                        $scope.addCollection = function(){
                            if ($scope.collectionSelected != null){
                                $scope.network.addCollection( $stateParams.id, $scope.collectionSelected.originalObject.id, function( data, status) {
                                    if(status === 200){
                                        toastr.success($translate.instant('COLLECTION_ADDED_TO_NETWORK'), $translate.instant('SUCCESS'));
                                        $scope.collections.loadByNetwork( $stateParams.id,  $scope.collections.number, 2000);
                                    } else {
                                        toastr.success($translate.instant('COLLECTION_ADDED_TO_NETWORK_ERROR'), $translate.instant('ERROR'));
                                    }
                                });
                                $scope.collectionSelected = null;
                                $scope.$broadcast('angucomplete-alt:clearInput', 'collection_network_autocomplete');
                            }
                        };

                        $scope.removeCollection = function( collectionId ){
                            if ($scope.collections.number > 0) {
                                if( (($scope.collections.totalElements - 1) % $scope.collections.size) == 0){
                                    $scope.collections.number = $scope.collections.number - 1;
                                    $scope.collections.totalPages = $scope.collections.totalPages - 1;
                                }
                            }
                            $scope.network.removeCollection( $stateParams.id, collectionId , function( data, status){
                                if(status === 200){
                                    toastr.success($translate.instant('COLLECTION_REMOVED_TO_NETWORK'), $translate.instant('SUCCESS'));
                                    $scope.collections.loadByNetwork( $stateParams.id,  $scope.collections.number, 2000);
                                } else {
                                    toastr.success($translate.instant('COLLECTION_REMOVED_TO_NETWORK_ERROR'), $translate.instant('ERROR'));
                                }
                            });
                        };

                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
