define(['angularAMD','waypoints', 'core/directives/core.images.box.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', function ($timeout, $rootScope, $stateParams, $window, $http) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/details.tpl.html',
                controller: ['$scope', '$rootScope',  function($scope, $rootScope){

                        $scope.institutionCuratorSelected = null;

                        $scope.addCurator = function(){

                            if($scope.institutionCuratorSelected != null){

                                var obj = {
                                    id: $scope.institutionCuratorSelected.originalObject.id,
                                    name: $scope.institutionCuratorSelected.originalObject.name
                                };
                                $scope.institution.curators.push(obj);
                            }
                            console.log($scope.institution);
                            $scope.institutionCuratorSelected = null;
                            $scope.$broadcast('angucomplete-alt:clearInput', 'institution_curator_autocomplete');
                        };

                        $scope.deleteCurator = function( index ){

                            $scope.institution.curators.splice(index, 1);
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
