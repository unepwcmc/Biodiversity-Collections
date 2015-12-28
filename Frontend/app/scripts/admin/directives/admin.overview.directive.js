/**
 *  Admin Overview
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.directive('adminOverview', ['$timeout', '$rootScope', '$stateParams', '$state', '$window', '$http', '$cookies','toastr',

        function ($timeout, $rootScope, $stateParams, $state, $window, $http, $cookies, toastr) {

            return {
                restrict: 'EA',
                templateUrl: 'views/admin/overview.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate',
                    function($scope, $rootScope, $stateParams, $state, $translate){


                    }],
                link: function (scope, element, attrs) {

                }
            };
        }]);
});
