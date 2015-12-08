define(['app', 'waypoints',
    'sample/directives/sample.details.directive',
    'sample/directives/sample.taxonomy.directive',
    'core/directives/core.publications.directive',
    'core/factory/sampleFactory',
    'core/factory/biodiversityCollectionFactory'], function () {

    'use strict';

    return ['$scope','$rootScope','$stateParams','$state','$translate','toastr','BaseController','Sample','BiodiversityCollection',
        function ($scope, $rootScope, $stateParams, $state, $translate, toastr, BaseController, Sample, BiodiversityCollection) {

        angular.extend($scope, BaseController);

        $scope.sample = new Sample();
        $scope.collection = new BiodiversityCollection();

        $rootScope.editMode = true;
        $scope.navigationBar = true;
        $scope.createSample = true;
        $scope.searchTerm = '';
        $scope.page = 0;
        $scope.size = 20;

        /**
         * Listener when the state is changed
         */
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            console.log('state Change Success');
            $('#loader-wrapper').fadeToggle('400');
        });

        $scope.search = function() {
            $('#loader-wrapper').fadeToggle('400');
            $scope.sample.search($scope.searchTerm, $scope.page, $scope.size);
        };

        $scope.cancel = function() {
            $state.go('collection', $stateParams);
        };

        $scope.addSelectedSamples = function() {
            var checked = $('input:checked').filter('.chk-samples');
            var samples = [];
            angular.forEach(checked, function(obj) {
                this.push(obj.value);
            },samples);
            $('#loader-wrapper').fadeToggle('400');
            $scope.collection.addSamples($stateParams.id, samples);
        };

        $scope.create = function() {
            $scope.sample.collection = { id : $stateParams.id };
            $('#loader-wrapper').fadeToggle('400');
            $scope.sample.save();
        };

        $scope.checkAndUnCheckAll = function(){
            $("input[type=checkbox].chk-samples").each(function () {
                $(this).prop('checked', !$(this).prop('checked'));
            });

        };

        new Waypoint({
            element: $("#collection-sample-bar-default"),
            handler: function( direction ) {
                switch(direction) {
                    case 'down':
                        if($scope.navigationBar)
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
            handler: function( direction ) {
                switch(direction) {
                    case 'down':
                        if($scope.navigationBar)
                            $("#collection-sample-search-bar-fixed").show();
                        break;
                    case 'up':
                        $("#collection-sample-search-bar-fixed").hide();
                        break;
                    default:
                }
            }
        });

        $scope.$on('SAMPLE_SAVED', function() {
            $('#loader-wrapper').fadeToggle('400');
            $state.go('collection', $stateParams);
        });

        $scope.$on('BIODIVERSITY_SAMPLES_ADDED', function() {
            $('#loader-wrapper').fadeToggle('400');
            toastr.success($translate.instant('BIODIVERSITY_SAMPLES_ADDED'), $translate.instant('SUCCESS'));
        });

        $scope.$on('SAMPLE_SEARCHED', function() {
            $('#loader-wrapper').fadeToggle('400');
        });

    }];
});