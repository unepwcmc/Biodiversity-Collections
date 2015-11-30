define(['app',
    'institution/directives/institution.details.directive',
    'institution/directives/institution.contact.directive',
    'institution/directives/institution.collections.directive',
    'institution/directives/institution.networks.directive',
    'core/directives/core.breadcrumbs.directive'], function () {

    'use strict';

    return ['$scope','BaseController','$stateParams','$http','$rootScope','Institution','toastr','$translate','$state',

        function ($scope, BaseController, $stateParams, $http, $rootScope, Institution, toastr, $translate, $state) {
            angular.extend($scope, BaseController);

            $scope.info('Welcome to Sample Page');
            $scope.institution = undefined;

            /**
             * Listener when the view is loaded
             */
            $scope.$on('$viewContentLoaded', function() {
                console.log('view Content Loaded...');

                $scope.institution = new Institution();
                $scope.institution.get( $stateParams.id );
                $('#loader-wrapper').fadeToggle('400');

            });
        }
    ];
});