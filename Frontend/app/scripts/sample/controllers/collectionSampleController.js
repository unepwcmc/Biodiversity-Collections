define(['app', 'waypoints',
    'sample/directives/sample.details.directive',
    'sample/directives/sample.taxonomy.directive',
    'core/directives/core.publications.directive',
    'core/factory/sampleFactory',
    'core/factory/biodiversityCollectionFactory',
    'core/directives/core.breadcrumbs.directive','core/directives/core.paging.directive'], function () {

    'use strict';

    return ['$scope', '$rootScope', '$stateParams', '$state', '$translate', 'toastr', 'BaseController', 'Sample', 'BiodiversityCollection','Image',
        function ($scope, $rootScope, $stateParams, $state, $translate, toastr, BaseController, Sample, BiodiversityCollection, Image) {

            angular.extend($scope, BaseController);

            $scope.sample = new Sample();
            angular.extend($scope.sample,{totalElements : 0, number: 0, size: 20, totalPages: 0});
            $scope.collection = new BiodiversityCollection();

            $rootScope.editMode = true;
            $scope.navigationBar = true;
            $scope.createSample = true;
            $scope.generatedSample = false;
            $scope.searchTerm = '';
            $scope.fromState = 'home';

            $scope.collection_id = undefined;

            /**
             * Listener when the state is changed
             */
            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                console.log('state Change Success');

                $scope.fromState = fromState.name;

                if ($scope.fromState == 'collection')
                    $scope.collection_id = fromParams.id;


                $scope.generatedSample = true;

                $('#loader-wrapper').fadeToggle('400');
                if ($stateParams.sampleId) {
                    $scope.sample.get($stateParams.sampleId);
                } else {
                    $scope.collection.get($stateParams.id);
                }
            });

            $scope.cancel = function () {
                $('#loader-wrapper').fadeToggle('400');
                $scope.sample.delete();
            };

            $scope.addSelectedSamples = function () {
                var checked = $('input:checked').filter('.chk-samples');
                var samples = [];
                angular.forEach(checked, function (obj) {
                    this.push(obj.value);
                }, samples);
                $('#loader-wrapper').fadeToggle('400');
                $scope.collection.addSamples($stateParams.id, samples);
            };

            $scope.create = function () {
                $scope.sample.collection = {id: $stateParams.id};
                $('#loader-wrapper').fadeToggle('400');

                if ($scope.image != null) {
                    var imageService = new Image();

                    imageService.save( $scope.image, function( data, status){

                        $scope.sample.image = data;
                        $scope.sample.update();
                    });
                } else {
                    $scope.sample.update();
                }
            };

            $scope.load = function( page ) {
                $('#loader-wrapper').fadeToggle('400');
                $scope.sample.search($scope.searchTerm, page, $scope.sample.size);
            };

            $scope.search = function () {
                $('#loader-wrapper').fadeToggle('400');
                $scope.sample.search($scope.searchTerm, $scope.sample.number, $scope.sample.size);
            };

            $scope.checkAndUnCheckAll = function () {
                $("input[type=checkbox].chk-samples").each(function () {
                    $(this).prop('checked', !$(this).prop('checked'));
                });

            };

            new Waypoint({
                element: $("#collection-sample-bar-default"),
                handler: function (direction) {
                    switch (direction) {
                        case 'down':
                            if ($scope.navigationBar)
                                $("#collection-sample-bar-fixed").show();
                            break;
                        case 'up':
                            $("#collection-sample-bar-fixed").hide();
                            break;
                        default:
                    }
                }
            });

            new Waypoint({
                element: $("#collection-sample-search-bar-default"),
                handler: function (direction) {
                    switch (direction) {
                        case 'down':
                            if ($scope.navigationBar)
                                $("#collection-sample-search-bar-fixed").show();
                            break;
                        case 'up':
                            $("#collection-sample-search-bar-fixed").hide();
                            break;
                        default:
                    }
                }
            });

            $scope.$on('SAMPLE_UPDATED', function () {
                $('#loader-wrapper').fadeToggle('400');
                $scope.image = null;
                $state.go('sample', {id: $scope.sample.id});
            });

            $scope.$on('SAMPLE_DELETED', function () {
                $('#loader-wrapper').fadeToggle('400');
                $state.go('collection', $stateParams);
            });

            $scope.$on('SAMPLE_SEARCHED', function () {
                $('#loader-wrapper').fadeToggle('400');
            });

            $scope.$on('SAMPLE_LOADED', function( ) {
                $('#loader-wrapper').fadeToggle('400');
            });

            $scope.$on('BIODIVERSITY_SAMPLES_ADDED', function () {
                $('#loader-wrapper').fadeToggle('400');
                toastr.success($translate.instant('BIODIVERSITY_SAMPLES_ADDED'), $translate.instant('SUCCESS'));
            });

            $scope.$on('BIODIVERSITY_LOADED', function () {
                $scope.sample.collection = $scope.collection;
                $scope.sample.institution = $scope.collection.institution;
                $scope.sample.save();
            });

            /**
             * Listener when a file is loaded from the user.
             */
            $scope.$on('ATTACH_FILE', function( evt, data ){
                $scope.image = data;
            });

        }];
});