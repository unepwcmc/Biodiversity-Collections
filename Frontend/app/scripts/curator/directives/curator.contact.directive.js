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

                            if($scope.curator.contact == null)
                                angular.extend($scope.curator, {contact:{}});

                            $scope.fullAddress = '';
                            if ($scope.curator.contact.address1) $scope.fullAddress += '+' + $scope.curator.contact.address1;
                            if ($scope.curator.contact.address2) $scope.fullAddress += '+' + $scope.curator.contact.address2;
                            if ($scope.curator.contact.address3) $scope.fullAddress += '+' + $scope.curator.contact.address3;
                            if ($scope.curator.contact.city) $scope.fullAddress += '+' + $scope.curator.contact.city;
                            if ($scope.curator.contact.district) $scope.fullAddress += '+' + $scope.curator.contact.district;
                            if ($scope.curator.contact.country) $scope.fullAddress += '+' + $scope.network.contact.country;
                        });
                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
