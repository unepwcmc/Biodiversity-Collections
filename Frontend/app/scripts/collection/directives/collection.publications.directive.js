/**
 * Collection Sample directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/documentFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('publications', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','Document',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, Document) {

            return {
                restrict: 'E',
                templateUrl: 'views/collection/publications.tpl.html',
                scope:{
                    collection: '='
                },
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.page  = {totalElements : 0, number: 0, size: 10, totalPages: 0};
                        $scope.documents = new Document();
                        $scope.documents.load($scope.collection, $scope.page.number, $scope.page.size);

                        $scope.$on('NETWORK_LOADED', function( ) {
                            console.log('Networks Loaded...');

                            $scope.page.number = $scope.documents.number;
                            $scope.page.size = $scope.documents.size;
                            $scope.page.totalPages = $scope.documents.totalPages;
                            $scope.page.totalElements = $scope.documents.totalElements;
                        });

                        $scope.paginate = function(page, size){
                            $scope.documents.load($scope.collection , page, size);
                        };

                    }],
                link: function (scope, element, attrs) {

                    $("#network-size-box").change(function() {
                        scope.page.size = parseInt($(this).val());
                        scope.paginate(scope.number, $(this).val())
                    });
                }
            };
        }]);
});
