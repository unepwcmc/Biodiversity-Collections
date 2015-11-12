/**
 * Directive to show the username info box
 * @author josecarlos.it@gmail.com
 */
define(['angularAMD', 'popover'], function (angularAMD) {

    'use strict';

    angularAMD.directive('usernameBox', ['$timeout', '$compile', '$rootScope', '$state', '$http', 'toastr',
      function ($timeout, $compile, $rootScope, $state, $http, toastr) {

        return {
            restrict: 'A',
            transclude: true,
            templateUrl: 'views/auth/username.box.tpl.html',
            scope:{
                placement: '=',
                name: '='
            },
            controller: ['$scope', '$rootScope', '$translate',
              function( $scope, $rootScope, $translate ){

                $scope.isUserAdministrator = ($rootScope.userRole == 'ADMIN' || $rootScope.userRole == 'EXPERT');

                $scope.$on('AuthenticationDone', function() {
                    $scope.isUserAdministrator = ($rootScope.userRole == 'ADMIN' || $rootScope.userRole == 'EXPERT');
                });

                $scope.$on('LogoutDone', function() {
                    $scope.isUserAdministrator = ($rootScope.userRole == 'ADMIN' || $rootScope.userRole == 'EXPERT');
                });

                $scope.logoutFunc = function(){
                    $rootScope.logout();
                    $scope.closePopover();
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

            }],
            link: function (scope, element, attrs) {
               // ng-style="{'visibility': isUserAdministrator?'visible':'hidden'}"
                scope.startPopover();
            }
        };
    }]);
});
