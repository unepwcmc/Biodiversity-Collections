define(['angularAMD','highcharts-ng',
    'core/factory/institutionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportTable', ['$timeout', '$rootScope', 'Institution', function ($timeout, $rootScope, Institution) {

        return {
            restrict: 'EA',
            templateUrl: 'views/report/report.table.tpl.html',
            controller: ['$scope', '$rootScope', function($scope, $rootScope){

                $scope.institutions = new Institution();
                $scope.institutions.summary();

            }],
            link: function (scope, element, attrs) {

            }
        };
    }]);
});
