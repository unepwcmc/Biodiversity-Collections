/**
 * Collection Networks directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.directive('networks', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'E',
                templateUrl: 'views/collection/networks.tpl.html',

                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){
                        //Empty
                    }],
                link: function (scope, element, attrs) {
                    // Empty
                }
            };
    }]);
});
