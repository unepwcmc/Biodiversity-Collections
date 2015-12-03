define(['angularAMD','waypoints','core/directives/core.map.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('networkCollections', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/network/collections.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.$on('NETWORK_LOADED_BY_ID', function() {
                            var markersArray = {};
                            angular.forEach($scope.network.collections, function(value) {
                                if (value.contact)
                                    markersArray[value.id] = {
                                        lat: value.contact.latitude,
                                        lng: value.contact.longitude
                                    };
                                });

                            $timeout( function() {
                                $rootScope.$broadcast('MAP_POINTS_UPDATED', 'collections', markersArray);
                            }, 3000);

                        });

                    }],
                link: function (scope, element, attrs) {


                }
            };
        }]);
});
