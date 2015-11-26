define(['app', 'core/factory/biodiversityCollectionFactory', 'core/factory/networkFactory'], function () {

    'use strict';

    return ['$scope','BaseController', '$stateParams','$http','$rootScope','BiodiversityCollection','Network',

        function ($scope, BaseController, $stateParams, $http, $rootScope, BiodiversityCollection, Network) {

            angular.extend($scope, BaseController);

            $scope.collection = new BiodiversityCollection();
            $scope.network = new Network();

            $scope.page = 0;
            $scope.size = 20;
            $scope.name = '';
            $scope.type = ''

            $scope.$on('$viewContentLoaded', function() {

                console.log('view Content Loaded...');

                var term = $stateParams.term;
                var type = $stateParams.type;

                //ajustar a consulta para pegar os outros resultado

                if ($scope.search.type === "collection") {
                    $scope.collection.search( $stateParams.term, $scope.page, $scope.size );
                } else if ($scope.search.type === "institution") {
                    //$state.go('search', { term : term, type : type });
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