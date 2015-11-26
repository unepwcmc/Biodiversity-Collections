define(['app', 'core/factory/biodiversityCollectionFactory','core/directives/core.breadcrumbs.directive'], function () {

    'use strict';

    return ['$scope','BaseController', '$stateParams','$http','$rootScope','BiodiversityCollection',

        function ($scope, BaseController, $stateParams, $http, $rootScope,BiodiversityCollection) {

            angular.extend($scope, BaseController);

            $scope.collection = new BiodiversityCollection();
            $scope.page = 0;
            $scope.size = 20;

            /**
             * Listener when the state is changed
             */
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');
            });

            $scope.$on('BIODIVERSITY_SEARCHED', function(){

                $('#loader-wrapper').fadeToggle('400');
            });

            $scope.$on('$viewContentLoaded', function() {
                console.log('view Content Loaded...');

                $scope.setResultQuery( $stateParams.term );
                $scope.collection.search( $stateParams.term, $scope.page, $scope.size );
            });

            $scope.load = function(page, size) {
                $scope.collection.search( $stateParams.term, page, size );
            };

        }];
});