define(['angularAMD','waypoints', 'member/directives/member.item.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('memberList', ['$timeout', '$rootScope', '$stateParams', function ($timeout, $rootScope, $stateParams) {

            return {
                restrict: 'EA',
                scope:{
                    collection:'=',
                    members:'='
                },
                templateUrl: 'views/member/member.list.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.editMode = false;
                        $scope.member = {};

                        /**
                         * Listener when the button edit is clicked
                         */
                        $scope.$on('EDIT_MEMBER', function() {
                            setStateButton(true);
                        });

                        /**
                         * Listener when the button cancel is clicked
                         */
                        $scope.$on('CANCEL_EDIT_MEMBER', function() {
                            setStateButton(false);
                        });

                        /**
                         * Listener when the button save is clicked
                         */
                        $scope.$on('SAVE_COLLECTION', function() {
                            setStateButton(false);
                        });

                        $scope.addNewMember = function(){
                            $scope.member.id = generateUUID();
                            $scope.$emit('ADD_NEW_MEMBER', $scope.member);
                        };

                        /**
                         * Listener when the collection factory update the
                         * biodiversity collection model.
                         *
                         */
                        $scope.$on('BIODIVERSITY_UPDATED', function(){
                            $scope.member = {};
                        });

                        function setStateButton( status ){
                            $scope.editMode = status;
                            $rootScope.editMode = $scope.editMode;
                            $scope.$apply();
                        }

                        function generateUUID(){
                            var d = new Date().getTime();
                            if(window.performance && typeof window.performance.now === "function"){
                                d += performance.now();; //use high-precision timer if available
                            }
                            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                                var r = (d + Math.random()*16)%16 | 0;
                                d = Math.floor(d/16);
                                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                            });
                            return uuid;
                        }

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

                        scope.$emit('SAVE_MEMBER');
                        backToDefault();
                    });

                    $(element).find("#edit-member").click( function(){

                        scope.disableAutocomplete = false;
                        scope.navigationBar = true;
                        scope.$emit('EDIT_MEMBER');
                        scope.$apply();
                    });

                    $(element).find('.btn-edit-member-cancel').click(function(){
                        backToDefault();
                        scope.$emit('CANCEL_EDIT_MEMBER');
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
