define(['angularAMD','waypoints','core/directives/core.map.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('networkContact', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/network/contact.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.fullAddress = undefined;

                        $scope.$on('NETWORK_LOADED_BY_ID', function(){
                            $scope.fullAddress = '';
                            if ($scope.network.contact.address1) $scope.fullAddress += '+' + $scope.network.contact.address1;
                            if ($scope.network.contact.address2) $scope.fullAddress += '+' + $scope.network.contact.address2;
                            if ($scope.network.contact.address3) $scope.fullAddress += '+' + $scope.network.contact.address3;
                            if ($scope.network.contact.city) $scope.fullAddress += '+' + $scope.network.contact.city;
                            if ($scope.network.contact.district) $scope.fullAddress += '+' + $scope.network.contact.district;
                            if ($scope.network.contact.country) $scope.fullAddress += '+' + $scope.network.contact.country;
                        });
                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
