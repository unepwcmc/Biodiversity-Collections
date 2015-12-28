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

                        $scope.users = null;

                        $scope.$on('ADMIN_USERS_TAB', function(){
                             console.log('users tab');

                            if($scope.users == null){
                                console.log('initializing users..');

                                $scope.users = new User();
                                angular.extend($scope.users, {totalElements : 0, number: 0, size: 5, totalPages: 0});
                                $scope.users.list($scope.users.number, $scope.users.size);
                            }

                        });

                        $scope.paginateUsers = function( number, size){
                            $scope.users.list(number, size);
                        };

                    }],
                link: function (scope, element, attrs) {

                }
            };
        }]);
});
