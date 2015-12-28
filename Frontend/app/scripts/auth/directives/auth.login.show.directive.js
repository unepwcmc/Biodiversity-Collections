define(['angularAMD', 'bootstrap'], function (angularAMD) {
  'use strict';

  angularAMD.directive('loginShow', function ( ) {

    return {

      link: function (scope, element, attrs) {

        element.on('click', function(e) {
          e.preventDefault();
          $('#login-box').fadeToggle('400');
          $("#inputUsername").focus();
        });
      }
    };
  });
});
