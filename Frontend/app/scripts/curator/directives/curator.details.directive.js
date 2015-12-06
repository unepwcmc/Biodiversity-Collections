define(['angularAMD','waypoints', 'core/directives/core.image.box.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('curatorDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/curator/details.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.navigationBar = false;
                        $scope.institutionSelected = null;
                        $scope.disableAutocomplete = true;
                        $scope.associatedInstitutionSelected = null;

                        $scope.$on('CURATOR_LOADED', function(){

                            convertDate();

                            $scope.institutionSelected = $scope.curator.institution;
                        });

                        $scope.$on('CANCEL_EDIT_CURATOR', function() {

                            convertDate();
                           $scope.$broadcast('angucomplete-alt:changeInput', 'institution', $scope.curator.institution);
                        });

                        $scope.institutionAutocomplete = function( userInputString, timeoutPromise){

                            return $http.get( $rootScope.getHost() + "institutions/search/autocompleteName?name=" + userInputString,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        };

                        $scope.institutionSelectedFn = function(selected) {
                            if (selected) {
                                $scope.curator.institution = selected.originalObject;
                            }
                        };

                        $scope.addAssociatedInstitution = function(){

                            if($scope.associatedInstitutionSelected != null){

                                var obj = {
                                          id: $scope.associatedInstitutionSelected.originalObject.id,
                                          name: $scope.associatedInstitutionSelected.originalObject.name
                                };
                                $scope.curator.associatedInstitutions.push(obj);
                            }
                            $scope.$broadcast('angucomplete-alt:clearInput', 'associatedInstitutionAtcl');
                            $scope.associatedInstitutionSelected = null;
                        };

                        $scope.removeAssociatedInstitution = function( index ){
                            $scope.curator.associatedInstitutions.splice(index, 1);
                        };

                        $scope.onlyNumber = function($event){
                            if(isNaN(String.fromCharCode($event.keyCode))){
                                $event.preventDefault();
                            }
                        };

                        function convertDate(){

                            if($scope.curator.dateOfBirth != null){

                                var date = new Date($scope.curator.dateOfBirth);
                                angular.extend($scope.curator, { date: { day : date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }})
                            }
                        }


                    }],
                link: function (scope, element, attrs) {

                    new Waypoint({
                        element: $(element).find("#curator-bar-default"),
                        handler: function( direction ) {
                            switch(direction) {
                                case 'down':
                                    if(scope.navigationBar)
                                        $(element).find("#curator-bar-fixed").show();
                                    break;
                                case 'up':
                                    $(element).find("#curator-bar-fixed").hide();
                                    break;
                                default:
                            }
                        }
                    });

                    scope.$on('BIODIVERSITY_COLLECTION_SAVE', function(){

                        scope.$emit('SAVE_CURATOR');
                        backToDefault();
                    });

                    $(element).find("#edit-curator").click( function(){

                        scope.disableAutocomplete = false;
                        scope.navigationBar = true;
                        scope.$emit('EDIT_CURATOR');
                        scope.$apply();
                    });

                    $(element).find('.btn-edit-curator-cancel').click(function(){
                        backToDefault();
                        scope.$emit('CANCEL_EDIT_CURATOR');
                    });

                    function backToDefault(){

                        scope.navigationBar = false;
                        scope.disableAutocomplete = true;
                        $(element).find("#curator-bar-fixed").hide();
                        $(element).find(".curator-default-mode").show();
                        $(element).find(".curator-edit-mode").hide();
                    }
                }
            };
        }]);
});
