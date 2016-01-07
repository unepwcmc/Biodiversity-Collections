/**
 * Directive to show the username info box
 * @author josecarlos.it@gmail.com
 */
define(['angularAMD', 'popover'], function (angularAMD) {

    'use strict';

    angularAMD.directive('usernameBox', ['$timeout', '$compile', '$rootScope', '$state', '$http', 'toastr','$cookies', function ($timeout, $compile, $rootScope, $state, $http, toastr, $cookies) {

        return {
            restrict: 'A',
            transclude: true,
            templateUrl: 'views/auth/username.box.tpl.html',
            scope:{
                logged: '=',
                isAdmin: '=',
                placement: '=',
                name: '='
            },
            controller: ['$scope', '$rootScope', '$translate',
              function( $scope, $rootScope, $translate ){

                $scope.isUserAdministrator = ($rootScope.userRole == 'ADMIN');

                $scope.$on('AuthenticationDone', function() {
                    $scope.isUserAdministrator = ($rootScope.userRole == 'ADMIN');
                });

                $scope.$on('LogoutDone', function() {
                    $scope.isUserAdministrator = ($rootScope.userRole == 'ADMIN');
                });

                $scope.logoutFunc = function(){
                    $rootScope.logout();
                    $scope.closePopover();
                };

                $scope.editUserSettings = function(){
                    $state.go('editUserSettings', { id: $cookies.get('userId')});
                };

                $scope.closePopover = function(){
                    $('.user-detail').webuiPopover('hide');
                };


                $scope.closeModalGroup = function(){

                    $('#myGroupModal').modal('hide');
                };

                $scope.startPopover = function() {
                    $('.user-detail').webuiPopover(
                        {
                            content: $compile($('#box_template').html())($scope),
                            placement: $scope.placement,
                            html: true
                        }
                    );
                };

                $scope.showFormSupport = function(){
                    $rootScope.$broadcast('ASK_FOR_SUPPORT_EVENT');
                };

            }],
            link: function (scope, element, attrs) {
               // ng-style="{'visibility': isUserAdministrator?'visible':'hidden'}"
                scope.startPopover();
            }
        };
    }]);
});
