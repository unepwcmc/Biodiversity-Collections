define(['angularAMD','waypoints', 'core/directives/core.images.box.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('networkDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/network/details.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        if ($stateParams.isNew) {
                            $scope.disableAutocomplete = false;
                            $scope.navigationBar = true;
                        } else {
                            $scope.navigationBar = false;
                            $scope.disableAutocomplete = true;
                        }
                        $scope.member = {};

                        $scope.addMember = function(){
                            if ($scope.network.boardMembers === undefined)
                                $scope.network.boardMembers = [];
                            var members = $scope.network.boardMembers;
                            members[members.length] = $scope.member;
                            $scope.member = {};
                        };

                        $scope.deleteMember = function( index ){
                            $scope.network.boardMembers.splice(index, 1);
                        };
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

                    /**
                     * Should be fired when the button save is click
                     */
                    scope.$on('ACTION_SAVE', function(){

                        backToDefault();
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
