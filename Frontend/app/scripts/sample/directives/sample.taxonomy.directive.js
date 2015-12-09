define(['angularAMD','waypoints'], function (angularAMD) {

    'use strict';

    angularAMD.directive('sampleTaxonomy', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {
            return {
                restrict: 'EA',
                scope: { display : '@' },
                templateUrl: 'views/sample/taxonomy.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.sample = $scope.$parent.sample;

                        $rootScope.$watch('editMode', function() {
                            $scope.editMode = $rootScope.editMode;
                        });
                    }],
                link: function (scope, element, attrs) {
                    if (scope.display == 'true') {
                        $(element).find('textarea,input[type="text"]').attr('readonly', 'input[type="text"]');
                    }
                }
            };
        }]);
});
