define(['angularAMD', 'core/factory/networkFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionNetworks', ['$timeout', '$rootScope', '$stateParams', 'Network',

        function ($timeout, $rootScope, $stateParams, Network) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/networks.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate', '$http', 'toastr',
                    function($scope, $rootScope, $stateParams, $state, $translate, $http, toastr){

                        $scope.networkSelected = null;
                        $scope.networks = new Network();
                        $scope.newNetwork = new Network();
                        angular.extend( $scope.networks, { totalElements : 0, number: 0, size: 5, totalPages: 0 });

                        if($stateParams.id != undefined)
                            $scope.networks.loadByInstitution( $stateParams.id,  $scope.networks.number, $scope.networks.size);

                        $scope.$on('INSTITUTION_NETWORK_LOADED', function( ) {
                            console.log('Networks Loaded...');
                        });

                        $scope.paginateInstitutionNetworks = function(page, size) {

                            if($stateParams.id != undefined){
                                $scope.networks.loadByInstitution( $stateParams.id,  page, size);
                            }
                        };

                        $scope.networkAutocomplete = function( userInputString, timeoutPromise){
                            if(userInputString == null)
                                return null;
                            return $http.get( $rootScope.getHost() + "networks/search/not/institution/" + $stateParams.id + "/network/" + userInputString ,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        };

                        $scope.addNetwork = function(){
                            if($scope.networkSelected != null){
                                $scope.institution.addNetwork( $stateParams.id, $scope.networkSelected.originalObject.id, function( data, status){
                                    if(status === 200){
                                        toastr.success($translate.instant('NETWORK_ADDED_TO_INSTITUTION'), $translate.instant('SUCCESS'));
                                        $scope.networks.loadByInstitution( $stateParams.id,  $scope.networks.number, $scope.networks.size);
                                    } else {
                                        toastr.success($translate.instant('NETWORK_ADDED_TO_INSTITUTION_ERROR'), $translate.instant('ERROR'));
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
                            $scope.institution.removeNetwork( $stateParams.id, networkId , function( data, status){
                                if(status === 200){
                                    toastr.success($translate.instant('NETWORK_REMOVED_TO_INSTITUTION'), $translate.instant('SUCCESS'));
                                    $scope.networks.loadByInstitution( $stateParams.id,  $scope.networks.number, $scope.networks.size);
                                } else {
                                    toastr.success($translate.instant('NETWORK_REMOVED_TO_INSTITUTION_ERROR'), $translate.instant('ERROR'));
                                }
                            });
                        };

                        $scope.createNewNetwork = function () {
                            $('#loader-wrapper').fadeToggle('400');
                            $scope.newNetwork.save();
                        };

                        $scope.$on('NETWORK_SAVED', function( ) {
                            $('#loader-wrapper').fadeToggle('400');
                            $state.go('network', {id : $scope.newNetwork.id, isNew: true});
                        });


                    }],
                link: function (scope, element, attrs) {

                    $("#institution-network-size-box").change(function() {
                        scope.networks.size = parseInt($(this).val());
                        scope.paginateInstitutionNetworks(scope.networks.number, $(this).val())
                    });
                }
            };
        }]);
});
