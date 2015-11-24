define(['angularAMD', 'core/factory/imageFactory' ], function (angularAMD) {

    'use strict';

    angularAMD.directive('imageThumbnail', ['$timeout', '$rootScope', 'toastr', 'Image',
        function ( $timeout, $rootScope, toastr, Image ) {

            return {

                restrict: 'EA',
                templateUrl: 'views/core/thumbnail.tpl.html',
                scope:{
                    attachment:"=",
                    width:'=',
                    height:'='
                },
                controller: ['$scope', '$http', '$rootScope', '$state', '$q', '$stateParams', '$translate',
                    function( $scope, $http, $rootScope, $state, $q, $stateParams, $translate ) {

                        $scope.root = $rootScope.getHost();

                    }],
                link: function (scope, element, attrs) {

                    if( scope.attachment != undefined){
                        $(element).find('img').attr('src', scope.root + "medias/" + scope.attachment+ "/image");
                    }
                }
            };
        }]);
});
