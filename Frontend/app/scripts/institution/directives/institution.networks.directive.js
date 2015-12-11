define(['angularAMD', 'core/factory/networkFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionNetworks', ['$timeout', '$rootScope', '$stateParams', 'Network',

        function ($timeout, $rootScope, $stateParams, Network) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/networks.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate',
                    function($scope, $rootScope, $stateParams, $state, $translate){

                        angular.extend( $scope.institution, { networks:{totalElements : 0, number: 0, size: 5, totalPages: 0}});
                        $scope.institution.loadNetworksByInstitution( $stateParams.id,  $scope.institution.networks.number, $scope.institution.networks.size);

                        $scope.newNetwork = new Network();

                        $scope.$on('INSTITUTION_NETWORK_LOADED', function( ) {
                            console.log('Networks Loaded...');
                        });

                        $scope.paginateInstitutionNetworks = function(page, size){
                            $scope.institution.loadNetworksByInstitution( $stateParams.id,  $scope.institution.networks.number, $scope.institution.networks.size);
                        };

                        $scope.createNewNetwork = function () {
                            $('#loader-wrapper').fadeToggle('400');
                            $scope.newNetwork.save();
                        };

                        $scope.$on('NETWORK_SAVED', function( ) {
                            $('#loader-wrapper').fadeToggle('400');
                            $state.go('network', {id : $scope.newNetwork.id, isNew: true});
                        });


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
