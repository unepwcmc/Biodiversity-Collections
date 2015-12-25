define(['app',
    'core/factory/userFactory',
    'user/directives/user.details.directive'], function () {

    'use strict';

    return ['$scope','$rootScope','$stateParams','$state','$translate','toastr','BaseController','User','$timeout',
        function ($scope, $rootScope, $stateParams, $state, $translate, toastr, BaseController, User, $timeout) {

            angular.extend($scope, BaseController);

            $scope.user = new User();

            /**
             * Listener when the state is changed
             */
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');
            });

            /**
             * Should be fired when the button save is click
             */
            $scope.$on('REGISTER_NEW_USER', function( evt, data){
                console.log('saving new user..');

                $('#loader-wrapper').fadeToggle('400');
                $scope.user.register( data );
            });

            $scope.$on('USER_SAVED', function( evt, data){
                 console.log('user saved..');
                $('#loader-wrapper').fadeToggle('400');

                $scope.showSuccessMessage('SUCCESS','USER_SAVED_SUCCESSFULLY');
            });

            $scope.$on('USER_SAVED_ERROR', function( evt, data){
                console.log('user saved..');

                $('#loader-wrapper').fadeToggle('400');
                $scope.showErrorMessage('ERROR','SORRY_WE_CANT_REGISTER_THE_USER');
            });




        }];
});