define(['app','collection/directives/collection.networks.directive',
              'collection/directives/collection.details.directive',
              'collection/directives/collection.publications.directive',
              'collection/directives/collection.samples.directive',
              'collection/directives/collection.specimens.directive',
              'collection/directives/collection.occurrence.directive',
              'core/factory/biodiversityCollectionFactory'], function () {

    'use strict';

    return ['$scope','BaseController','$stateParams','$http','$rootScope','BiodiversityCollection',

           function ($scope, BaseController, $stateParams, $http, $rootScope,BiodiversityCollection) {
                angular.extend($scope, BaseController);

               $scope.collection = new BiodiversityCollection();
               /**
                * Listener when the view
                */
               $scope.$on('$viewContentLoaded', function() {
                   console.log('view Content Loaded...');

                   $scope.collection.get( $stateParams.id );
               });

               $scope.$on('BIODIVERSITY_COLLECTION_SAVE', function(){
                   console.log('collection updating..');

                   $scope.collection.update();
               });

               $scope.$on('BIODIVERSITY_UPDATED', function(){
                   console.log('updated');
               });
           }
    ];
});