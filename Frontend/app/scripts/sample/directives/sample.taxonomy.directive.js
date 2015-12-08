define(['angularAMD','waypoints'], function (angularAMD) {

    'use strict';

    angularAMD.directive('sampleTaxonomy', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                scope: { display : '@' },
                templateUrl: 'views/sample/taxonomy.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){


                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
