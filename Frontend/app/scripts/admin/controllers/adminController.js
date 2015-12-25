define(['app', 'core/directives/core.breadcrumbs.directive'], function () {

    'use strict';

    return ['$scope','BaseController','$http','$rootScope', '$stateParams','$timeout','$state', '$translate', function ($scope, BaseController, $http, $rootScope, $stateParams, $state, $translate) {

            angular.extend($scope, BaseController);

    }];
});
