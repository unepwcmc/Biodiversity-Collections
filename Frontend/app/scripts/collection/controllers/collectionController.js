define(['app','collection/directives/collection.networks.directive',
              'collection/directives/collection.details.directive',
              'collection/directives/collection.samples.directive',
              'collection/directives/collection.specimens.directive',
              'collection/directives/collection.occurrence.directive',
              'collection/directives/collection.contact.directive',
              'core/directives/core.breadcrumbs.directive',
              'core/directives/core.publications.directive',
              'core/factory/biodiversityCollectionFactory'], function () {

    'use strict';

    return ['$scope','BaseController','$stateParams','$http','$rootScope','BiodiversityCollection','toastr','$translate','$state','$q',

           function ($scope, BaseController, $stateParams, $http, $rootScope,BiodiversityCollection, toastr, $translate, $state, $q) {
                angular.extend($scope, BaseController);

               $rootScope.editMode = false;
               $scope.images = [];
               $scope.fromState = 'home';
               $scope.collection = undefined;

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

                   $scope.collection = new BiodiversityCollection();
                   $scope.collection.get( $stateParams.id );
               });

               /**
                * Should be fired when the button save is click
                */
               $scope.$on('ACTION_SAVE', function(){
                   console.log('collection updating..');

                   $('#loader-wrapper').fadeToggle('400');
                   $scope.collection.update();
               });


               $scope.$on('BIODIVERSITY_COLLECTION_RELOADED', function(){
                   console.log('edit form canceling...');
                   $state.go($state.current, $stateParams, {reload: true, inherit: false});
               });


               /**
                * Listener when the collection factory receive new
                * biodiversity collection data.
                *
                */
               $scope.$on('BIODIVERSITY_LOADED', function(){
                   console.log('Collection Loaded');

                   if($scope.collection.published == null)
                       $scope.collection.published = false;

                   $('#loader-wrapper').fadeToggle('400');
               });

               /**
                * Listener when the collection factory update the
                * biodiversity collection model.
                *
                */
               $scope.$on('BIODIVERSITY_UPDATED', function(){
                   console.log('updated');

                   if($scope.images.length > 0){

                       var promises = [];

                       for(var i = 0; i < $scope.images.length; i++){

                           var fd = new FormData();
                           fd.append('file', $scope.images[i]);

                           console.log($scope.images[i]);

                           promises.push(
                                $http.post($rootScope.getHost() + "collections/" + $stateParams.id + "/media", fd, {
                                   headers : {
                                       'Content-Type' : undefined
                                   }
                                })
                           );
                       }

                       $q.all( promises ).then(function( results ){

                           $scope.images = null;
                           $('#loader-wrapper').fadeToggle('400');
                           toastr.success($translate.instant('BIODIVERSITY_COLLECTION_SAVED'), $translate.instant('SUCCESS'));
                           $scope.$emit("IMAGE_ADDED");

                       }).catch( function( errorCallback ){
                            console.log(errorCallback);
                       });


                   }else{

                       $('#loader-wrapper').fadeToggle('400');
                       toastr.success($translate.instant('BIODIVERSITY_COLLECTION_SAVED'), $translate.instant('SUCCESS'));
                   }
               });

               /**
                * Listener when a file is loaded from the user.
                */
               $scope.$on('ATTACH_FILE', function( evt, data ){
                    $scope.images = data;
               });

               $scope.$on('REMOVE_IMAGE', function(evt, data){

                   var index = _.findIndex($scope.collection.images, function( obj ){
                       return obj.id == data;
                   });

                   $scope.collection.images.splice(index, 1);
               });

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
           }
    ];
});