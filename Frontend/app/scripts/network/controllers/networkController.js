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

        $rootScope.editMode = false;
        $scope.image = null;

        $scope.network = new Network();

        /**
         * Listener when the view is loaded
         */
        $scope.$on('$viewContentLoaded', function() {
            console.log('view Content Loaded...');

            $('#loader-wrapper').fadeToggle('400');
            $scope.network.loadById($stateParams.id);
        });

        /**
         * Should be fired when the button save is click
         */
        $scope.$on('ACTION_SAVE', function(){
            console.log('network updating..');
            $('#loader-wrapper').fadeToggle('400');
            $scope.network.update();
        });

        $scope.$on('ACTION_RELOADED', function(){
            console.log('edit form canceling...');
            $state.go($state.current, $stateParams, {reload: true, inherit: false});
        });

        /**
         * Listener when the collection factory update the
         * biodiversity collection model.
         *
         */
        $scope.$on('BIODIVERSITY_UPDATED', function(){
            console.log('updated');
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
            setStateButton(false);
        });

        /**
         * Listener when the button save is clicked
         */
        $scope.$on('SAVE_NETWORK', function() {
            setStateButton(false)
        });

        function setStateButton( status ){
            $rootScope.editMode = status;
            $scope.$apply();
        }

    }];
});