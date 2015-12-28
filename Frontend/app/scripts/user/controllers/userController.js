define(['app',
    'core/factory/userFactory',
    'core/directives/core.breadcrumbs.directive',
    'user/directives/user.details.directive'], function () {

    'use strict';

    return ['$scope','$rootScope','$stateParams','$state','$translate','toastr','BaseController','User','$timeout',
        function ($scope, $rootScope, $stateParams, $state, $translate, toastr, BaseController, User, $timeout) {

            angular.extend($scope, BaseController);

            $scope.user = new User();
            $scope.adminView = false;

            /**
             * Listener when the state is changed
             */
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');

                if(toState.name == 'admin_user_create'){
                    $scope.adminView = true;
                }
            });

            /**
             * Should be fired when the button save is click
             */
            $scope.$on('REGISTER_NEW_USER', function( evt, data){
                console.log('saving new user..');

                $('#loader-wrapper').fadeToggle('400');

                if(!$scope.adminView){
                    data.role = 'PUBLIC_USER';
                }
                data.username = data.email;

                $scope.user.save( data );
            });

            $scope.$on('USER_SAVED', function( evt, data){
                 console.log('user saved..');
                $('#loader-wrapper').fadeToggle('400');

                $scope.showSuccessMessage('SUCCESS','USER_SAVED_SUCCESSFULLY');
            });

            $scope.$on('USER_SAVED_ERROR', function( evt, data){
                console.log('user saved error..');

                $('#loader-wrapper').fadeToggle('400');
                $scope.showErrorMessage('ERROR','SORRY_WE_CANT_REGISTER_THE_USER');
            });

        }];
});