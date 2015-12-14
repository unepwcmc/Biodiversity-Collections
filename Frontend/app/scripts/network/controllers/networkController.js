define(['app',
    'network/directives/network.details.directive',
    'network/directives/network.contact.directive',
    'network/directives/network.collections.directive',
    'core/factory/networkFactory',
    'core/directives/core.breadcrumbs.directive'], function () {

    'use strict';

    return ['$scope','$rootScope','$stateParams','$state','$translate','toastr','BaseController','Network',
        function ($scope, $rootScope, $stateParams, $state, $translate, toastr, BaseController, Network) {

        angular.extend($scope, BaseController);

        $scope.image = null;
        $scope.network = new Network();

        /**
         * Listener when the view is loaded
         */
        $scope.$on('$viewContentLoaded', function() {
            console.log('view Content Loaded...');

            $('#loader-wrapper').fadeToggle('400');
            if ($stateParams.isNew) {
                $rootScope.editMode = true;
                $scope.network.id = $stateParams.id;
            } else {
                $scope.network.loadById($stateParams.id);
                $rootScope.editMode = false;
            }

        });

        /**
         * Should be fired when the button save is click
         */
        $scope.$on('ACTION_SAVE', function(){
            console.log('network updating..');
            $('#loader-wrapper').fadeToggle('400');
            $scope.network.update();
            setStateButton(false);
        });

        $scope.$on('ACTION_RELOADED', function(){
            console.log('edit form canceling...');
            $state.go($state.current, $stateParams, {reload: true, inherit: false});
        });

        $scope.$on('NETWORK_LOADED', function() {
            $('#loader-wrapper').fadeToggle('400');
        });

        /**
         * Listener when the collection factory update the
         * biodiversity collection model.
         *
         */
        $scope.$on('NETWORK_UPDATED', function(){
            console.log('updated');

            $stateParams.isNew = false;
            if ($scope.image != null) {
                $scope.network.addImage($scope.image);
            } else {
                $('#loader-wrapper').fadeToggle('400');
                toastr.success($translate.instant('NETWORK_SAVED'), $translate.instant('SUCCESS'));
            }
        });

        /**
         * Listener when the button edit is clicked
         */
        $scope.$on('EDIT_NETWORK', function() {
            setStateButton(true);
        });

        /**
         * Listener when the button cancel is clicked
         */
        $scope.$on('CANCEL_EDIT_NETWORK', function() {
            if ($stateParams.isNew) {
                $('#loader-wrapper').fadeToggle('400');
                $scope.network.delete($stateParams.id);
            } else {
                setStateButton(false);
            }

        });

        $scope.$on('NETWORK_DELETED', function() {
            $('#loader-wrapper').fadeToggle('400');
            $state.go('home');
        });

        function setStateButton( status ){
            $rootScope.editMode = status;
            $scope.$apply();
        }

    }];
});