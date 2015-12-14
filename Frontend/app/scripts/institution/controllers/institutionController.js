define(['app',
    'institution/directives/institution.details.directive',
    'institution/directives/institution.contact.directive',
    'institution/directives/institution.collections.directive',
    'institution/directives/institution.networks.directive',
    'core/directives/core.image.box.directive',
    'core/directives/core.breadcrumbs.directive'], function () {

    'use strict';

    return ['$scope','BaseController','$stateParams','$http','$rootScope','Institution','toastr','$translate','$state',

        function ($scope, BaseController, $stateParams, $http, $rootScope, Institution, toastr, $translate, $state) {
            angular.extend($scope, BaseController);

            $rootScope.editMode = false;
            $scope.image = null;
            $scope.fromState = 'home';
            $scope.institution = new Institution();

            /**
             * Listener when the state is changed
             */
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');

                $scope.fromState = fromState.name;
            });

            /**
             * Listener when the view is loaded
             */
            $scope.$on('$viewContentLoaded', function() {
                console.log('view Content Loaded...');

                $scope.institution.get( $stateParams.id );
            });

            $scope.$on('INSTITUTION_LOADED', function(){

                $('#loader-wrapper').fadeToggle('400');
            });

            /**
             * Should be fired when the button save is click
             */
            $scope.$on('SAVE_INSTITUTION', function(){
                console.log('institution updating..');

                $('#loader-wrapper').fadeToggle('400');

                $scope.institution.update();
            });


            $scope.$on('CANCEL_EDIT_INSTITUTION', function(){
                console.log('edit form canceling...');
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
            });

            /**
             * Listener when the collection factory update the
             * biodiversity institution model.
             *
             */
            $scope.$on('INSTITUTION_UPDATED', function(){
                console.log('updated');

                if ($scope.image != null) {
                    $scope.institution.addImage($scope.image);
                } else {
                    $('#loader-wrapper').fadeToggle('400');
                    toastr.success($translate.instant('INSTITUTION_SAVED'), $translate.instant('SUCCESS'));
                }
            });

            /**
             * Listener when the button edit is clicked
             */
            $scope.$on('EDIT_INSTITUTION', function() {
                setStateButton(true);
            });

            /**
             * Listener when the button cancel is clicked
             */
            $scope.$on('CANCEL_EDIT_INSTITUTION', function() {
                setStateButton(false);
            });

            /**
             * Listener when the button save is clicked
             */
            $scope.$on('SAVE_INSTITUTION', function() {
                setStateButton(false)
            });

            /**
             * Listener when a file is loaded from the user.
             */
            $scope.$on('ATTACH_FILE', function( evt, data ){
                $scope.image = data;
            });

            /**
             * Listener when the image was added to the biodiversity collection model.
             */
            $scope.$on('INSTITUTION_IMAGE_ADDED', function(){
                $scope.image = null;
                $('#loader-wrapper').fadeToggle('400');
                toastr.success($translate.instant('BIODIVERSITY_INSTITUTION_SAVED'), $translate.instant('SUCCESS'));
            });

            function setStateButton( status ){
                $rootScope.editMode = status;
                $scope.$apply();
            }
        }
    ];
});