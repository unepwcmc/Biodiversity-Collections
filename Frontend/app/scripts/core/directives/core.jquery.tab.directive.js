define(['angularAMD', 'jquery-ui'], function (angularAMD) {

    'use strict';

    angularAMD.directive('uiTab', ['$timeout',
      function ($timeout) {
          return {
              restrict: 'A',
              link: function (scope, element, attrs) {

                  $timeout(function(){

                      $(element).tabs();

                  }, 2000);
              }
          };
      }]);
});
