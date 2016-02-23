define(['angularAMD','highcharts-ng',
    'core/factory/institutionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportPie', ['$timeout', '$rootScope', '$translate', 'Institution', function ($timeout, $rootScope, $translate, Institution) {

        return {
            restrict: 'EA',
            templateUrl: 'views/report/report.pie.tpl.html',
            controller: ['$scope', '$rootScope', function($scope, $rootScope){

                $scope.institution = new Institution();
                $scope.institution.countType(function(data) {

                    var colors = ['green', '#FFB266', '#FFCC99', '#FFE5CC'];
                    var seriesData = [];
                    angular.forEach(data, function(value, key) {
                        seriesData.push({ name: value[0], y: value[1], color: colors[key] });
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
                            text: $translate.instant('INSTITUTION_TYPES')
                        },
                        legend: {
                            enabled: false
                        },


                        series: [{
                            showInLegend: true,
                            dataLabels: {
                                enabled: true,
                                format: '{point.percentage:.1f} %'
                            },
                            tooltip: {
                                pointFormat: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            },
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
