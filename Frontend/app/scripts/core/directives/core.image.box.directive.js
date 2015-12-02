define(['angularAMD', 'core/factory/imageFactory' ], function (angularAMD) {

    'use strict';

    angularAMD.directive('imageBox', ['$timeout', '$rootScope', 'toastr', 'Image',
        function ( $timeout, $rootScope, toastr, Image ) {

            return {

                restrict: 'EA',
                templateUrl: 'views/core/image.tpl.html',
                scope: { title: '@', image: '@', id: '@' },
                controller: ['$scope', '$http', '$rootScope', '$state', '$q', '$stateParams', '$translate',
                    function( $scope, $http, $rootScope, $state, $q, $stateParams, $translate ) {

                        loadImage();

                        $scope.addFile = function( file ){

                            if(file.size > 1024 * 1024 * 5){
                                $scope.showWarningMessage('THE_FILE_SIZE_ETC','WARNING');
                                return;
                            }

                            $rootScope.$broadcast("ATTACH_FILE", file );
                        };

                        $rootScope.$on('IMAGE_ADDED', function(){
                            loadImage();
                            $('#ipt-file').val(null);
                        },true);

                        //$rootScope.$on('BIODIVERSITY_LOADED', function(){
                        //   loadImage();
                        //},true);

                        function loadImage(){
                            if( $scope.image != '')
                                $('#box-image').attr('src',$rootScope.getHost() + "medias/" + $scope.id + "/image");
                        }

                    }],
                link: function (scope, element, attrs) {

                    $('#ipt-file').on('change', function (evt) {

                        if (!$(this).val().match(/(?:gif|jpg|png|bmp)$/)) {
                            scope.showWarningMessage('INPUTTED_FILE_PATH_ERROR','WARNING');
                            return;
                        }

                        var files = $(evt.currentTarget).get(0).files;

                        if(files.length > 0) {
                            showSelectedImage(files);
                            scope.addFile(files[0]);
                        }
                    });

                    function showSelectedImage( files ){

                        var selectedFile = files[0];
                        var reader = new FileReader();

                        reader.onload = function(event) {
                            $('#box-image').attr('src',event.target.result);
                        };
                        reader.readAsDataURL(selectedFile);
                    }

                }
            };
        }]);
});
