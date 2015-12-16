define(['app', 'member/directives/member.item.directive'], function () {

    'use strict';

    return ['$scope','BaseController','$stateParams','$http','$rootScope','Institution','toastr','$translate','$state',

        function ($scope, BaseController, $stateParams, $http, $rootScope, Institution, toastr, $translate, $state) {
            angular.extend($scope, BaseController);

        }
    ];
});