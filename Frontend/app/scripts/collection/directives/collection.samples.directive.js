/**
 * Collection Samples directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/sampleFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('samples', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','Sample',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, Sample) {

            return {
                restrict: 'E',
                templateUrl: 'views/collection/samples.tpl.html',
                scope:{
                    collection: '='
                },
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.page  = {totalElements : 0, number: 0, size: 10, totalPages: 0};
                        $scope.samples = new Sample();
                        $scope.samples.load($scope.collection,  $scope.page.number, $scope.page.size);

                        $scope.$on('SAMPLE_LOADED', function( ) {
                            console.log('Samples Loaded...');

                            $scope.page.number = $scope.samples.number;
                            $scope.page.size = $scope.samples.size;
                            $scope.page.totalPages = $scope.samples.totalPages;
                            $scope.page.totalElements = $scope.samples.totalElements;
                        });

                        $scope.paginate = function(page, size){
                            $scope.samples.load($scope.collection , page, size);
                        };


                    }],
                link: function (scope, element, attrs) {

                    $("#sample-size-box").change(function() {
                        scope.page.size = parseInt($(this).val());
                        scope.paginate(scope.number, $(this).val())
                    });
                }
            };
        }]);
});
