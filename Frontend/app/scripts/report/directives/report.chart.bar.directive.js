define(['angularAMD','highcharts-ng',
    'core/factory/biodiversityCollectionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportBar', ['$timeout', '$rootScope', '$translate', 'BiodiversityCollection', function ($timeout, $rootScope, $translate, BiodiversityCollection) {

            return {
                restrict: 'EA',
                templateUrl: 'views/report/report.bar.tpl.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope){


                    $scope.collection = new BiodiversityCollection();
                    $scope.collection.countType(function (data){
                        var seriesData = [];
                        angular.forEach(data, function(value, key) {
                            seriesData.push({ name: value[0], y: value[1]});
                        });

                        $scope.pieBar1 = {
                            options: {
                                chart: {type: 'bar'}},
                            title: {
                                text: $translate.instant('ORGANISM_TYPES')
                            },
                            xAxis: {
                                type: 'category'
                            },
                            yAxis: {
                                title: { text: null }
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                color: 'green',
                                showInLegend: false,
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.y}'
                                },
                                tooltip: {
                                    pointFormat: '<b>{point.name}</b>: {point.y}'
                                },
                                data: seriesData
                            }]
                        };
                    });


                    $scope.collection.countDefinition(function (data){
                        var seriesData = [];
                        angular.forEach(data, function(value, key) {
                            seriesData.push({ name: value[0], y: value[1]});
                        });

                        $scope.pieBar2 = {
                            options: {chart: {type: 'bar'}},
                            title: {
                                text: $translate.instant('COLLECTION_TYPES')
                            },
                            xAxis: {
                                type: 'category'
                            },
                            yAxis: {
                                title: { text: null }
                            },
                            legend: {
                                enabled: false
                            },
                            series: [{
                                color: 'green',
                                showInLegend: false,
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.y}'
                                },
                                tooltip: {
                                    pointFormat: '<b>{point.name}</b>: {point.y}'
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
