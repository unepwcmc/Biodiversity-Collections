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

                        $scope.$on('CURATOR_LOADED', function(){

                            if($scope.curator.user.contact == null)
                                angular.extend($scope.curator.user, {contact:{}});

                            $scope.fullAddress = '';
                            if ($scope.curator.user.contact.address1) $scope.fullAddress += '+' + $scope.curator.user.contact.address1;
                            if ($scope.curator.user.contact.address2) $scope.fullAddress += '+' + $scope.curator.user.contact.address2;
                            if ($scope.curator.user.contact.address3) $scope.fullAddress += '+' + $scope.curator.user.contact.address3;
                            if ($scope.curator.user.contact.city) $scope.fullAddress += '+' + $scope.curator.user.contact.city;
                            if ($scope.curator.user.contact.district) $scope.fullAddress += '+' + $scope.curator.user.contact.district;
                            if ($scope.curator.user.contact.country) $scope.fullAddress += '+' + $scope.network.user.contact.country;
                        });
                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
