/**
 * Collection Details directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','waypoints', 'core/directives/core.images.box.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('collectionDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/collection/details.tpl.html',
                controller: ['$scope', '$rootScope',function($scope, $rootScope){

                        $scope.curatorSelected = null;
                        $scope.institutionSelected = null;
                        $scope.navigationBar = false;
                        $scope.disableAutocomplete = true;

                        $scope.$on('BIODIVERSITY_LOADED', function() {
                            console.log('collection loaded...');
                            $scope.institutionSelected = $scope.collection.institution;
                            $scope.curatorSelected = $scope.collection.curator;
                        });

                        $scope.$on('CANCEL_EDIT_COLLECTION', function() {
                            $scope.$broadcast('angucomplete-alt:changeInput', 'curators', $scope.collection.curator);
                            $scope.$broadcast('angucomplete-alt:changeInput', 'institution', $scope.collection.institution);
                        });

                        $scope.curatorAutocomplete = function( userInputString, timeoutPromise){
                            if (userInputString == null)
                               return null;
                            return $http.get( $rootScope.getHost() + "curators/search/autocomplete?name=" + userInputString ,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        };

                        $scope.institutionAutocomplete = function( userInputString, timeoutPromise){
                            return $http.get( $rootScope.getHost() + "institutions/search/autocompleteName?name=" + userInputString,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        };

                        $scope.addResearcher = function(){
                            if ($scope.collection.researchers === undefined)
                                $scope.collection.researchers = [];
                            var researchers = $scope.collection.researchers;
                            researchers[researchers.length] = $scope.researcher;
                            $scope.researcher = {};
                        };

                        $scope.deleteResearch = function( index ){
                            $scope.collection.researchers.splice(index, 1);
                        };

                        $scope.curatorSelectedFn = function(selected) {
                            if (selected) {
                                $scope.collection.curator = selected.originalObject;
                            }
                        };

                        $scope.institutionSelectedFn = function(selected) {
                            if (selected) {
                                $scope.collection.institution = selected.originalObject;
                            }
                        };

                    }],
                link: function (scope, element, attrs) {

                    new Waypoint({
                        element: $(element).find("#collection-bar-default"),
                        handler: function( direction ) {

                            switch(direction) {
                                case 'down':
                                    if(scope.navigationBar)
                                       $(element).find("#collection-bar-fixed").show();
                                    break;
                                case 'up':
                                    $(element).find("#collection-bar-fixed").hide();
                                    break;
                                default:
                            }
                        }
                    });

                    scope.$on('ACTION_SAVE', function(){
                        scope.$emit('SAVE_COLLECTION');
                        backToDefault();
                    });

                    $(element).find("#edit-collection").click( function(){
                        scope.disableAutocomplete = false;
                        scope.navigationBar = true;
                        scope.$emit('EDIT_COLLECTION');
                        scope.$apply();
                    });

                    $(element).find('.btn-edit-collection-cancel').click(function(){
                        backToDefault();
                        scope.$emit('CANCEL_EDIT_COLLECTION');
                    });

                    function backToDefault(){
                        scope.navigationBar = false;
                        scope.disableAutocomplete = true;
                        $(element).find("#collection-bar-fixed").hide();
                        $(element).find(".collection-default-mode").show();
                        $(element).find(".collection-edit-mode").hide();
                    }
                }
            };
        }]);
});
