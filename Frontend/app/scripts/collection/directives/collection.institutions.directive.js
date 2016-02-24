/**
 * Collection Institutions directive
 * @author Fernando Medeiros
 * @email fernandoericofilho@integritas.com.br
 *
 */
define(['angularAMD','core/factory/institutionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutions', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','Institution',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, Institution) {

            return {
                restrict: 'EA',
                templateUrl: 'views/collection/institutions.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.page  = {totalElements : 0, number: 0, size: 10, totalPages: 0};
                        $scope.institutions = new Institution();
                        $scope.institutions.load( $stateParams.id,  $scope.page.number, $scope.page.size);

                        $scope.$on('INSTITUTION_LOADED', function( ) {
                            console.log('Institution Loaded...');

                            $scope.page.number = $scope.institutions.number;
                            $scope.page.size = $scope.institutions.size;
                            $scope.page.totalPages = $scope.institutions.totalPages;
                            $scope.page.totalElements = $scope.institutions.totalElements;
                        });

                        $scope.paginate = function(page, size){
                            $scope.institutions.load( $stateParams.id , page, size);
                        };

                    }],
                link: function (scope, element, attrs) {

                    $("#institution-size-box").change(function() {
                        scope.page.size = parseInt($(this).val());
                        scope.paginate(scope.number, $(this).val())
                    });
                }
            };
    }]);
});
