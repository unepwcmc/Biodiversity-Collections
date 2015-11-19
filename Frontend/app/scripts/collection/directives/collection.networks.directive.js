/**
 * Collection Networks directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/networkFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('networks', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','Network',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, Network) {

            return {
                restrict: 'E',
                templateUrl: 'views/collection/networks.tpl.html',
                scope:{
                    collection: '='
                },
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.page  = {totalElements : 0, number: 0, size: 10, totalPages: 0};
                        $scope.networks = new Network();
                        $scope.networks.load( $stateParams.id,  $scope.page.number, $scope.page.size);

                        $scope.$on('NETWORK_LOADED', function( ) {
                            console.log('Networks Loaded...');

                            $scope.page.number = $scope.networks.number;
                            $scope.page.size = $scope.networks.size;
                            $scope.page.totalPages = $scope.networks.totalPages;
                            $scope.page.totalElements = $scope.networks.totalElements;
                        });

                        $scope.paginate = function(page, size){
                            $scope.networks.load( $stateParams.id , page, size);
                        };

                    }],
                link: function (scope, element, attrs) {

                    $("#network-size-box").change(function() {
                        scope.page.size = parseInt($(this).val());
                        scope.paginate(scope.number, $(this).val())
                    });
                }
            };
    }]);
});
