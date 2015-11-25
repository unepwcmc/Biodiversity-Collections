/**
 * Collection Sample directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/documentFactory','core/directives/core.table.sorter.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('publications', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','Document',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, Document) {

            return {
                restrict: 'EA',
                templateUrl: 'views/collection/publications.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.documents = new Document();
                        angular.extend($scope.documents, {totalElements : 0, number: 0, size: 5, totalPages: 0});
                        $scope.documents.load($stateParams.id, $scope.documents.number, $scope.documents.size);

                        $scope.$on('NETWORK_LOADED', function( ) {
                            console.log('Publications Loaded...');
                        });

                        $scope.paginatePublications = function(page, size){
                            $scope.documents.load( $stateParams.id , page, size);
                        };

                    }],
                link: function (scope, element, attrs) {

                    $("#publication-size-box").change(function() {
                        scope.documents.size = parseInt($(this).val());
                        scope.paginatePublications(scope.documents.number, parseInt($(this).val()))
                    });
                }
            };
        }]);
});
