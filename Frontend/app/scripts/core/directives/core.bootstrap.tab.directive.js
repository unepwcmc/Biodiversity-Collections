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

                  $(element).on('shown.bs.tab', function (e) {
                      if(($(e.currentTarget).data('event') != undefined)){
                          scope.$emit($(e.currentTarget).data('event'))
                      }
                  });
              }
          };
      }]);
});
