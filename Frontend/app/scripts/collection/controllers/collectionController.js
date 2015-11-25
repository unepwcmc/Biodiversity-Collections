define(['app','collection/directives/collection.networks.directive',
              'collection/directives/collection.details.directive',
              'collection/directives/collection.publications.directive',
              'collection/directives/collection.samples.directive',
              'collection/directives/collection.specimens.directive',
              'collection/directives/collection.occurrence.directive',
              'core/factory/biodiversityCollectionFactory'], function () {

    'use strict';

    return ['$scope','BaseController','$stateParams','$http','$rootScope','BiodiversityCollection','toastr','$translate',

           function ($scope, BaseController, $stateParams, $http, $rootScope,BiodiversityCollection, toastr, $translate) {
                angular.extend($scope, BaseController);

               $rootScope.editMode = false;
               $scope.image = null;
               $scope.collection = undefined;
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
               $scope.$on('BIODIVERSITY_COLLECTION_SAVE', function(){
                   console.log('collection updating..');

                   $scope.collection.update();
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
               });

               /**
                * Listener when the collection factory update the
                * biodiversity collection model.
                *
                */
               $scope.$on('BIODIVERSITY_UPDATED', function(){
                   console.log('updated');

                   if($scope.image != null){
                       $scope.collection.addImage($scope.image);
                   }else{
                       toastr.success($translate.instant('BIODIVERSITY_COLLECTION_SAVED'), $translate.instant('SUCCESS'));
                   }
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
               $scope.$on('IMAGE_ADDED', function(){
                   $scope.image = null;

                   toastr.success($translate.instant('BIODIVERSITY_COLLECTION_SAVED'), $translate.instant('SUCCESS'));
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