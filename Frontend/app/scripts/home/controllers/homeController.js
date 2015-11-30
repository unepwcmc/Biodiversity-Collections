define(['app', 'core/directives/core.map.directive', 'core/factory/biodiversityCollectionFactory', 'core/factory/networkFactory', 'core/factory/institutionFactory'], function () {

    'use strict';

    return ['$scope','BaseController', '$state', 'BiodiversityCollection','Network', 'Institution',
        function ($scope, BaseController, $state, BiodiversityCollection, Network, Institution) {

            angular.extend($scope, BaseController);

            $scope.collections = new BiodiversityCollection();
            $scope.institutions = new Institution();
            $scope.networks = new Network();

            $scope.term = '';
            $scope.searchType = 'collection';

            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');
            });

            $scope.searchAutocomplete = function( userInputString, timeoutPromise) {

                $scope.term = userInputString;

                if (userInputString == null || $scope.searchType == undefined)
                    return null;

                if ($scope.searchType == "collection") {
                     return $scope.collections.autocomplete(userInputString, function(){timeout: timeoutPromise;});
                }
                if ($scope.searchType == "network") {
                    return $scope.networks.autocomplete(userInputString, function(){timeout: timeoutPromise;});
                }

                if ($scope.searchType == "institution") {
                    return $scope.institutions.autocompleteName(userInputString, function(){timeout: timeoutPromise;});
                }

                return null;
            };

            $scope.searchSelectedFn = function(selected) {

                if (selected) {

                    $scope.term = selected.title;

                    if ($scope.searchType == "collection") {
                          $state.go('collection', {id : selected.originalObject.id, type : $scope.searchType});
                    }
                    if ($scope.searchType == "network") {
                        //Need to be implemented
                        //$state.go('network', {id : selected.originalObject.id});
                    }
                    if ($scope.searchType == "institution") {
                        //Need to be implemented
                        //$state.go('network', {id : selected.originalObject.id});
                    }

                } else {
                    $scope.term = '';
                }
            };

            $scope.isSearchEnabled = function() {
                return !($scope.term != "" && $scope.term.length >= 3 && $scope.searchType != undefined && $scope.searchType != "");
            }

            $scope.search = function(){
                $state.go('search', { term : $scope.term, type : $scope.searchType });
            };

        }];
});