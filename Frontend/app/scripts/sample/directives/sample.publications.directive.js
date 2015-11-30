define(['angularAMD','waypoints'], function (angularAMD) {

    'use strict';

    angularAMD.directive('samplePublications', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/sample/publications.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){


                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
