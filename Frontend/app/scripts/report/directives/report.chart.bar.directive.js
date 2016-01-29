define(['angularAMD','highcharts-ng',
    'core/factory/biodiversityCollectionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportBar', ['$timeout', '$rootScope', 'BiodiversityCollection', function ($timeout, $rootScope, BiodiversityCollection) {

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
                                text: 'Organism Types'
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
                                name: "Types",
                                colorByPoint: true,
                                showInLegend: false,
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
                                text: 'Collection Types'
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
                                name: "Types",
                                colorByPoint: true,
                                showInLegend: false,
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
