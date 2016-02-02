define(['angularAMD','highcharts-ng',
    'core/factory/institutionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportBubble', ['$timeout', '$rootScope', 'Institution',  function ($timeout, $rootScope, Institution) {

            return {
                restrict: 'EA',
                templateUrl: 'views/report/report.bubble.tpl.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope){

                    $scope.institution = new Institution();

                    $scope.bubblesByCollections = function() {
                        $scope.institution.countCollections(function(data) {

                            var seriesData = [];
                            angular.forEach(data, function(value, key) {
                                seriesData.push({ name: value[0], x: (key + 1), y: value[1], z: value[2], w: value[3]});
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
                                        marker: { fillColor: 'lightgrey' },
                                        tooltip: {
                                            pointFormat: '<b>{point.name}</b><br/>{point.z} Collections<br/>{point.w} Specimens'
                                        },
                                        data: seriesData,
                                        showInLegend: true
                                    }
                                ]
                            };
                        });
                    };

                    $scope.bubblesBySpecimens = function() {
                        $scope.institution.countSpecimens(function(data) {

                            var seriesData = [];
                            angular.forEach(data, function(value, key) {
                                seriesData.push({ name: value[0], x: (key + 1), y: value[1], z: value[2], w: value[3]});
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
                                        name: 'Total number of specimens',
                                        marker: { fillColor: 'lightgrey' },
                                        tooltip: {
                                            pointFormat: '<b>{point.name}</b><br/>{point.z} Specimens<br/>{point.w} Collections'
                                        },
                                        data: seriesData,
                                        showInLegend: true
                                    }
                                ]
                            };
                        });
                    };

                    $scope.bubblesByCollections();

                }],
                link: function (scope, element, attrs) {
                }
            };
        }]);
});
