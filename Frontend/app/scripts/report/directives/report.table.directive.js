define(['angularAMD','highcharts-ng'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportTable', ['$timeout', '$rootScope',  function ($timeout, $rootScope) {

        return {
            restrict: 'EA',
            templateUrl: 'views/report/report.table.tpl.html',
            controller: ['$scope', '$rootScope', function($scope, $rootScope){


            }],
            link: function (scope, element, attrs) {

            }
        };
    }]);
});
