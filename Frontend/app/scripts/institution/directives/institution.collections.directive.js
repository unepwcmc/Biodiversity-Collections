define(['angularAMD', 'core/factory/biodiversityCollectionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionCollections', ['$timeout', '$rootScope' , '$stateParams', 'BiodiversityCollection',

        function ($timeout, $rootScope , $stateParams, BiodiversityCollection) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/collections.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate', '$http', 'toastr',
                    function($scope, $rootScope, $stateParams, $state, $translate, $http, toastr) {

                        $scope.collectionSelected = null;
                        $scope.collections = new BiodiversityCollection();
                        $scope.newCollection = new BiodiversityCollection();
                        angular.extend( $scope.collections, { totalElements : 0, number: 0, size: 5, totalPages: 0} );

                        if($stateParams.id != undefined)
                            $scope.collections.loadByInstitution( $stateParams.id,  $scope.collections.number, $scope.collections.size);

                        $scope.$on('INSTITUTION_COLLECTION_LOADED', function(  ) {
                            console.log('Collections Loaded...');
                        });

                        $scope.paginateInstitutionCollections = function(page, size){

                            if($stateParams.id != undefined){
                                $scope.collections.loadByInstitution( $stateParams.id,  page, size);
                            }
                        };

                        $scope.collectionAutocomplete = function( userInputString, timeoutPromise ) {
                            if(userInputString == null)
                                return null;
                            return $http.get( $rootScope.getHost() + "collections/search/not/institution/" + $stateParams.id + "/collection/" + userInputString ,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        };

                        $scope.addCollection = function(){
                            if ($scope.collectionSelected != null){
                                $scope.institution.addCollection( $stateParams.id, $scope.collectionSelected.originalObject.id, function( data, status) {
                                    if(status === 200){
                                        angular.extend( data, $scope.institution);
                                        toastr.success($translate.instant('COLLECTION_ADDED_TO_INSTITUTION'), $translate.instant('SUCCESS'));
                                        $scope.collections.loadByInstitution( $stateParams.id,  $scope.collections.number, $scope.collections.size);
                                    } else {
                                        toastr.success($translate.instant('COLLECTION_ADDED_TO_INSTITUTION_ERROR'), $translate.instant('ERROR'));
                                    }
                                });
                                $scope.collectionSelected = null;
                                $scope.$broadcast('angucomplete-alt:clearInput', 'institution_collection_autocomplete');
                            }
                        };

                        $scope.removeCollection = function( collectionId ){
                            if ($scope.collections.number > 0) {
                                if( (($scope.collections.totalElements - 1) % $scope.collections.size) == 0){
                                    $scope.collections.number = $scope.collections.number - 1;
                                    $scope.collections.totalPages = $scope.collections.totalPages - 1;
                                }
                            }
                            $scope.institution.removeCollection( $stateParams.id, collectionId , function( data, status){
                                if(status === 200){
                                    toastr.success($translate.instant('COLLECTION_REMOVED_TO_INSTITUTION'), $translate.instant('SUCCESS'));
                                    $scope.collections.loadByInstitution( $stateParams.id,  $scope.collections.number, $scope.collections.size);
                                } else {
                                    toastr.success($translate.instant('COLLECTION_REMOVED_TO_INSTITUTION_ERROR'), $translate.instant('ERROR'));
                                }
                            });
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
                        scope.collections.size = parseInt($(this).val());
                        scope.paginateInstitutionCollections(scope.collections.number, $(this).val())
                    });
                }
            };
        }]);
});
