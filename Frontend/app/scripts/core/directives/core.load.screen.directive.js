define(['angularAMD', 'jquery-ui'], function (angularAMD) {

    'use strict';

    angularAMD.directive('loadScreen', function ( ) {

        return {
            restrict: 'A',
            replace: true,
            template: '<div id="loading" class="loading" ><img src="images/spinner.gif"></div>',
            link: function (scope, element, attrs) {
                /**
                 * Listener when the specie data is loaded from backend
                 */
                scope.$on('loadScreenFired', function() {
                    console.log('loadScreenFired');
                    $('#loading').fadeToggle('400');
                });

            }
        };
    });
});
