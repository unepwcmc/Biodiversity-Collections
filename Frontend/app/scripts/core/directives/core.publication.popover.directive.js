define(['angularAMD','popover'], function (angularAMD) {

    'use strict';

    angularAMD.directive('pubPopover', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','$compile',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, $compile) {

            return {
                restrict: 'A',
                scope:{
                    doc:'='
                },
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        var URL = $rootScope.getHost() + "documents/" + $scope.doc.id + "/download";

                        var template = "<div class='row'>" +
                            "<div class='pull-left p-description'>" +
                            "<p><small><strong>Description</strong></small></p>" +
                            "<p>{{ doc.description }}</p>" +
                            "</div>" +
                            "<div class='pull-right p-button'>" +
                                "<a ng-click='download()' style='cursor: pointer'><i class='fa fa-download'></i><strong>&nbsp;" + $translate.instant('DOWNLOAD') + "</strong></a>" +
                            "<div class='clearfix' ></div>" +
                                "<a ng-show='editMode' ng-click='editDocumentEvent()' style='cursor: pointer'><i class='fa fa-edit'></i><strong>&nbsp;" + $translate.instant('EDIT') + "</strong></a>" +
                            "</div></div>";


                        $scope.startPopover = function( ele ) {
                            $( ele ).webuiPopover(
                                {
                                    content: $compile(template)($scope),
                                    placement: 'bottom-left',
                                    style:'publication-popover',
                                    html: true,
                                    arrow:false
                                }
                            );
                        };

                        $rootScope.$watch('editMode', function() {
                            $scope.editMode = $rootScope.editMode;
                        });

                        $scope.download = function( ){
                            $window.open( $rootScope.getHost() + "documents/" + $scope.doc.id + "/download");
                        };

                        $scope.editDocumentEvent = function(){
                            $scope.$emit('EDIT_DOCUMENT_EVENT', $scope.doc);
                        }

                    }],
                link: function (scope, element, attrs) {
                    scope.startPopover( element );
                }
            };
        }]);
});
