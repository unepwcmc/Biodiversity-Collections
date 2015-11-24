define(['app', 'core/directives/core.map.directive','core/factory/biodiversityCollectionFactory'], function () {

    'use strict';

    return ['$scope','BaseController', '$state', 'BiodiversityCollection',
        function ($scope, BaseController, $state, BiodiversityCollection) {

            angular.extend($scope, BaseController);

            $scope.collections = new BiodiversityCollection();
            $scope.term = '';

            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');
            });

            $scope.searchAutocomplete = function( userInputString, timeoutPromise) {
                $scope.term = userInputString;

                if (userInputString == null)
                    return null;

                return $scope.collections.autocomplete(userInputString, function(){timeout: timeoutPromise;});
            };

            $scope.searchSelectedFn = function(selected) {
                if (selected) {
                    $scope.term = selected.title;
                    $state.go('collection', {id : selected.originalObject.id});
                } else {
                    $scope.term = '';
                }
            };


            $scope.search = function(){
                $state.go('search', { term : $scope.term });
            };

            $scope.isSearchEnabled = function() {
                return !($scope.term != "" && $scope.term.length >= 3 && $scope.search.type != undefined && && $scope.search.type != "");
            }

        }];
});