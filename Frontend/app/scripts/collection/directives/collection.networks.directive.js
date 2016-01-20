/**
 * Collection Networks directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/networkFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('networks', ['$timeout', '$rootScope', '$stateParams', '$state', '$window', '$http', '$cookies','Network','toastr',

        function ($timeout, $rootScope, $stateParams, $state, $window, $http, $cookies, Network, toastr) {

            return {
                restrict: 'EA',
                templateUrl: 'views/collection/networks.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate',
                    function($scope, $rootScope, $stateParams, $state, $translate){

                        $scope.networkSelected = null;
                        $scope.networks = new Network();
                        $scope.newNetwork = new Network();
                        angular.extend($scope.networks, {totalElements : 0, number: 0, size: 5, totalPages: 0});
                        $scope.networks.loadByCollection( $stateParams.id,  $scope.networks.number, $scope.networks.size);

                        $scope.$on('NETWORK_LOADED', function( ) {
                            console.log('Networks Loaded...');
                        });

                        $scope.paginateNetworks = function(page, size){
                            $scope.networks.loadByCollection( $stateParams.id , page, size);
                        };

                        $scope.networkAutocomplete = function( userInputString, timeoutPromise){
                            if(userInputString == null)
                                return null;
                            return $http.get( $rootScope.getHost() + "networks/search/not/collection/" + $stateParams.id + "/network?name=" + userInputString,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        };

                        $scope.addNetwork = function(){
                            if($scope.networkSelected != null){
                                $scope.collection.addNetwork( $stateParams.id, $scope.networkSelected.originalObject.id, function( data, status){
                                    if(status === 200){
                                        toastr.success($translate.instant('NETWORK_ADDED_TO_COLLECTION'), $translate.instant('SUCCESS'));
                                        $scope.networks.loadByCollection( $stateParams.id,  $scope.networks.number, $scope.networks.size);
                                    } else {
                                        toastr.success($translate.instant('NETWORK_ADDED_TO_COLLECTION_ERROR'), $translate.instant('ERROR'));
                                    }
                                });
                                $scope.networkSelected = null;
                                $scope.$broadcast('angucomplete-alt:clearInput', 'collection_network_autocomplete');
                            }
                        };

                        $scope.removeNetwork = function( networkId ){
                            if ($scope.networks.number > 0) {
                                if( (($scope.networks.totalElements - 1) % $scope.networks.size) == 0){
                                    $scope.networks.number = $scope.networks.number - 1;
                                    $scope.networks.totalPages = $scope.networks.totalPages - 1;
                                }
                            }
                            $scope.collection.removeNetwork( $stateParams.id, networkId , function( data, status){
                                if(status === 200){
                                    toastr.success($translate.instant('NETWORK_REMOVED_TO_COLLECTION'), $translate.instant('SUCCESS'));
                                    $scope.networks.loadByCollection( $stateParams.id,  $scope.networks.number, $scope.networks.size);
                                } else {
                                    toastr.success($translate.instant('NETWORK_REMOVED_TO_COLLECTION_ERROR'), $translate.instant('ERROR'));
                                }
                            });
                        };

                        $scope.createNew = function () {
                            $('#loader-wrapper').fadeToggle('400');

                            $scope.newNetwork.name = $translate.instant('NEW_NETWORK');
                            $scope.newNetwork.collections = [ $scope.collection ];
                            $scope.newNetwork.save();
                        };

                        $scope.$on('NETWORK_SAVED', function( ) {
                            $('#loader-wrapper').fadeToggle('400');
                            $state.go('network', {id : $scope.newNetwork.id, isNew: true});
                        });

                    }],
                link: function (scope, element, attrs) {

                    $("#network-size-box").change(function() {
                        scope.networks.size = parseInt($(this).val());
                        scope.paginateNetworks(scope.networks.number, $(this).val())
                    });
                }
            };
    }]);
});
