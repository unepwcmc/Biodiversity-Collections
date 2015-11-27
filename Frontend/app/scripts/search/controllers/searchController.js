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
            $scope.type = '';

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

                var term = $stateParams.term;
                var type = $stateParams.type;

                if (type === "collection") {
                    $scope.collection.search( term, $scope.page, $scope.size );
                } else if (type === "institution") {
                    $scope.institution.search( term, $scope.page, $scope.size );
                } else if (type === "network") {
                    $scope.network.search( term, $scope.page, $scope.size );
                } else {
                    return;
                }

            });

            $scope.load = function(page, size) {
                $scope.collection.search( $stateParams.term, page, size );
            };

            $scope.selectCurrentSearchView = function() {

                if ($stateParams.type === "collection") {
                    return 'views/search/collections.tpl.html'
                } else if ($stateParams.type === "institution") {
                    return 'views/search/institutions.tpl.html'
                } else if ($stateParams.type === "network") {
                    return 'views/search/network.tpl.html'
                } else {
                    return;
                }

            };

        }];
});