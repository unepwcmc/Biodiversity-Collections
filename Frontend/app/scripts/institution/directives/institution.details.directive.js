define(['angularAMD','waypoints', 'core/directives/core.images.box.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','toastr',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, toastr) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/details.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.institutionCuratorSelected = null;

                        $scope.institutionCuratorSelected = null;

                        $scope.addCurator = function(){
                            if($scope.institutionCuratorSelected != null){

                                //$('#loader-wrapper').fadeToggle('400');

                               /* $scope.institution.addCurator( $stateParams.id, $scope.institutionCuratorSelected.originalObject.id, function( data, status){
                                    if(status === 200){
                                        toastr.success($translate.instant('CURATOR_ADDED_TO_INSTITUTION'), $translate.instant('SUCCESS'));
                                        $scope.institution.get( $stateParams.id );
                                    } else {
                                        $('#loader-wrapper').fadeToggle('400');
                                        toastr.error($translate.instant('CURATOR_ADDED_TO_INSTITUTION_ERROR'), $translate.instant('ERROR'));
                                    }
                                });*/
                                $scope.institution.curators
                                $scope.institutionCuratorSelected = null;
                                $scope.$broadcast('angucomplete-alt:clearInput', 'institution_curator_autocomplete');
                            }
                        };

                        $scope.removeCurator = function( networkId ){
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

                        $scope.curatorAutocomplete = function( userInputString, timeoutPromise){
                            if(userInputString == null)
                                return null;
                            return $http.get( $rootScope.getHost() + "curators/search/autocomplete?name=" +  userInputString ,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        };




                    }],
                link: function (scope, element, attrs) {

                    var waypoint = new Waypoint({
                        element: $(element).find("#institution-bar-default"),
                        handler: function( direction ) {

                            switch(direction) {
                                case 'down':
                                    if(scope.navigationBar)
                                        $(element).find("#institution-bar-fixed").show();
                                    break;
                                case 'up':
                                    $(element).find("#institution-bar-fixed").hide();
                                    break;
                                default:
                            }
                        }
                    });

                    scope.$on('ACTION_SAVE', function(){

                        scope.$emit('SAVE_INSTITUTION');
                        backToDefault();
                    });

                    $(element).find("#edit-institution").click( function(){

                        scope.disableAutocomplete = false;
                        scope.navigationBar = true;
                        scope.$emit('EDIT_INSTITUTION');
                        scope.$apply();
                    });

                    $(element).find('.btn-edit-institution-cancel').click(function(){
                        backToDefault();
                        scope.$emit('CANCEL_EDIT_INSTITUTION');
                    });

                    function backToDefault(){

                        scope.navigationBar = false;
                        scope.disableAutocomplete = true;
                        $(element).find("#institution-bar-fixed").hide();
                        $(element).find(".institution-default-mode").show();
                        $(element).find(".institution-edit-mode").hide();
                    }

                }
            };
        }]);
});
