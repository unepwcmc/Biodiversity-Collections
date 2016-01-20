/**
 * Directive Ask for support
 *
 */
define(['angularAMD','bootstrap'], function (angularAMD) {

    'use strict';

    angularAMD.directive('askForSupport', ['$rootScope','$http','toastr', '$translate',
        function ($rootScope, $http, toastr, $translate) {

            return {
                restrict: 'E',
                templateUrl: 'views/core/ask.support.tpl.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope){


                        $scope.sendMessage = function(){

                            $http.post( $rootScope.getHost() + "users/ask/support", $scope.support )
                                .success( function (data, status, headers, config) {

                                    $('#support_modal').modal('hide');
                                    toastr.success($translate.instant('MESSAGE_SENT'), $translate.instant('SUCCESS'));
                                    $scope.support = {};
                                })
                                .error(function(data, status, headers, config){
                                    console.error('error');
                                }
                            );
                        }

                }],
                link: function (scope, element, attrs) {

                    scope.$on('ASK_FOR_SUPPORT_EVENT', function(){
                        $('#support_modal').modal('show');
                    });
                }
            };
    }]);
});
