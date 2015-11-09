define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.directive('ngConfirmClick', ['$timeout','$translate',
      function ($timeout, $translate) {

          return {
              priority: -1,
              restrict: 'A',
              link: function(scope, element, attrs){
                  element.bind('click', function(e){
                      var message = $translate.instant(attrs.ngConfirmClick);
                      if(message && !confirm(message)){
                          e.stopImmediatePropagation();
                          e.preventDefault();
                      }
                  });
              }
          }
      }]);
});
