define(['angularAMD', 'core/factory/imageFactory' ], function (angularAMD) {

    'use strict';

    angularAMD.directive('collectionImage', ['$timeout', '$rootScope', 'toastr', 'Image',
        function ( $timeout, $rootScope, toastr, Image ) {

            return {

                restrict: 'E',
                templateUrl: 'views/collection/image.tpl.html',

                controller: ['$scope', '$http', '$rootScope', '$state', '$q', '$stateParams', '$translate',
                    function( $scope, $http, $rootScope, $state, $q, $stateParams, $translate ) {

                        $scope.image = new Image();


                        $scope.addFile = function( file ){

                            if(file.size > 1024 * 1024 * 5){
                                toastr.warning($translate.instant('THE_FILE_SIZE_ETC'), $translate.instant('WARNING'));
                                return;
                            }

                            $rootScope.$broadcast("ATTACH_FILE", file );
                        };

                    }],
                link: function (scope, element, attrs) {

                    $('#ipt-file').on('change', function (evt) {
                        var files = $(evt.currentTarget).get(0).files;

                        if(files.length > 0) {
                            scope.addFile(files);
                        }
                    });
                }
            };
        }]);
});
