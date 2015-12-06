define(['angularAMD','waypoints','core/directives/core.map.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('contact', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/collection/contact.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.fullAddress = undefined;



                        $scope.$on('BIODIVERSITY_LOADED', function(){

                            if($scope.collection.contact == null)
                                angular.extend($scope.collection, {contact:{}});

                            $scope.fullAddress = '';

                            if ($scope.collection.contact.address1) $scope.fullAddress += '+' + $scope.collection.contact.address1;
                            if ($scope.collection.contact.address2) $scope.fullAddress += '+' + $scope.collection.contact.address2;
                            if ($scope.collection.contact.address3) $scope.fullAddress += '+' + $scope.collection.contact.address3;
                            if ($scope.collection.contact.city) $scope.fullAddress += '+' + $scope.collection.contact.city;
                            if ($scope.collection.contact.district) $scope.fullAddress += '+' + $scope.collection.contact.district;
                            if ($scope.collection.contact.country) $scope.fullAddress += '+' + $scope.collection.contact.country;
                        });
                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
