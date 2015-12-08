define(['app',
    'sample/directives/sample.details.directive',
    'sample/directives/sample.taxonomy.directive',
    'core/directives/core.publications.directive',
    'core/factory/sampleFactory'], function () {

    'use strict';


    return ['$scope','$rootScope','$stateParams','$state','$translate','toastr','BaseController','Sample',
        function ($scope, $rootScope, $stateParams, $state, $translate, toastr, BaseController, Sample) {

        angular.extend($scope, BaseController);

        $rootScope.editMode = false;
        $scope.sample = new Sample();

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
            $scope.sample.update();
        });

        $scope.$on('ACTION_RELOADED', function(){
            console.log('edit form canceling...');
            $state.go($state.current, $stateParams, {reload: true, inherit: false});
        });

        /**
         * Listener when the collection factory update the Sample
         */
        $scope.$on('SAMPLE_UPDATED', function(){
            console.log('updated');
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