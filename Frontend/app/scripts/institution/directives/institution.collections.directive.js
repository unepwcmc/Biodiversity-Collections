define(['angularAMD','waypoints','core/factory/biodiversityCollectionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionCollections', ['$timeout', '$rootScope', 'BiodiversityCollection', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, BiodiversityCollection, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/collections.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.page  = {totalElements : 0, number: 0, size: 10, totalPages: 0};
                        $scope.collections = new BiodiversityCollection();
                        $scope.institution.loadCollectionsByInstitution( $stateParams.id,  $scope.collections.number, $scope.collections.size);

                        $scope.$on('INSTITUTION_COLLECTION_LOADED', function( data ) {
                            console.log('Institution Loaded...');

                            $scope.page.number = $scope.collections.number;
                            $scope.page.size = $scope.collections.size;
                            $scope.page.totalPages = $scope.collections.totalPages;
                            $scope.page.totalElements = $scope.collections.totalElements;
                        });

                        $scope.paginateCollections = function(page, size){
                            $scope.collections.loadByCollection( $stateParams.id , page, size);
                        };


                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
