define(['angularAMD','highcharts-ng'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportPie', ['$timeout', '$rootScope',  function ($timeout, $rootScope) {

        return {
            restrict: 'EA',
            templateUrl: 'views/report/report.pie.tpl.html',
            controller: ['$scope', '$rootScope', function($scope, $rootScope){

                $scope.pieConfig = {

                    options: {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        }
                    },
                    title: {
                        text: 'Browser market shares at a specific website, 2014'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Brands',
                        data: [
                            { name: 'Microsoft Internet Explorer', y: 56.33 },
                            { name: 'Chrome', y: 24.03 },
                            { name: 'Firefox', y: 10.38 },
                            { name: 'Safari', y: 4.77 },
                            { name: 'Opera', y: 0.91 },
                            { name: 'Proprietary or Undetectable', y: 0.2 }
                        ]
                    }]
                };

            }],
            link: function (scope, element, attrs) {
            }
        };
    }]);
});
