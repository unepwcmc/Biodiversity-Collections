define(['angularAMD','waypoints', 'member/directives/member.item.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('memberList', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','toastr', function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, toastr) {

            return {
                restrict: 'EA',
                scope:{
                    members:'='
                },
                templateUrl: 'views/member/member.list.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){


                    }],
                link: function (scope, element, attrs) {

                    var waypoint = new Waypoint({
                        element: $(element).find("#member-bar-default"),
                        handler: function( direction ) {

                            switch(direction) {
                                case 'down':
                                    if(scope.navigationBar)
                                        $(element).find("#member-bar-fixed").show();
                                    break;
                                case 'up':
                                    $(element).find("#member-bar-fixed").hide();
                                    break;
                                default:
                            }
                        }
                    });

                    scope.$on('ACTION_SAVE', function(){

                        scope.$emit('SAVE_INSTITUTION');
                        backToDefault();
                    });

                    $(element).find("#edit-member").click( function(){

                        scope.disableAutocomplete = false;
                        scope.navigationBar = true;
                        scope.$emit('EDIT_INSTITUTION');
                        scope.$apply();
                    });

                    $(element).find('.btn-edit-member-cancel').click(function(){
                        backToDefault();
                        scope.$emit('CANCEL_EDIT_INSTITUTION');
                    });

                    function backToDefault(){

                        scope.navigationBar = false;
                        scope.disableAutocomplete = true;
                        $(element).find("#member-bar-fixed").hide();
                        $(element).find(".member-default-mode").show();
                        $(element).find(".member-edit-mode").hide();
                    }

                }
            };
        }]);
});
