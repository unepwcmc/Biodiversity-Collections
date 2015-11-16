define(['app','collection/directives/collection.networks.directive',
              'collection/directives/collection.details.directive',
              'collection/directives/collection.publications.directive',
              'collection/directives/collection.samples.directive',
              'collection/directives/collection.specimens.directive'], function () {

    'use strict';

    return ['$scope','BaseController', function ($scope, BaseController) {

        angular.extend($scope, BaseController);

        $scope.info('Welcome to Collection Page');
    }];
});