define(['app',
    'core/directives/core.breadcrumbs.directive',
    'core/directives/core.bootstrap.tab.directive',
    'admin/directives/admin.overview.directive',
    'admin/directives/admin.user.directive',
    'admin/directives/admin.institution.directive'], function () {

    'use strict';

    return ['$scope','BaseController','$http','$rootScope', '$stateParams','$timeout','$state', '$translate', function ($scope, BaseController, $http, $rootScope, $stateParams, $state, $translate) {

            angular.extend($scope, BaseController);

    }];
});
