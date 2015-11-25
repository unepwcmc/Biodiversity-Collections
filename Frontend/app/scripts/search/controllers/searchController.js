define(['app', 'core/factory/biodiversityCollectionFactory'], function () {

    'use strict';

    return ['$scope','BaseController', '$stateParams','$http','$rootScope','BiodiversityCollection',

        function ($scope, BaseController, $stateParams, $http, $rootScope,BiodiversityCollection) {

            angular.extend($scope, BaseController);

            $scope.collection = new BiodiversityCollection();
            $scope.page = 0;
            $scope.size = 20;

            $scope.$on('$viewContentLoaded', function() {
                console.log('view Content Loaded...');
                 console.log('$scope.$on')
                $scope.collection.search( $stateParams.term, $scope.page, $scope.size );
            });

            $scope.load = function(page, size) {
                console.log('$scope.load')
                $scope.collection.search( $stateParams.term, page, size );
            };

        }];
});