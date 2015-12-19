define(['app',
    'network/directives/network.details.directive',
    'network/directives/network.contact.directive',
    'network/directives/network.collections.directive',
    'core/factory/networkFactory',
    'core/directives/core.breadcrumbs.directive'], function () {

    'use strict';

    return ['$scope','$rootScope','$stateParams','$state','$translate','$timeout','toastr','BaseController','Network','$q',
        function ($scope, $rootScope, $stateParams, $state, $translate, $timeout, toastr, BaseController, Network, $q) {

        angular.extend($scope, BaseController);

        $scope.image = [];
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
                $timeout( function(){ $('#loader-wrapper').fadeToggle('400'); }, 1000);
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

            if ($scope.images === undefined)
                $scope.images = [];

            if ($scope.images.length > 0) {
                saveImageNetwork();
            }else{

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
         * Listener when a file is loaded from the user.
         */
        $scope.$on('ATTACH_FILE', function( evt, data ){
            $scope.images = data;
        });

        $scope.$on('REMOVE_IMAGE', function(evt, data){

            var index = _.findIndex($scope.institution.images, function( obj ){
                return obj.id == data;
            });

            $scope.institution.images.splice(index, 1);
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

        function saveImageNetwork(){

            console.log('chegando aqui');

            var promises = [];

            for(var i = 0; i < $scope.images.length; i++){

                var fd = new FormData();
                fd.append('file', $scope.images[i]);

                console.log($scope.images[i]);

                promises.push(
                    $http.post($rootScope.getHost() + "institutions/" + $stateParams.id + "/media", fd, {
                        headers : {
                            'Content-Type' : undefined
                        }
                    })
                );
            }

            $q.all( promises ).then(function( results ){

                $scope.images = [];
                $('#loader-wrapper').fadeToggle('400');
                toastr.success($translate.instant('BIODIVERSITY_INSTITUTION_SAVED'), $translate.instant('SUCCESS'));
                $scope.$emit("IMAGE_ADDED");

            }).catch( function( errorCallback ){
                console.log(errorCallback);
            });
        }

    }];
});