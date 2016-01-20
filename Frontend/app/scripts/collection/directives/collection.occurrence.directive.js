/**
 * Collection occurrence directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/directives/core.map.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('occurrence', ['$timeout', '$rootScope', '$stateParams', '$http', function ($timeout, $rootScope, $stateParams, $http) {

            return {
                restrict: 'EA',
                templateUrl: 'views/collection/occurrence.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate', function($scope, $rootScope, $stateParams, $translate){

                    var points = {
                        "type": "Feature",
                        "properties": {
                            "name": "Collection Occurrence"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-104.99404, 39.75621]
                        }
                    };

                }],
                link: function (scope, element, attrs) {

                }
            };
    }]);
});
