define(['angularAMD','highcharts-ng',
    'core/factory/institutionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportBubble', ['$timeout', '$rootScope', 'Institution',  function ($timeout, $rootScope, Institution) {

            return {
                restrict: 'EA',
                templateUrl: 'views/report/report.bubble.tpl.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope){

                    $scope.institution = new Institution();
                    $scope.institution.countCollections(function(data) {

                        var seriesData = [];
                        angular.forEach(data, function(value, key) {
                            seriesData.push({ name: value[0], y: value[1], z: value[2]});
                        });

                        $scope.bubbleChart = {

                            options: {chart: {
                                type: 'bubble'
                            }},

                            title: {
                                text: 'Overall Picture'
                            },

                            plotOptions: {
                                bubble: {
                                    dataLabels: {
                                        enabled: true,
                                        style: { textShadow: 'none' },
                                        formatter: function() {
                                            return this.point.name;
                                        }
                                    },
                                    minSize: '10%',
                                    maxSize: '100%'
                                }
                            },

                            xAxis: {
                                visible: false
                            },

                            yAxis: {
                                visible: false
                            },

                            series: [
                                {
                                    name: 'Total number of collections',
                                    marker: { fillColor: 'lightblue' },
                                    data: seriesData,
                                    showInLegend: true
                                }
                            ]
                        };
                    });



                }],
                link: function (scope, element, attrs) {
                }
            };
        }]);
});
