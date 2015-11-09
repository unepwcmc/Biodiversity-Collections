define(['angularAMD', 'jquery'], function (angularAMD) {

    'use strict';

    angularAMD.directive('selectWrap', function () {

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                $(element).wrap('<span class="select-wrapper"></span>');

                ngModel.$parsers.push(function(val) {
                   return val;
                });
                ngModel.$formatters.push(function(val) {
                   return '' + val;
                });
            }
        };
    });
});
