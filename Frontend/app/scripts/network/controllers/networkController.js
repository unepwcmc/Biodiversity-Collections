define(['app',
    'network/directives/network.details.directive',
    'network/directives/network.contact.directive',
    'network/directives/network.collections.directive',
    'core/directives/core.breadcrumbs.directive'], function () {

    'use strict';

    return ['$scope','BaseController', function ($scope, BaseController) {

        angular.extend($scope, BaseController);

        $scope.info('Welcome to Sample Page');

        /**
         * Listener when the view is loaded
         */
        $scope.$on('$viewContentLoaded', function() {
            console.log('view Content Loaded...');

            $('#loader-wrapper').fadeToggle('400');
        });
    }];
});