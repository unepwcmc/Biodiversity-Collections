define(['angularAMD','waypoints','core/factory/networkFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionNetworks', ['$timeout', '$rootScope', 'Network', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, Network, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/networks.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.page  = {totalElements : 0, number: 0, size: 10, totalPages: 0};
                        $scope.networks = new Network();
                        $scope.institution.loadNetworksByInstitution( $stateParams.id,  $scope.collections.number, $scope.collections.size);

                        $scope.$on('INSTITUTION_NETWORK_LOADED', function( ) {
                            console.log('Networks Loaded...');

                            $scope.page.number = $scope.networks.number;
                            $scope.page.size = $scope.networks.size;
                            $scope.page.totalPages = $scope.networks.totalPages;
                            $scope.page.totalElements = $scope.networks.totalElements;
                        });

                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
