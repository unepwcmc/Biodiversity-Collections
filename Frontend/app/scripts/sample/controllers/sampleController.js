define(['app',
    'sample/directives/sample.details.directive',
    'sample/directives/sample.taxonomy.directive',
    'sample/directives/sample.publications.directive',
    'core/directives/core.breadcrumbs.directive',
    'core/factory/sampleFactory'], function () {

    'use strict';

    return ['$scope','$stateParams','BaseController','Sample',
        function ($scope, $stateParams, BaseController, Sample) {

        angular.extend($scope, BaseController);

        $scope.sample = new Sample();

        /**
         * Listener when the view is loaded
         */
        $scope.$on('$viewContentLoaded', function() {
            console.log('view Content Loaded...');

            $('#loader-wrapper').fadeToggle('400');
            $scope.sample.get($stateParams.id);
        });
    }];
});