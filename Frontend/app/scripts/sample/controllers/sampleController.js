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