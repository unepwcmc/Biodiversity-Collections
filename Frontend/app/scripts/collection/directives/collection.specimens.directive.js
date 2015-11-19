/**
 * Collection Specimens directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/specimenFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('specimens', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','Specimen',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, Specimen) {

            return {
                restrict: 'E',
                templateUrl: 'views/collection/specimens.tpl.html',
                scope:{
                    collection: '='
                },
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.page  = {totalElements : 0, number: 0, size: 10, totalPages: 0};
                        $scope.specimens = new Specimen();
                        $scope.specimens.load( $stateParams.id,  $scope.page.number, $scope.page.size);

                        $scope.$on('SPECIMENS_LOADED', function( ) {
                            console.log('Specimens Loaded...');

                            $scope.page.number = $scope.specimens.number;
                            $scope.page.size = $scope.specimens.size;
                            $scope.page.totalPages = $scope.specimens.totalPages;
                            $scope.page.totalElements = $scope.specimens.totalElements;
                        });

                        $scope.paginate = function(page, size){
                            $scope.specimens.load( $stateParams.id , page, size);
                        };
                    }],
                link: function (scope, element, attrs) {

                    $("#specimen-size-box").change(function() {
                        scope.page.size = parseInt($(this).val());
                        scope.paginate(scope.number, $(this).val())
                    });
                }
            };
        }]);
});
