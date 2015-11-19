define(['app','collection/directives/collection.networks.directive',
              'collection/directives/collection.details.directive',
              'collection/directives/collection.publications.directive',
              'collection/directives/collection.samples.directive',
              'collection/directives/collection.specimens.directive',
              'core/factory/biodiversityCollectionFactory'], function () {

    'use strict';

    return ['$scope','BaseController', 'BiodiversityCollection','$stateParams',

           function ($scope, BaseController, BiodiversityCollection, $stateParams) {
                angular.extend($scope, BaseController);

                $scope.collection = new BiodiversityCollection();

               /**
                * Listener when the view
                */
               $scope.$on('$viewContentLoaded', function() {
                   console.log('view Content Loaded...');

                   $scope.id = $stateParams.id;
                   $scope.collection.get( $scope.id);
               });

                $scope.info('Welcome to Collection Page');
           }
    ];
});