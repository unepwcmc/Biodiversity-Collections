/**
 *  Admin Users
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/userFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('adminUser', ['$timeout', '$rootScope', '$stateParams', '$state', '$window', '$http', '$cookies','toastr','User', function ($timeout, $rootScope, $stateParams, $state, $window, $http, $cookies, toastr, User) {

            return {
                restrict: 'EA',
                templateUrl: 'views/admin/users.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate',  function($scope, $rootScope, $stateParams, $state, $translate){

                        $scope.user = null;

                        $scope.$on('ADMIN_USERS_TAB', function(){
                             console.log('users tab');

                            if($scope.user == null){
                                console.log('initializing users..');

                                $scope.user = new User();
                                angular.extend($scope.user, {totalElements : 0, number: 0, size: 5, totalPages: 0});
                                $scope.user.list($scope.user.number, $scope.user.size);
                            }

                        });

                    }],
                link: function (scope, element, attrs) {

                }
            };
        }]);
});
