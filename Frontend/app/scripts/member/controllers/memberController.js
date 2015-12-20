define(['app','core/factory/biodiversityCollectionFactory','member/directives/member.list.directive'], function () {

    'use strict';

    return ['$scope','BiodiversityCollection','BaseController','$stateParams','$http','$rootScope','Institution','toastr','$translate','$state', function ($scope, BiodiversityCollection, BaseController, $stateParams, $http, $rootScope, Institution, toastr, $translate, $state) {
            angular.extend($scope, BaseController);

            $scope.collection = new BiodiversityCollection();

            /**
             * Listener when the view is loaded
             */
            $scope.$on('$viewContentLoaded', function() {
                console.log('view Content Loaded...');

                $('#loader-wrapper').fadeToggle('400');
                $scope.collection.get( $stateParams.id );

            });

        /**
         * Listener when the collection factory receive new
         * biodiversity collection data.
         *
         */
        $scope.$on('BIODIVERSITY_LOADED', function(){
            console.log('Collection Member Loaded');

            $('#loader-wrapper').fadeToggle('400');
        });


    }
    ];
});