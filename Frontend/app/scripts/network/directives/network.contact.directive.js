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

                        $scope.$watchGroup(['network.contact.address1', 'network.contact.address2',
                            'network.contact.address3', 'network.contact.city', 'network.contact.district',
                            'network.contact.country'], function() {
                            $scope.fullAddress = '';
                            if ($scope.network.contact) {
                                if ($scope.network.contact.address1) $scope.fullAddress += '+' + $scope.network.contact.address1;
                                if ($scope.network.contact.address2) $scope.fullAddress += '+' + $scope.network.contact.address2;
                                if ($scope.network.contact.address3) $scope.fullAddress += '+' + $scope.network.contact.address3;
                                if ($scope.network.contact.city) $scope.fullAddress += '+' + $scope.network.contact.city;
                                if ($scope.network.contact.district) $scope.fullAddress += '+' + $scope.network.contact.district;
                                if ($scope.network.contact.country) $scope.fullAddress += '+' + $scope.network.contact.country;
                            }
                        });

                        $scope.$on('NETWORK_LOADED', function() {
                            if($scope.network.contact != undefined){

                                $rootScope.$broadcast("LATITUDE_LONGITUDE_UPDATED",
                                    $scope.network.contact.latitude, $scope.network.contact.longitude);
                            }
                        });

                        $scope.$on('LATITUDE_LONGITUDE_LOADED', function(obj, lat, lng) {
                            if (!$scope.network.contact) {
                                $scope.network.contact = {};
                            }
                            $scope.network.contact.latitude = lat;
                            $scope.network.contact.longitude = lng;
                        });
                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
