define(['angularAMD','popover'], function (angularAMD) {

    'use strict';

    angularAMD.directive('reportPopover', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','$compile',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, $compile) {

            return {
                restrict: 'A',
                scope:{
                    summary:'='
                },
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        var template = "<div class='row'>" +
                            "<div class='col-md-4'>" +
                                "<p><strong>Address</strong></p>" +
                                "<p>{{ summary.institution.contact.address1 }}</p>" +
                                "<p>{{ summary.institution.contact.address2 }}</p>" +
                                "<p>{{ summary.institution.contact.address3 }}</p>" +
                            "</div>" +
                            "<div class='col-md-4'>" +
                                "<p><strong>City:&nbsp;</strong>{{ summary.institution.contact.city }}</p>" +
                                "<p><strong>Country:&nbsp;</strong>{{ summary.institution.contact.country }}</p>" +
                                "<p><strong>State:&nbsp;</strong>{{ summary.institution.contact.district }}</p>" +
                            "</div>" +
                            "<div class='col-md-4'>" +
                                "<p><strong>Institution Type:&nbsp;</strong>{{ summary.institution.institutionType }}</p>" +
                            "</div>" +
                            "</div>";


                        $scope.startPopover = function( ele ) {
                            $( ele ).webuiPopover(
                                {
                                    content: $compile(template)($scope),
                                    width:'850',
                                    height: '150',
                                    placement: 'bottom-right',
                                    style:'publication-popover',
                                    html: true,
                                    arrow: false
                                }
                            );
                        };


                    }],
                link: function (scope, element, attrs) {
                    scope.startPopover( element );
                }
            };
        }]);
});
