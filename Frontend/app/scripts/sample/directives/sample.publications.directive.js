define(['angularAMD','waypoints'], function (angularAMD) {

    'use strict';

    angularAMD.directive('samplePublications', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/sample/publications.tpl.html',
                scope: { display : '@' },
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.editMode = $rootScope.editMode;
                        $scope.sample = $scope.$parent.sample;

                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
