define(['angularAMD','waypoints'], function (angularAMD) {

    'use strict';

    angularAMD.directive('institutionDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/institution/details.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.addCurator = function(){
                            var curators = $scope.institution.curators;
                            curators[curators.length] = $scope.curator;
                            $scope.curator = {};
                        };

                        $scope.deleteCurator = function( index ){
                            $scope.institution.curators.splice(index, 1);
                        };


                    }],
                link: function (scope, element, attrs) {

                    var waypoint = new Waypoint({
                        element: $(element).find("#institution-bar-default"),
                        handler: function( direction ) {

                            switch(direction) {
                                case 'down':
                                    if(scope.navigationBar)
                                        $(element).find("#institution-bar-fixed").show();
                                    break;
                                case 'up':
                                    $(element).find("#institution-bar-fixed").hide();
                                    break;
                                default:
                            }
                        }
                    });

                    scope.$on('ACTION_SAVE', function(){

                        scope.$emit('SAVE_INSTITUTION');
                        backToDefault();
                    });

                    $(element).find("#edit-institution").click( function(){

                        scope.disableAutocomplete = false;
                        scope.navigationBar = true;
                        scope.$emit('EDIT_INSTITUTION');
                        scope.$apply();
                    });

                    $(element).find('.btn-edit-institution-cancel').click(function(){
                        backToDefault();
                        scope.$emit('CANCEL_EDIT_INSTITUTION');
                    });

                    function backToDefault(){

                        scope.navigationBar = false;
                        scope.disableAutocomplete = true;
                        $(element).find("#institution-bar-fixed").hide();
                        $(element).find(".institution-default-mode").show();
                        $(element).find(".institution-edit-mode").hide();
                    }

                }
            };
        }]);
});
