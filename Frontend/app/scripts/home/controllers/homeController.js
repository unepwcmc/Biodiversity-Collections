define(['app'], function () {

    'use strict';

    return ['$scope','BaseController','$state', function ($scope, BaseController,$state) {

        angular.extend($scope, BaseController);

        $scope.info('Welcome to Home Page');

        /**
         * Listener when the state is changed
         */
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            console.log('state Change Success');
        });

        $scope.searchCollection = function(){

            $state.go('search', { search : $scope.search });
        };

    }];
});