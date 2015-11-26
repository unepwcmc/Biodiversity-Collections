define(['app', 'core/factory/biodiversityCollectionFactory', 'core/factory/networkFactory', 'core/factory/institutionFactory'], function () {

    'use strict';

    return ['$scope','BaseController', '$stateParams','$http','$rootScope','BiodiversityCollection','Network', 'Institution',

        function ($scope, BaseController, $stateParams, $http, $rootScope, BiodiversityCollection, Network, Institution) {

            angular.extend($scope, BaseController);

            $scope.collection = new BiodiversityCollection();
            $scope.network = new Network();
            $scope.institution = new Institution();

            $scope.page = 0;
            $scope.size = 20;
            $scope.name = '';
            $scope.type = ''

            $scope.$on('$viewContentLoaded', function() {

                console.log('view Content Loaded...');

                var term = $stateParams.term;
                var type = $stateParams.type;

                if ($scope.search.type === "collection") {
                    $scope.collection.search( $stateParams.term, $scope.page, $scope.size );
                } else if ($scope.search.type === "institution") {
                    $scope.institution.search( $stateParams.term, $scope.page, $scope.size );
                } else if ($scope.search.type === "network") {
                    $scope.network.search( $stateParams.term, $scope.page, $scope.size );
                } else {
                    return;
                }

                $scope.collection.search( $stateParams.term, $scope.page, $scope.size );
            });

            $scope.load = function(page, size) {
                $scope.collection.search( $stateParams.term, page, size );
            };

            $scope.selectCurrentSearchView = function() {

                if ($scope.search.type === "collection") {
                    return 'views/search/collections.tpl.html'
                } else if ($scope.search.type === "institution") {
                    return 'views/search/institutions.tpl.html'
                } else if ($scope.search.type === "network") {
                    return 'views/search/network.tpl.html'
                } else {
                    return;
                }

            };

        }];
});