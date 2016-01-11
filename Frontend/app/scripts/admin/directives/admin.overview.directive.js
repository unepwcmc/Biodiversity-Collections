/**
 *  Admin Overview
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','bootstrap'], function (angularAMD) {

    'use strict';

    angularAMD.directive('adminOverview', ['$timeout', '$rootScope', '$stateParams', '$state', '$window', '$http', '$cookies','toastr','$location', function ($timeout, $rootScope, $stateParams, $state, $window, $http, $cookies, toastr,$location) {

            return {
                restrict: 'EA',
                templateUrl: 'views/admin/overview.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate',  function($scope, $rootScope, $stateParams, $state, $translate){

                        $scope.invite = { url: $location.host() + ":" + $location.port()};

                        $scope.institutionSelected = null;

                        $scope.institutionAutocomplete = function( userInputString, timeoutPromise){
                            return $http.get( $rootScope.getHost() + "institutions/search/autocompleteName?name=" + userInputString,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        };

                        $scope.institutionSelectedFn = function(selected) {
                            if (selected) {
                                $scope.invite.institution = selected.originalObject.id;
                            }
                        };


                        $scope.$on('ADMIN_OVERVIEW_TAB', function(){
                            console.log('overview tab');
                        });

                        $scope.inviteCurator = function(){

                            console.log($scope.invite);

                            $http.post( $rootScope.getHost() + "curators/invite", $scope.invite )
                                .success( function (data, status, headers, config) {

                                    $('#invite_curator').modal('hide');
                                    toastr.success('SUCCESS', 'INVITE_SENT');
                                    $scope.invite = {email: null, institution:null};
                                })
                                .error(function(data, status, headers, config){
                                    console.error('error');
                                }
                            );
                        }

                    }],
                link: function (scope, element, attrs) {

                    $('a.btn_invite_curator').click(function(){
                        $('#invite_curator').modal('show');
                    });

                }
            };
        }]);
});
