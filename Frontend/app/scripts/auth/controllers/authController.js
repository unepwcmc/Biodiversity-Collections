define(['app','auth/factory/authenticationFactory'], function () {

    'use strict';

    return ['$scope','AuthenticationService','$http','$rootScope', '$stateParams','$timeout','toastr','$window','$state', '$translate',

        function ($scope, AuthenticationService, $http, $rootScope, $stateParams, $timeout, toastr ,$window, $state, $translate) {

                $scope.user = {language:'pt_BR'};
                $scope.resetYourPassword = false;

                /**
                 * Listener when the state is changed
                 */
                $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                    console.log('state Change Success');

                    if (toState.name == 'resetYourPassword') {
                        $scope.resetYourPassword = true;
                    }
                });

                $scope.$on('AuthenticationDone', function() {
                    if ($rootScope.userId != null) {
                        $http.get( $rootScope.getHost() + "users/" + $rootScope.userId )
                            .success(function (data) {
                                $scope.user = data;
                            });
                    }
                });

                $scope.$on('LogoutDone', function() {
                    $scope.user = {};
                });


                /**
                 * Listener when the view
                 */
                $scope.$on('$viewContentLoaded', function() {
                    console.log('auth view Content Loaded...');
                    loadingScreen();
                });


                /**
                 * Method for user authenticate
                 */
                $rootScope.authenticate = function( callback ){

                    AuthenticationService.authentication( $scope.user , function(response, status) {
                        callback( response, status);
                    });
                };

                /**
                 * Forgot Password form
                 */
                $scope.forgotPasswordFormSubmit = function(){
                    loadingScreen();
                    AuthenticationService.forgetPassword( $scope.user.email, function(response, status) {

                        $('#loader-wrapper').fadeToggle('400');

                        if(status == 200) {
                            clearModel();
                            $state.go('home');
                            toastr.success($translate.instant('FORGOT_PASSWORD_REQUESTED'), $translate.instant('SUCCESS'));
                        } else {
                            if (response.message == 'token expired') {
                                toastr.info($translate.instant('TOKEN_EXPIRED_MSG'), $translate.instant('INFORMATION'));
                                $rootScope.cleanCredentials();
                                $state.go('home');
                            } else {
                                toastr.error(response.message, $translate.instant('ERROR'));
                            }
                        }
                    });
                };

                /**
                 * Reset Password form
                 */
                $scope.resetPasswordFormSubmit = function(){
                    loadingScreen();
                    AuthenticationService.resetPassword( $stateParams.token, $scope.user.password,
                        function(response, status) {

                            $('#loader-wrapper').fadeToggle('400');

                            if(status == 200) {
                                clearModel();
                                $state.go('home');
                                toastr.success($translate.instant('PASSWORD_RESET'), $translate.instant('SUCCESS'));
                            }
                            else {
                                toastr.error(response.message, $translate.instant('ERROR'));
                            }
                        });
                };

                /**
                 * Show Loading screen
                 */
                function loadingScreen(){

                    $timeout(function(){
                        $('#loader-wrapper').fadeToggle('400');
                    }, 2000);
                }

                /**
                 * Reset User Model
                 */
                function clearModel(){
                    $scope.user = {
                        id: null,
                        username: null,
                        password:null,
                        firstName:null,
                        phoneNumber:null,
                        address:null,
                        lastName:null,
                        postalCode:null,
                        municipality:null,
                        neighbourhood: null,
                        email:null
                    };
                }

    }];
});
