define(['angularAMD','waypoints','core/directives/core.map.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('networkContact', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/network/contact.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.address1 = '';
                        $scope.address2 = '';
                        $scope.address3 = '';

                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
