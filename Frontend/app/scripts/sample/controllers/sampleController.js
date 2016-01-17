define(['app',
    'sample/directives/sample.details.directive',
    'sample/directives/sample.taxonomy.directive',
    'core/directives/core.publications.directive',
    'core/factory/sampleFactory',
    'core/factory/imageFactory'], function () {

    'use strict';


    return ['$scope','$rootScope','$stateParams','$state','$translate','toastr','BaseController','Sample','Image',
        function ($scope, $rootScope, $stateParams, $state, $translate, toastr, BaseController, Sample,Image) {

        angular.extend($scope, BaseController);

        $rootScope.editMode = false;
        $scope.sample = new Sample();
        $scope.image = null;
        $scope.fromState = 'home';
        $scope.collection_id = undefined;

        /**
         * Listener when the state is changed
         */
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            console.log('state Change Success');

            $scope.fromState = fromState.name;

            if($scope.fromState == 'collection')
                $scope.collection_id = fromParams.id;
        });

        /**
         * Listener when the view is loaded
         */
        $scope.$on('$viewContentLoaded', function() {
            console.log('view Content Loaded...');

            $('#loader-wrapper').fadeToggle('400');
            $scope.sample.get($stateParams.id);
        });

        /**
         * Should be fired when the button save is click
         */
        $scope.$on('ACTION_SAVE', function(){
            console.log('Sample updating..');
            $('#loader-wrapper').fadeToggle('400');


            if ($scope.image != null) {
                var imageService = new Image();

                imageService.save( $scope.image, function( data, status){

                    $scope.sample.image = data;
                    $scope.sample.update();
                });
            } else {
                $scope.sample.update();
            }
        });

        $scope.$on('ACTION_RELOADED', function(){
            console.log('edit form canceling...');
            $state.go($state.current, $stateParams, {reload: true, inherit: false});
        });

        /**
         * Listener when a file is loaded from the user.
         */
        $scope.$on('ATTACH_FILE', function( evt, data ){
            $scope.image = data;
        });

        /**
         * Listener when the collection factory update the Sample
         */
        $scope.$on('SAMPLE_UPDATED', function(){
            console.log('updated');
            $scope.image = null;
            $('#loader-wrapper').fadeToggle('400');
            toastr.success($translate.instant('SAMPLE_UPDATED'), $translate.instant('SUCCESS'));
        });

        /**
         * Listener when the button edit is clicked
         */
        $scope.$on('EDIT_SAMPLE', function() {
            setStateButton(true);
        });

        /**
         * Listener when the button cancel is clicked
         */
        $scope.$on('CANCEL_EDIT_SAMPLE', function() {
            setStateButton(false);
        });

        /**
         * Listener when the button save is clicked
         */
        $scope.$on('SAVE_SAMPLE', function() {
            setStateButton(false)
        });

        function setStateButton( status ){
            $rootScope.editMode = status;
            $scope.$apply();
        }
    }];
});