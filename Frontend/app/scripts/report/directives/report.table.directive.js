define(['angularAMD',
    'core/directives/core.table.sorter.directive',
    'core/factory/institutionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportTable', ['$timeout', '$rootScope', 'Institution', function ($timeout, $rootScope, Institution) {

        return {
            restrict: 'EA',
            templateUrl: 'views/report/report.table.tpl.html',
            controller: ['$scope', '$rootScope', function($scope, $rootScope){

                $scope.institutions = new Institution();
                $scope.institutionsTotal = new Institution();

                angular.extend($scope.institutions, {totalElements : 0, number: 0, size: 10, totalPages: 0});

                $scope.institutions.summary($scope.institutions.number, $scope.institutions.size);
                $scope.institutionsTotal.summaryTotal();

                $scope.paginateReport = function(page, size){
                    $scope.institutions.summary(page, size);
                };

            }],
            link: function (scope, element, attrs) {

            }
        };
    }]);
});
