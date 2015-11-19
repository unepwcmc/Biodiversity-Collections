define(['app','collection/directives/collection.networks.directive',
              'collection/directives/collection.details.directive',
              'collection/directives/collection.publications.directive',
              'collection/directives/collection.samples.directive',
              'collection/directives/collection.specimens.directive'], function () {

    'use strict';

    return ['$scope','BaseController','$stateParams','$http','$rootScope',

           function ($scope, BaseController, $stateParams, $http, $rootScope) {
                angular.extend($scope, BaseController);

               /**
                * Listener when the view
                */
               $scope.$on('$viewContentLoaded', function() {
                   console.log('view Content Loaded...');

                   $scope.id = $stateParams.id;
               });
           }
    ];
});