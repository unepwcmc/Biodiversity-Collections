define(['angularAMD', 'jquery-tablesorter'], function (angularAMD) {

    'use strict';

    angularAMD.directive('tableSorter', ['$timeout','$translate',
        function ($timeout, $translate) {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $timeout(function(){
                    $(element).tablesorter();
                },1000);
            }
        };
    }]);
});
