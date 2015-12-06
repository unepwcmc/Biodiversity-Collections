define(['app',
    'core/directives/core.map.directive',
    'core/factory/biodiversityCollectionFactory',
    'core/factory/networkFactory',
    'core/factory/curatorFactory',
    'core/factory/institutionFactory'], function () {

    'use strict';

    return ['$scope','BaseController', '$state', 'BiodiversityCollection','Network', 'Institution','Curator',
        function ($scope, BaseController, $state, BiodiversityCollection, Network, Institution, Curator) {

            angular.extend($scope, BaseController);

            $scope.collections = new BiodiversityCollection();
            $scope.institutions = new Institution();
            $scope.networks = new Network();
            $scope.curators = new Curator();

            $scope.term = '';
            $scope.searchType = 'collection';

            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');
                blockingSpecialCharacters();
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

                if ($scope.searchType == "curator") {
                    return $scope.curators.autocompleteName(userInputString, function(){timeout: timeoutPromise;});
                }

                return null;
            };

            $scope.searchSelectedFn = function(selected) {

                if (selected) {

                    $scope.term = selected.title;

                    if ($scope.searchType == "collection") {
                          $state.go('collection', {type : $scope.searchType, id : selected.originalObject.id});
                    }
                    if ($scope.searchType == "network") {
                        $state.go('network', {type : $scope.searchType, id : selected.originalObject.id});
                    }
                    if ($scope.searchType == "institution") {
                        $state.go('institution', {type : $scope.searchType, id : selected.originalObject.id});
                    }

                    if ($scope.searchType == "curator") {
                        $state.go('curator', {type : $scope.searchType, id : selected.originalObject.id});
                    }

                } else {
                    $scope.term = '';
                }
            };

            $scope.isSearchEnabled = function() {
                return !($scope.term != "" && $scope.term.length >= 3 && $scope.searchType != undefined && $scope.searchType != "");
            };

            $scope.search = function(){
                $state.go('search', { term : $scope.term, type : $scope.searchType });
            };

            $scope.inputChangedFn = function( key ){
                var regex = new RegExp("^[a-zA-Z0-9]+$");
                if (!regex.test(key)) {
                    if(key.length == 1){
                        $scope.$broadcast('angucomplete-alt:clearInput', 'searchTop');
                    }
                    else if( key.length > 1){
                        $scope.$broadcast('angucomplete-alt:changeInput', 'searchTop', key.slice(0, -1));
                    }
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