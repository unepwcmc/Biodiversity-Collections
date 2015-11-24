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

               $scope.editMode = false;
               $scope.image = null;
               $scope.collection = undefined;
               /**
                * Listener when the view
                */
               $scope.$on('$viewContentLoaded', function() {
                   console.log('view Content Loaded...');

                   $scope.collection = new BiodiversityCollection();
                   $scope.collection.get( $stateParams.id );
               });

               $scope.$on('BIODIVERSITY_COLLECTION_SAVE', function(){
                   console.log('collection updating..');

                   $scope.collection.update();
               });

               $scope.$on('BIODIVERSITY_LOADED', function(){
                    console.log('Collection Loaded');
               });

               $scope.$on('BIODIVERSITY_UPDATED', function(){
                   console.log('updated');

                   if($scope.image != null)
                       addImage();

                   toastr.success($translate.instant('BIODIVERSITY_COLLECTION_SAVED'), $translate.instant('SUCCESS'));
               });

               $scope.$on('ATTACH_FILE', function( evt, data ){
                   console.log('here');
                    $scope.image = data;
               });

               $scope.$on('IMAGE_ADDED', function(){
                   $scope.image = null;
               });

               $scope.$on('EDIT_COLLECTION', function() {
                   $scope.editMode = true;
                   $scope.$apply();
               });

               $scope.$on('CANCEL_EDIT_COLLECTION', function() {
                   $scope.editMode = false;
                   $scope.$apply();
               });

               $scope.$on('SAVE_COLLECTION', function() {
                   $scope.editMode = false;
                   $scope.$apply();
               });

               function addImage(){

                   $scope.collection.addImage($scope.image, function(data, status){

                       if(status >= 200 && status <= 299){
                           $scope.image = null;
                           toastr.success($translate.instant('MEDIA_ADDED'), $translate.instant('SUCCESS'));
                       }else{
                           toastr.error(data.error, $translate.instant('ERROR'));
                       }
                   });
               }

           }
    ];
});