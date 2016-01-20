define(['angularAMD','core/directives/core.map.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('curatorContact', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/curator/contact.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.fullAddress = undefined;

                        $scope.$watchGroup(['curator.user.contact.address1', 'curator.user.contact.address2',
                            'curator.user.contact.address3', 'curator.user.contact.city', 'curator.user.contact.district',
                            'curator.user.contact.country'], function() {
                            $scope.fullAddress = '';

                            if ($scope.curator.user != null) {
                                if ($scope.curator.user.contact == null)
                                    angular.extend($scope.curator.user, {contact: {}});

                                if ($scope.curator.user.contact) {
                                    if ($scope.curator.user.contact.address1) $scope.fullAddress += '+' + $scope.curator.user.contact.address1;
                                    if ($scope.curator.user.contact.address2) $scope.fullAddress += '+' + $scope.curator.user.contact.address2;
                                    if ($scope.curator.user.contact.address3) $scope.fullAddress += '+' + $scope.curator.user.contact.address3;
                                    if ($scope.curator.user.contact.city) $scope.fullAddress += '+' + $scope.curator.user.contact.city;
                                    if ($scope.curator.user.contact.district) $scope.fullAddress += '+' + $scope.curator.user.contact.district;
                                    if ($scope.curator.user.contact.country) $scope.fullAddress += '+' + $scope.curator.user.contact.country;
                                }
                            }
                        });

                        $scope.$on('CURATOR_LOADED', function() {
                            if ($scope.curator.user != null && $scope.curator.user.contact != null) {
                                $rootScope.$broadcast("LATITUDE_LONGITUDE_UPDATED",
                                    $scope.curator.user.contact.latitude, $scope.curator.user.contact.longitude);
                            }
                        });

                        $scope.$on('LATITUDE_LONGITUDE_LOADED', function(obj, lat, lng) {
                            if (!$scope.curator.user.contact) {
                                $scope.curator.user.contact = {};
                            }
                            $scope.curator.user.contact.latitude = lat;
                            $scope.curator.user.contact.longitude = lng;
                        });
                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
