define(['app',
    'report/directives/report.chart.pie.directive',
    'report/directives/report.chart.bar.directive',
    'report/directives/report.table.directive'], function () {

    'use strict';

    return ['$scope','$rootScope', function ($scope, $rootScope, BaseController) {

        angular.extend($scope, BaseController);

    }];
});