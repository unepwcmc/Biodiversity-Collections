define(['angularAMD','waypoints'], function (angularAMD) {

    'use strict';

    angularAMD.directive('networkDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/network/details.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){


                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
