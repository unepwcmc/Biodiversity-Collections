define(['angularAMD', 'bootstrap'], function (angularAMD) {

    'use strict';

    angularAMD.directive('uiTab', ['$timeout', function ($timeout) {
          return {
              restrict: 'A',
              link: function (scope, element, attrs) {

                  $(element).click(function (e) {
                      e.preventDefault();
                      $(this).tab('show');
                  });
              }
          };
      }]);
});
