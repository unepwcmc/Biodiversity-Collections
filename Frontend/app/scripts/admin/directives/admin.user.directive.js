/**
 *  Admin Users
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.directive('adminUser', ['$timeout', '$rootScope', '$stateParams', '$state', '$window', '$http', '$cookies','toastr',

        function ($timeout, $rootScope, $stateParams, $state, $window, $http, $cookies, toastr) {

            return {
                restrict: 'EA',
                templateUrl: 'views/admin/users.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate',
                    function($scope, $rootScope, $stateParams, $state, $translate){

                        $scope.$on('ADMIN_USERS_TAB', function(){
                             console.log('users tab');
                        });

                    }],
                link: function (scope, element, attrs) {

                }
            };
        }]);
});
