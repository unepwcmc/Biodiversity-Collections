define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionCollections', ['$timeout', '$rootScope' , '$stateParams',

        function ($timeout, $rootScope , $stateParams) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/collections.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        angular.extend( $scope.institution, { collections:{totalElements : 0, number: 0, size: 5, totalPages: 0}});
                        $scope.institution.loadCollectionsByInstitution( $stateParams.id,  $scope.institution.collections.number, $scope.institution.collections.size);

                        $scope.$on('INSTITUTION_COLLECTION_LOADED', function(  ) {
                            console.log('Collections Loaded...');
                        });

                        $scope.paginateInstitutionCollections = function(page, size){
                            $scope.institution.loadCollectionsByInstitution( $stateParams.id,  $scope.institution.collections.number, $scope.institution.collections.size);
                        };

                    }],
                link: function (scope, element, attrs) {

                    $("#institution-collections-size-box").change(function() {
                        scope.institution.collections.size = parseInt($(this).val());
                        scope.paginateInstitutionCollections(scope.institution.collections.number, $(this).val())
                    });
                }
            };
        }]);
});
