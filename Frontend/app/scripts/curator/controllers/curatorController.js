define(['app',
    'core/factory/curatorFactory',
    'curator/directives/curator.details.directive',
    'curator/directives/curator.contact.directive',
    'core/directives/core.breadcrumbs.directive'], function () {

    'use strict';

    return ['$scope','$rootScope','$stateParams','$state','$translate','toastr','BaseController','Curator','$timeout',
        function ($scope, $rootScope, $stateParams, $state, $translate, toastr, BaseController, Curator, $timeout) {

            angular.extend($scope, BaseController);

            $rootScope.editMode = false;
            $scope.image = null;
            $scope.fromState = 'home';
            $scope.curator = new Curator();

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

                $scope.curator.get( $stateParams.id );
            });


            $scope.$on('CURATOR_LOADED', function(){

                $('#loader-wrapper').fadeToggle('400');
            });

            /**
             * Should be fired when the button save is click
             */
            $scope.$on('SAVE_CURATOR', function(){
                console.log('institution updating..');

                if(validateDate()){

                    $('#loader-wrapper').fadeToggle('400');
                    $scope.curator.update();
                }
                else{
                    $scope.showErrorMessage('ERROR', 'INVALID_DATE');
                }
            });

            /**
             * Listener when the collection factory update the
             * biodiversity institution model.
             *
             */
            $scope.$on('CURATOR_UPDATED', function(){
                console.log('updated');

                if($scope.image != null){
                    $scope.curator.addImage($scope.image);
                }else{

                    $('#loader-wrapper').fadeToggle('400');
                    toastr.success($translate.instant('BIODIVERSITY_CURATOR_SAVED'), $translate.instant('SUCCESS'));
                }

                setStateButton(false);
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
            $scope.$on('CURATOR_IMAGE_ADDED', function(){
                $scope.image = null;
                $('#loader-wrapper').fadeToggle('400');
                toastr.success($translate.instant('BIODIVERSITY_CURATOR_SAVED'), $translate.instant('SUCCESS'));
            });

            /**
             * Listener when the button edit is clicked
             */
            $scope.$on('EDIT_CURATOR', function() {
                setStateButton(true);
            });

            /**
             * Listener when the button cancel is clicked
             */
            $scope.$on('CANCEL_EDIT_CURATOR', function() {
                setStateButton(false);
            });

            function setStateButton( status ){
                $rootScope.editMode = status;

                $timeout( function(){
                    $scope.$apply();
                },100);
            }

            function validateDate(){

                var date = Date.parse($scope.curator.date.month + "/" + $scope.curator.date.day + "/" + $scope.curator.date.year );

                if (isNaN(date)) {
                    return false;
                }

                $scope.curator.dateOfBirth = date;
                delete $scope.curator.date;

                return true;
            }
        }];
});