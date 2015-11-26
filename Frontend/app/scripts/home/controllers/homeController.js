define(['app', 'core/directives/core.map.directive','core/factory/biodiversityCollectionFactory','core/factory/networkFactory', 'core/factory/institutionFactory'], function () {

    'use strict';

    return ['$scope','BaseController', '$state', 'BiodiversityCollection','Network', 'Institution',
        function ($scope, BaseController, $state, BiodiversityCollection, Network, Institution) {

            angular.extend($scope, BaseController);

            $scope.collections = new BiodiversityCollection();
            $scope.institutions = new Institution();
            $scope.networks = new Network();

            $scope.term = '';

            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');
            });

            $scope.searchAutocomplete = function( userInputString, timeoutPromise) {

                $scope.term = userInputString;

                if (userInputString == null || $scope.search.type == "" || $scope.search.type == undefined)
                    return null;

                if ($scope.search.type == "collection") {
                     return $scope.collections.autocomplete(userInputString, function(){timeout: timeoutPromise;});
                }
                if ($scope.search.type == "network") {
                    return $scope.networks.autocomplete(userInputString, function(){timeout: timeoutPromise;});
                }

                if ($scope.search.type == "institution") {
                    return $scope.institutions.autocompleteName(userInputString, function(){timeout: timeoutPromise;});
                }

                return null;
            };

            $scope.searchSelectedFn = function(selected) {

                if (selected) {

                    $scope.term = selected.title;

                    if ($scope.search.type == "collection") {
                          $state.go('collection', {id : selected.originalObject.id, type : $scope.search.type});
                    }
                    if ($scope.search.type == "network") {
                        //Need to be implemented
                        //$state.go('network', {id : selected.originalObject.id});
                    }
                    if ($scope.search.type == "institution") {
                        //Need to be implemented
                        //$state.go('network', {id : selected.originalObject.id});
                    }

                } else {
                    $scope.term = '';
                }
            };

            $scope.isSearchEnabled = function() {
                return !($scope.term != "" && $scope.term.length >= 3 && $scope.search.type != undefined && $scope.search.type != "");
            }

            $scope.search = function(){
                $state.go('search', { term : $scope.term, type : $scope.search.type });
            };

        }];
});