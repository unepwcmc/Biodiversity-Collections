define(['angularAMD','highcharts-ng',
    'core/factory/institutionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportPie', ['$timeout', '$rootScope', 'Institution', function ($timeout, $rootScope, Institution) {

        return {
            restrict: 'EA',
            templateUrl: 'views/report/report.pie.tpl.html',
            controller: ['$scope', '$rootScope', function($scope, $rootScope){

                $scope.institution = new Institution();
                $scope.institution.countType(function(data) {

                    var seriesData = [];
                    angular.forEach(data, function(value, key) {
                        seriesData.push({ name: value[0], y: value[1]});
                    });

                    $scope.pieConfig = {

                        options: {
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie',
                                height: 852
                            }
                        },
                        title: {
                            text: 'Institution Types'
                        },
                        legend: {
                            enabled: true
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
                            name: 'Types',
                            showInLegend: true,
                            data: seriesData
                        }]
                    };
                });

            }],
            link: function (scope, element, attrs) {
            }
        };
    }]);
});
