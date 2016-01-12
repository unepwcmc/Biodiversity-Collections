define(['angularAMD','waypoints','core/directives/core.map.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionContact', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/contact.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.fullAddress = undefined;

                        $scope.$watchGroup(['institution.contact.address1', 'institution.contact.address2',
                            'institution.contact.address3', 'institution.contact.city', 'institution.contact.district',
                            'institution.contact.country'], function() {
                            $scope.fullAddress = '';
                            if ($scope.institution.contact) {
                                if ($scope.institution.contact.address1) $scope.fullAddress += '+' + $scope.institution.contact.address1;
                                if ($scope.institution.contact.address2) $scope.fullAddress += '+' + $scope.institution.contact.address2;
                                if ($scope.institution.contact.address3) $scope.fullAddress += '+' + $scope.institution.contact.address3;
                                if ($scope.institution.contact.city) $scope.fullAddress += '+' + $scope.institution.contact.city;
                                if ($scope.institution.contact.district) $scope.fullAddress += '+' + $scope.institution.contact.district;
                                if ($scope.institution.contact.country) $scope.fullAddress += '+' + $scope.institution.contact.country;
                            }
                        });

                        $scope.$on('INSTITUTION_LOADED', function() {
                            $rootScope.$broadcast("LATITUDE_LONGITUDE_UPDATED",
                                $scope.institution.contact.latitude, $scope.institution.contact.longitude);
                        });


                        $scope.$on('LATITUDE_LONGITUDE_LOADED', function(obj, lat, lng) {
                            if (!$scope.institution.contact) {
                                $scope.institution.contact = {};
                            }
                            $scope.institution.contact.latitude = lat;
                            $scope.institution.contact.longitude = lng;
                        });

                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
