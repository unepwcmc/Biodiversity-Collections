define(['angularAMD',
    'report/directives/report.chart.bubble.directive',
    'report/directives/report.chart.pie.directive',
    'report/directives/report.chart.bar.directive',
    'report/directives/report.table.directive'], function () {

    'use strict';

    return ['$scope','$rootScope', '$window', function ($scope, $rootScope, $window, BaseController) {

        angular.extend($scope, BaseController);

        $scope.downloadPdf = function() {
            $window.open($rootScope.getHost() + 'report/pdf');
        };

        $scope.downloadXls = function() {
            $window.open($rootScope.getHost() + 'report/xls');
        };

    }];
});