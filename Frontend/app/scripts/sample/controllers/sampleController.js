define(['app'], function () {

    'use strict';

    return ['$scope','BaseController', function ($scope, BaseController) {

        angular.extend($scope, BaseController);

        $scope.info('Welcome to Sample Page');
    }];
});