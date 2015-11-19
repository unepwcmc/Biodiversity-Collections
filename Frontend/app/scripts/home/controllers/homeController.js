define(['app', 'core/directives/core.map.directive','core/factory/biodiversityCollectionFactory'], function () {

    'use strict';

    return ['$scope','BaseController','$state', 'BiodiversityCollection', function ($scope, BaseController,$state, BiodiversityCollection) {

        angular.extend($scope, BaseController);

        $scope.info('Welcome to Home Page');
        /**
         * Listener when the state is changed
         */
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            console.log('state Change Success');

            $scope.collections = new BiodiversityCollection();
        });

        $scope.searchCollection = function(){

            $state.go('search', { search : $scope.search });
        };

        $scope.autocomplete = function( input ){

            $scope.collections.autocomplete( input, function( data){

                  console.log(data._embedded.biodiversityCollections);
            });
        };

        $scope.$watch('query', function(newValue, oldValue) {
            if(newValue != undefined){

                if (newValue.length >= 3 && newValue !== oldValue) {
                    $scope.autocomplete($scope.query);
                }
            }
        }, true);

    }];
});