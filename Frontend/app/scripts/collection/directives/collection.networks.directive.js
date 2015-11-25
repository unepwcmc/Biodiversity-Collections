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
                restrict: 'EA',
                templateUrl: 'views/collection/networks.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.networks = new Network();
                        angular.extend($scope.networks, {totalElements : 0, number: 0, size: 5, totalPages: 0});
                        $scope.networks.load( $stateParams.id,  $scope.networks.number, $scope.networks.size);

                        $scope.$on('NETWORK_LOADED', function( ) {
                            console.log('Networks Loaded...');
                        });

                        $scope.paginateNetworks = function(page, size){
                            $scope.networks.load( $stateParams.id , page, size);
                        };

                    }],
                link: function (scope, element, attrs) {

                    $("#network-size-box").change(function() {
                        scope.networks.size = parseInt($(this).val());
                        scope.paginateNetworks(scope.networks.number, $(this).val())
                    });
                }
            };
    }]);
});
