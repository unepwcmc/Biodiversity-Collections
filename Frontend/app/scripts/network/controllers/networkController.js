define(['app',
    'network/directives/network.details.directive',
    'network/directives/network.contact.directive',
    'network/directives/network.collections.directive',
    'core/factory/networkFactory',
    'core/directives/core.breadcrumbs.directive'], function () {

    'use strict';

    return ['$scope','$stateParams','BaseController','Network', function ($scope, $stateParams, BaseController, Network) {

        angular.extend($scope, BaseController);

        $scope.network = new Network();

        /**
         * Listener when the view is loaded
         */
        $scope.$on('$viewContentLoaded', function() {
            console.log('view Content Loaded...');

            $('#loader-wrapper').fadeToggle('400');

            $scope.network.loadById($stateParams.id);
        });
    }];
});