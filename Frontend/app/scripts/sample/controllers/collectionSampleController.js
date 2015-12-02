define(['app',
    'sample/directives/sample.details.directive',
    'sample/directives/sample.taxonomy.directive',
    'sample/directives/sample.publications.directive',
    'core/factory/sampleFactory'], function () {

    'use strict';

    return ['$scope','$rootScope','$stateParams','$state','BaseController','Sample', function ($scope, $rootScope, $stateParams, $state, BaseController, Sample) {

        angular.extend($scope, BaseController);

        $scope.sample = new Sample();

        $rootScope.editMode = false;

        $scope.createSample = true;
        $scope.searchTerm = '';
        $scope.page = 0;
        $scope.size = 20;

        /**
         * Listener when the state is changed
         */
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            console.log('state Change Success');
            $('#loader-wrapper').fadeToggle('400');
        });

        $scope.search = function() {
            $scope.sample.search($scope.searchTerm, $scope.page, $scope.size);
        };

        $scope.cancel = function() {
            $state.go('collection', $stateParams);
        };

        /**
         * Listener when the button edit is clicked
         */
        $scope.$on('EDIT_COLLECTION', function() {
            setStateButton(true);
        });

        /**
         * Listener when the button cancel is clicked
         */
        $scope.$on('CANCEL_EDIT_COLLECTION', function() {
            setStateButton(false);
        });

        /**
         * Listener when the button save is clicked
         */
        $scope.$on('SAVE_COLLECTION', function() {
            setStateButton(false)
        });

        function setStateButton( status ){
            $rootScope.editMode = status;
            $scope.$apply();
        }

    }];
});