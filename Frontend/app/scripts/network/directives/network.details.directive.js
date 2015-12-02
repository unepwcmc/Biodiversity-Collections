define(['angularAMD','waypoints'], function (angularAMD) {

    'use strict';

    angularAMD.directive('networkDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/network/details.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.navigationBar = false;
                        $scope.disableAutocomplete = true;
                    }],
                link: function (scope, element, attrs) {

                    new Waypoint({
                        element: $(element).find("#network-bar-default"),
                        handler: function( direction ) {
                            switch(direction) {
                                case 'down':
                                    if(scope.navigationBar)
                                        $(element).find("#network-bar-fixed").show();
                                    break;
                                case 'up':
                                    $(element).find("#network-bar-fixed").hide();
                                    break;
                                default:
                            }
                        }
                    });

                    $(element).find("#edit-network").click( function(){

                        scope.disableAutocomplete = false;
                        scope.navigationBar = true;
                        scope.$emit('EDIT_NETWORK');
                        scope.$apply();
                    });

                    $(element).find('.btn-edit-network-cancel').click(function(){
                        backToDefault();
                        scope.$emit('CANCEL_EDIT_NETWORK');
                    });

                    function backToDefault(){

                        scope.navigationBar = false;
                        scope.disableAutocomplete = true;
                        $(element).find("#network-bar-fixed").hide();
                        $(element).find(".network-default-mode").show();
                        $(element).find(".network-edit-mode").hide();
                    }
                }
            };
        }]);
});
