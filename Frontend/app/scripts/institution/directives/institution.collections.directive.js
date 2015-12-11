define(['angularAMD', 'core/factory/biodiversityCollectionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionCollections', ['$timeout', '$rootScope' , '$stateParams', 'BiodiversityCollection',

        function ($timeout, $rootScope , $stateParams, BiodiversityCollection) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/collections.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate',
                    function($scope, $rootScope, $stateParams, $state, $translate){

                        angular.extend( $scope.institution, { collections:{totalElements : 0, number: 0, size: 5, totalPages: 0}});
                        $scope.institution.loadCollectionsByInstitution( $stateParams.id,  $scope.institution.collections.number, $scope.institution.collections.size);

                        $scope.newCollection = new BiodiversityCollection();

                        $scope.$on('INSTITUTION_COLLECTION_LOADED', function(  ) {
                            console.log('Collections Loaded...');
                        });

                        $scope.paginateInstitutionCollections = function(page, size){
                            $scope.institution.loadCollectionsByInstitution( $stateParams.id,  $scope.institution.collections.number, $scope.institution.collections.size);
                        };

                        $scope.createNewCollection = function () {
                            $('#loader-wrapper').fadeToggle('400');
                            $scope.newCollection.save();
                        };

                        $scope.$on('BIODIVERSITY_SAVED', function( ) {
                            $('#loader-wrapper').fadeToggle('400');
                            $state.go('collection', {id : $scope.newCollection.id, isNew: true});
                        });

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
