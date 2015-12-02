define(['app',
    'sample/directives/sample.details.directive',
    'sample/directives/sample.taxonomy.directive',
    'sample/directives/sample.publications.directive',
    'core/factory/sampleFactory'], function () {

    'use strict';

    return ['$scope','BaseController','Sample', function ($scope, BaseController, Sample) {

        angular.extend($scope, BaseController);

        $scope.sample = new Sample();

        $scope.createSample = true;
        $scope.searchTerm = undefined;

        $scope.search = function() {

        };

    }];
});