/**
 * Collection Details directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/biodiversityCollectionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('collectionDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','BiodiversityCollection',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, BiodiversityCollection) {

            return {
                restrict: 'E',
                templateUrl: 'views/collection/details.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.collection = new BiodiversityCollection();
                        $scope.collection.get( $stateParams.id );
                        $scope.curators = null;

                        $scope.$on('BIODIVERSITY_LOADED', function() {
                            console.log('collection loaded...');

                            $scope.collection.curator( $stateParams.id );
                            //$scope.collection.institution($scope.id);
                        });

                        $scope.curatorAutocomplete = function( userInputString, timeoutPromise){

                            return $http.get( $rootScope.getHost() + "curators/search/name?name=" + userInputString,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        }
                    }],
                link: function (scope, element, attrs) {
                    // Empty
                }
            };
        }]);
});
