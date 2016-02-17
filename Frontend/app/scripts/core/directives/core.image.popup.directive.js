/**
 * Directive for bind the image with the magnific-popup
 */
define(['angularAMD', 'jquery-magnific-popup'], function (angularAMD) {

    'use strict';

    angularAMD.directive('imagePopup', ['$timeout', function ($timeout ) {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $timeout(function() {
                    $(element).magnificPopup({
                        type: 'image'
                    });
                }, 3000);
            }
        };
    }]);

    angularAMD.directive('imagePopupAjax', function ( ) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).magnificPopup({
                    type: 'ajax'
                });
            }
        };
    });
});
