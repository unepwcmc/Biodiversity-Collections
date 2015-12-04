define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionNetworks', ['$timeout', '$rootScope', '$stateParams',

        function ($timeout, $rootScope, $stateParams) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/networks.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        angular.extend( $scope.institution, { networks:{totalElements : 0, number: 0, size: 5, totalPages: 0}});
                        $scope.institution.loadNetworksByInstitution( $stateParams.id,  $scope.institution.networks.number, $scope.institution.networks.size);

                        $scope.$on('INSTITUTION_NETWORK_LOADED', function( ) {
                            console.log('Networks Loaded...');
                        });

                        $scope.paginateInstitutionNetworks = function(page, size){
                            $scope.institution.loadNetworksByInstitution( $stateParams.id,  $scope.institution.networks.number, $scope.institution.networks.size);
                        };

                    }],
                link: function (scope, element, attrs) {

                    $("#institution-network-size-box").change(function() {
                        scope.institution.networks.size = parseInt($(this).val());
                        scope.paginateInstitutionNetworks(scope.institution.networks.number, $(this).val())
                    });
                }
            };
        }]);
});
