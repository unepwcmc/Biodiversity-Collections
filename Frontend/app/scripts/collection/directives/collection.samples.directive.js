/**
 * Collection Samples directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/sampleFactory','core/directives/core.thumbnail.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('samples', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','Sample',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, Sample) {

            return {
                restrict: 'EA',
                templateUrl: 'views/collection/samples.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.samples = new Sample();
                        angular.extend($scope.samples,{totalElements : 0, number: 0, size: 5, totalPages: 0});
                        $scope.samples.load( $stateParams.id,  $scope.samples.number, $scope.samples.size);

                        $scope.$on('SAMPLE_LOADED', function( ) {
                            console.log('Samples Loaded...');
                        });

                        $scope.paginateSample = function(page, size){
                            $scope.samples.load( $stateParams.id , page, size);
                        };


                    }],
                link: function (scope, element, attrs) {

                    $("#sample-size-box").change(function() {
                        scope.samples.size = parseInt($(this).val());
                        scope.paginateSample(scope.samples.number, parseInt($(this).val()));
                    });
                }
            };
        }]);
});
