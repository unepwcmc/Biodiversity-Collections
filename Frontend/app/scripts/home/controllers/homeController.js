define(['app',
    'core/factory/biodiversityCollectionFactory',
    'core/factory/networkFactory',
    'core/factory/curatorFactory',
    'core/factory/institutionFactory',
    'core/factory/documentFactory',
    'home/directives/home.map.directive'], function () {

    'use strict';

    return ['$scope','$rootScope','BaseController', '$state','$window','$timeout','BiodiversityCollection','Network', 'Institution','Curator','Document',
        function ($scope, $rootScope, BaseController, $state, $window, $timeout, BiodiversityCollection, Network, Institution, Curator, Document) {

            angular.extend($scope, BaseController);

            $scope.collections = new BiodiversityCollection();
            $scope.institutions = new Institution();
            $scope.networks = new Network();
            $scope.curators = new Curator();
            $scope.document = new Document();

            $scope.term = '';
            $scope.searchType = 'collection';

            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');
            });

            /**
             * Listener when the view is loaded
             */
            $scope.$on('$viewContentLoaded', function() {
                console.log('view Content Loaded...');
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
                    return $scope.curators.autocompleteName( userInputString, function(){timeout: timeoutPromise;});
                }
                if ($scope.searchType == "document") {
                    return $scope.document.autocomplete( userInputString, function(){timeout: timeoutPromise;});
                }

                return null;
            };

            $scope.searchSelectedFn = function(selected) {

                if (selected) {

                    if ($scope.searchType == "document") {
                        $window.open($rootScope.getHost() + "documents/" + selected.originalObject.id + "/download", '_blank');
                    } else {
                        $scope.term = selected.title;
                        $state.go($scope.searchType, {type : $scope.searchType, id : selected.originalObject.id});
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
                var regex = new RegExp("^[a-zA-Z0-9 ]+$");
                if (!regex.test(key)) {
                    if(key.length == 1){
                        $scope.$broadcast('angucomplete-alt:clearInput', 'searchTop');
                    }
                    else if( key.length > 1){
                        $scope.$broadcast('angucomplete-alt:changeInput', 'searchTop', key.slice(0, -1));
                    }
                }
            };

        }];
});