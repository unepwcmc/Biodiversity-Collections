define(['app',
    'core/factory/biodiversityCollectionFactory',
    'core/factory/networkFactory',
    'core/factory/curatorFactory',
    'core/factory/institutionFactory',
    'core/factory/documentFactory','core/directives/core.paging.directive'], function () {

    'use strict';

    return ['$scope','BaseController','$stateParams','$http','$rootScope','$window','BiodiversityCollection','Network', 'Institution','Curator','Document',

        function ($scope, BaseController, $stateParams, $http, $rootScope, $window, BiodiversityCollection, Network, Institution, Curator, Document) {

            angular.extend($scope, BaseController);

            $scope.collection = new BiodiversityCollection();
            $scope.network = new Network();
            $scope.institution = new Institution();
            $scope.curator = new Curator();
            $scope.document = new Document();

            angular.extend($scope.curator,{totalElements : 0, number: 0, size: 10, totalPages: 0});
            angular.extend($scope.collection,{totalElements : 0, number: 0, size: 10, totalPages: 0});
            angular.extend($scope.institution,{totalElements : 0, number: 0, size: 10, totalPages: 0});
            angular.extend($scope.document,{totalElements : 0, number: 0, size: 10, totalPages: 0});

            $scope.name = '';
            $scope.type = '';
            $scope.searchType = 'collection';
            $scope.query = '';

            $scope.$on('$viewContentLoaded', function() {
                console.log('view Content Loaded...');

                $scope.setResultQuery( $stateParams.term );
                $scope.searchType = $stateParams.type;
                $scope.query = $stateParams.term;
            });
            /**
             * Listener when the state is changed
             */
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');
                search(0);
            });

            angular.forEach(['BIODIVERSITY_SEARCHED','NETWORK_SEARCHED','INSTITUTION_SEARCHED','CURATOR_SEARCHED','DOCUMENT_SEARCHED'],
                function(value){
                $scope.$on(value, function(event){
                    $('#loader-wrapper').fadeToggle('400');
                });
            });

            angular.forEach(['AuthenticationDone','LogoutDone'],
                function(value){
                    $scope.$on(value, function(event){
                        $('#loader-wrapper').fadeToggle('400');
                        $scope.load(0);
                });
            });

            $scope.load = function( page ) {
                search(page);
            };

            $scope.selectCurrentSearchView = function() {

                if ($stateParams.type === "collection") {
                    return 'views/search/collections.tpl.html'
                } else if ($stateParams.type === "institution") {
                    return 'views/search/institutions.tpl.html'
                } else if ($stateParams.type === "network") {
                    return 'views/search/network.tpl.html'
                } else if ($stateParams.type === "curator") {
                    return 'views/search/curators.tpl.html'
                } else if ($stateParams.type === "document") {
                    return 'views/search/documents.tpl.html'
                } else {
                    return;
                }
            };

            function search(page){

                if ($scope.searchType === "collection") {
                    $scope.collection.search( $scope.query, page , $scope.size );
                } else if ($scope.searchType === "institution") {
                    $scope.institution.search( $scope.query, page, $scope.size );
                } else if ($scope.searchType === "network") {
                    $scope.network.search($scope.query, page , $scope.size);
                } else if ($scope.searchType === "curator") {
                    $scope.curator.search( $scope.query, page , $scope.curator.size );
                } else if ($scope.searchType === "document") {
                    $scope.document.search($scope.query, page , $scope.size);
                }
            }

            $scope.downloadDocument = function(id) {
                $window.open($rootScope.getHost() + "documents/" + id + "/download", '_blank');
            };

        }];
});