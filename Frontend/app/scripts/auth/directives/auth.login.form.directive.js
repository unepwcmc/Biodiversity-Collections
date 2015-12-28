define(['angularAMD', 'bootstrap'], function (angularAMD) {
    'use strict';

    angularAMD.directive('loginBox', ['$timeout', 'toastr', function ( $timeout, toastr ) {

        return {

            templateUrl: 'views/auth/login.tpl.html',

            controller: ['$scope', '$http', '$rootScope', '$state', '$q', '$window', '$translate','$cookies',
              function( $scope, $http, $rootScope, $state, $q, $window, $translate, $cookies) {

                $scope.user = {username:null, password:null};
                /**
                 * Method for user authenticate
                 */

                $scope.loginFormSubmit = function() {

                    $rootScope.login($scope.user, function( response, status ){

                        if(status == 200) {

                            $rootScope.username = $cookies.get('user');
                            $rootScope.userId = $cookies.get('userId');
                            $rootScope.userRole = $cookies.get('userRole');
                            $rootScope.fullName = $cookies.get('fullName');
                            $rootScope.logged = true;

                            $('#login-box').fadeToggle('400');

                            $scope.user.username = null;
                            $scope.user.password = null;


                          if($rootScope.userId && ($rootScope.userRole == 'ADMIN' || $rootScope.userRole == 'SUPERADMIN' || $rootScope.userRole == 'EXPERT')){
                            if($cookies.get($rootScope.userId) != null){
                              $translate.use($cookies.get($rootScope.userId));
                              $rootScope.$broadcast("languageChanged", $rootScope.userId);
                            }
                          }

                        } else {
                            toastr.error($translate.instant('USERNAME_OR_PASSWORD_INVALID'), $translate.instant('ERROR'));
                        }
                    });

                };

                $scope.$on("LogoutDone", function(  ){
                    $scope.form_signin.$setPristine();
                    $scope.form_signin.$setUntouched();
                });

                $scope.goToForgotPage = function() {
                    $('#login-box').fadeToggle('400');
                    $state.go('forgot');
                };

                $scope.closeLoginBox  = function(){

                    $scope.user.username = null;
                    $scope.user.password = null;

                    $scope.form_signin.$setPristine();
                    $scope.form_signin.$setUntouched();

                    $('#login-box').fadeToggle('400');
                }

            }]
        };
    }]);
  });
