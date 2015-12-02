define(['angularAMD','waypoints', 'core/directives/core.image.box.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('sampleDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'E',
                scope: { display : '@' },
                templateUrl: 'views/sample/details.tpl.html',
                transclude: true,
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                    }],
                link: function (scope, element, attrs) {

                }
            };
        }]);
});
