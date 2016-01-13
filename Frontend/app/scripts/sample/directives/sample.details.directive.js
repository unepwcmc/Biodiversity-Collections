define(['angularAMD','waypoints', 'core/directives/core.image.box.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('sampleDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                scope: { display : '@' },
                templateUrl: 'views/sample/details.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.sample = $scope.$parent.sample;

                        $scope.collectionSelected = null;
                        $scope.curatorSelected = null;
                        $scope.institutionSelected = null;

                        $rootScope.$watch('editMode', function() {
                            $scope.editMode = $rootScope.editMode;
                        });

                        $scope.$on('SAMPLE_SAVED', function() {
                            $scope.collectionSelected = $scope.sample.collection;
                            $scope.institutionSelected = $scope.sample.institution;
                        });

                        $scope.$on('BIODIVERSITY_LOADED', function() {
                            $scope.collectionSelected = $scope.sample.collection;
                            $scope.institutionSelected = $scope.sample.institution;
                        });

                        $scope.$on('SAMPLE_LOADED', function() {
                            console.log('collection loaded...');

                            $scope.collectionSelected = $scope.sample.collection;
                            $scope.curatorSelected = $scope.sample.curator;
                            $scope.institutionSelected = $scope.sample.institution;

                            $('#loader-wrapper').fadeToggle('400');
                        });

                        $scope.$on('CANCEL_EDIT_SAMPLE', function() {
                            $scope.$broadcast('angucomplete-alt:changeInput', 'collections', $scope.sample.collection);
                            $scope.$broadcast('angucomplete-alt:changeInput', 'curators', $scope.sample.curator);
                            $scope.$broadcast('angucomplete-alt:changeInput', 'institution', $scope.sample.institution);
                        });

                        $scope.collectionAutocomplete = function( userInputString, timeoutPromise){

                            if(userInputString == null)
                                return null;

                            return $http.get( $rootScope.getHost() + "collections/search/autocomplete?name=" + userInputString ,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        };

                        $scope.curatorAutocomplete = function( userInputString, timeoutPromise){

                            if(userInputString == null)
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

                        $scope.collectionSelectedFn = function(selected) {
                            if (selected) {
                                $scope.sample.collection = selected.originalObject;
                            }
                        };

                        $scope.curatorSelectedFn = function(selected) {
                            if (selected) {
                                $scope.sample.curator = selected.originalObject;
                            }
                        };

                        $scope.institutionSelectedFn = function(selected) {
                            if (selected) {
                                $scope.sample.institution = selected.originalObject;
                            }
                        };
                    }],
                link: function (scope, element, attrs) {

                    new Waypoint({
                        element: $(element).find("#sample-bar-default"),
                        handler: function( direction ) {
                            switch(direction) {
                                case 'down':
                                    if(scope.navigationBar)
                                        $(element).find("#sample-bar-fixed").show();
                                    break;
                                case 'up':
                                    $(element).find("#sample-bar-fixed").hide();
                                    break;
                                default:
                            }
                        }
                    });

                    $(element).find("#edit-sample").click( function(){

                        scope.disableAutocomplete = false;
                        scope.navigationBar = true;
                        scope.$emit('EDIT_SAMPLE');
                        scope.$apply();
                    });

                    $(element).find('.btn-edit-sample-cancel').click(function(){
                        backToDefault();
                        scope.$emit('CANCEL_EDIT_SAMPLE');
                    });

                    function backToDefault(){

                        scope.navigationBar = false;
                        scope.disableAutocomplete = true;
                        $(element).find("#sample-bar-fixed").hide();
                        $(element).find(".sample-default-mode").show();
                        $(element).find(".sample-edit-mode").hide();
                    }

                }
            };
        }]);
});
