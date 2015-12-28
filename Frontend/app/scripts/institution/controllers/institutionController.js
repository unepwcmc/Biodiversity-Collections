define(['app',
    'institution/directives/institution.details.directive',
    'institution/directives/institution.contact.directive',
    'institution/directives/institution.collections.directive',
    'institution/directives/institution.networks.directive',
    'core/directives/core.breadcrumbs.directive'], function () {

    'use strict';

    return ['$scope','BaseController','$stateParams','$http','$rootScope','Institution','toastr','$translate','$state','$q',

        function ($scope, BaseController, $stateParams, $http, $rootScope, Institution, toastr, $translate, $state, $q) {
            angular.extend($scope, BaseController);

            $scope.adminView = false;
            $rootScope.editMode = false;
            $scope.images = [];
            $scope.fromState = 'home';
            $scope.institution = new Institution();

            /**
             * Listener when the state is changed
             */
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');

                $scope.fromState = fromState.name;

                 if(toState.name == 'admin_institution_create'){

                     $scope.adminView = true;
                     $rootScope.editMode = true;

                     $scope.institution.save( {}, function( data, status ){
                         if(status == 200){
                             $('#loader-wrapper').fadeToggle('400');
                             $stateParams.id = data.id;
                         }
                     });
                 }
            });

            /**
             * Listener when the view is loaded
             */
            $scope.$on('$viewContentLoaded', function(event) {
                console.log('view Content Loaded...');

                if($stateParams.id != undefined){
                    $scope.institution.get( $stateParams.id );
                }
            });

            $scope.$on('INSTITUTION_LOADED', function(){

                _.each($scope.institution.curators, function( ele ){
                    delete ele.institution;
                    delete ele.associatedInstitutions;
                });

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

                if ($scope.images === undefined)
                    $scope.images = [];

                if ($scope.images.length > 0) {
                    saveImageInstitution();
                }else{

                    $('#loader-wrapper').fadeToggle('400');
                    toastr.success($translate.instant('INSTITUTION_SAVED'), $translate.instant('SUCCESS'));

                    console.log('1');
                    if($scope.adminView){
                        console.log('11');
                        $state.go('admin_institution_create');
                    }
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
                $scope.images = data;
            });

            $scope.$on('REMOVE_IMAGE', function(evt, data){

                var index = _.findIndex($scope.institution.images, function( obj ){
                    return obj.id == data;
                });

                $scope.institution.images.splice(index, 1);
            });


            function setStateButton( status ){
                $rootScope.editMode = status;
                $scope.$apply();
            }

            function saveImageInstitution(){

                var promises = [];

                for(var i = 0; i < $scope.images.length; i++){

                    var fd = new FormData();
                    fd.append('file', $scope.images[i]);

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

                    if($scope.adminView){
                        $state.go('admin_institution_create');
                    }

                }).catch( function( errorCallback ){
                    console.log(errorCallback);
                });
            }
        }
    ];
});