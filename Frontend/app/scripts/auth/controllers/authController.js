define(['app','auth/factory/authenticationFactory'], function () {

    'use strict';

    return ['$scope','AuthenticationService','$http','$rootScope', '$stateParams','$timeout','toastr','$window','$state', '$translate',

        function ($scope, AuthenticationService, $http, $rootScope, $stateParams, $timeout, toastr ,$window, $state, $translate) {

                $scope.user = {language:'pt_BR'};

                $scope.$on('AuthenticationDone', function() {
                    if ($rootScope.userId != null) {
                        $http.get( $rootScope.getTaxonomicHost() + "users/" + $rootScope.userId )
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

                });


                /**
                 * Method for user authenticate
                 */
                $rootScope.authenticate = function( callback ){

                    AuthenticationService.authentication( $scope.user , function(response, status) {
                        callback( response, status);
                    });
                };

    }];
});
