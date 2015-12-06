define(['app',
    'core/factory/biodiversityCollectionFactory',
    'core/factory/networkFactory',
    'core/factory/curatorFactory',
    'core/factory/institutionFactory'], function () {

    'use strict';

    return ['$scope','BaseController', '$stateParams','$http','$rootScope','BiodiversityCollection','Network', 'Institution','Curator',

        function ($scope, BaseController, $stateParams, $http, $rootScope, BiodiversityCollection, Network, Institution, Curator) {

            angular.extend($scope, BaseController);

            $scope.collection = new BiodiversityCollection();
            $scope.network = new Network();
            $scope.institution = new Institution();
            $scope.curator = new Curator();

            $scope.page = 0;
            $scope.size = 10;
            $scope.name = '';
            $scope.type = '';
            $scope.searchType = 'collection';
            $scope.query = '';


            /**
             * Listener when the state is changed
             */
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');



                if ($scope.searchType === "collection") {
                    $scope.collection.search( $scope.query, $scope.page, $scope.size );
                } else if ($scope.searchType === "institution") {
                    $scope.institution.search( $scope.query, $scope.page, $scope.size );
                } else if ($scope.searchType === "network") {
                    $scope.network.search($scope.query, $scope.page, $scope.size);
                } else if ($scope.searchType === "curator") {
                    $scope.curator.search( $scope.query, $scope.page, $scope.size );
                }
            });

            $scope.$on('BIODIVERSITY_SEARCHED', function(){

                $('#loader-wrapper').fadeToggle('400');
            });

            $scope.$on('NETWORK_SEARCHED', function(){

                $('#loader-wrapper').fadeToggle('400');
            });

            $scope.$on('INSTITUTION_SEARCHED', function(){

                $('#loader-wrapper').fadeToggle('400');
            });

            $scope.$on('CURATOR_SEARCHED', function(){

                $('#loader-wrapper').fadeToggle('400');
            });

            $scope.$on('$viewContentLoaded', function() {

                console.log('view Content Loaded...');

                $scope.setResultQuery( $stateParams.term );
                $scope.searchType = $stateParams.type;
                $scope.query = $stateParams.term;
            });

            $scope.load = function(page, size) {

                $('#loader-wrapper').fadeToggle('400');

                if ($scope.searchType === "collection") {
                    $scope.collection.search( $scope.query, $scope.page, $scope.size );
                } else if ($scope.searchType === "institution") {
                    $scope.institution.search( $scope.query, $scope.page, $scope.size );
                } else if ($scope.searchType === "network") {
                    $scope.network.search($scope.query, $scope.page, $scope.size);
                } else if ($scope.searchType === "curator") {
                    $scope.curator.search( $scope.query, $scope.page, $scope.size );
                }

            };

            $scope.selectCurrentSearchView = function() {

                if ($stateParams.type === "collection") {
                    return 'views/search/collections.tpl.html'
                } else if ($stateParams.type === "institution") {
                    return 'views/search/institutions.tpl.html'
                } else if ($stateParams.type === "network") {
                    return 'views/search/network.tpl.html'
                }else if ($stateParams.type === "curator") {
                    return 'views/search/curator.tpl.html'
                } else {
                    return;
                }

            };

        }];
});