define(['angularAMD','highcharts-ng'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportBubble', ['$timeout', '$rootScope',  function ($timeout, $rootScope) {

            return {
                restrict: 'EA',
                templateUrl: 'views/report/report.bubble.tpl.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope){


                    $scope.bubbleChart = {

                        options: {chart: {
                            type: 'bubble'
                        }},

                        title: {
                            text: 'Collections distribution'
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

                        series: [
                            {
                                name: 'Collections',
                                marker: { fillColor: 'lightblue' },
                                data: [
                                    { name: 'Collection 1', x: 1, y: 0, z: 1},
                                    { name: 'Collection 2', x: 1, y: 1, z: 1},
                                    { name: 'Collection 3', x: 1, y: 2, z: 1},
                                    { name: 'Collection 4', x: 1, y: 3, z: 1},
                                    { name: 'Collection 5', x: 1, y: 4, z: 1},
                                    { name: 'Collection 6', x: 1, y: 5, z: 1},
                                    { name: 'Collection 7', x: 1, y: 6, z: 1},
                                    { name: 'Collection 8', x: 1, y: 7, z: 1},
                                    { name: 'Collection 9', x: 1, y: 8, z: 1},
                                    { name: 'Collection 10', x: 1, y: 9, z: 1},

                                    { name: 'Collection 11', x: 2, y: 0, z: 2},
                                    { name: 'Collection 12', x: 2, y: 5, z: 2},
                                    { name: 'Collection 13', x: 2, y: 10, z: 2},
                                    { name: 'Collection 14', x: 2, y: 15, z: 2},
                                    { name: 'Collection 15', x: 2, y: 20, z: 2},
                                    { name: 'Collection 16', x: 2, y: 25, z: 2},
                                    { name: 'Collection 17', x: 2, y: 30, z: 2},
                                    { name: 'Collection 18', x: 2, y: 35, z: 2},

                                    { name: 'Collection 19', x: 3, y: 0, z: 3},
                                    { name: 'Collection 20', x: 3, y: 10, z: 3},
                                    { name: 'Collection 21', x: 3, y: 20, z: 3},
                                    { name: 'Collection 22', x: 3, y: 30, z: 3},
                                    { name: 'Collection 23', x: 3, y: 40, z: 3},
                                    { name: 'Collection 24', x: 3, y: 50, z: 3},
                                    { name: 'Collection 25', x: 3, y: 60, z: 3},
                                    { name: 'Collection 26', x: 3, y: 70, z: 3},

                                    { name: 'Collection 19', x: 4, y: 0, z: 4},
                                    { name: 'Collection 20', x: 4, y: 15, z: 4},
                                    { name: 'Collection 21', x: 4, y: 30, z: 4},
                                    { name: 'Collection 22', x: 4, y: 45, z: 4},
                                    { name: 'Collection 23', x: 4, y: 60, z: 4},
                                    { name: 'Collection 24', x: 4, y: 75, z: 4}
                                ]
                            }
                        ]
                    };

                }],
                link: function (scope, element, attrs) {
                }
            };
        }]);
});
