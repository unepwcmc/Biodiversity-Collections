define(['app', 'core/directives/core.map.directive','core/factory/biodiversityCollectionFactory'], function () {

    'use strict';

    return ['$scope','BaseController', '$state', 'BiodiversityCollection',
        function ($scope, BaseController, $state, BiodiversityCollection) {

            angular.extend($scope, BaseController);

            $scope.collections = new BiodiversityCollection();
            $scope.term = '';
            $scope.searchType = 'collection';

            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');
                blockingSpecialCharacters();
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

            //$scope.isSearchEnabled = function() {
            //    return !($scope.term != "" && $scope.term.length >= 3 && $scope.search.type != undefined && && $scope.search.type != "");
            //}

            $scope.inputChangedFn = function( key ){
                var regex = new RegExp("^[a-zA-Z0-9]+$");
                if (!regex.test(key)) {
                   $scope.$broadcast('angucomplete-alt:changeInput', 'searchTop', key.slice(0, -1));
                }
            };

            function blockingSpecialCharacters(){

                $('input').bind('keypress', function (event) {
                    var regex = new RegExp("^[a-zA-Z0-9]+$");
                    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                    if (!regex.test(key)) {
                        event.preventDefault();
                        return false;
                    }
                });
            }

        }];
});