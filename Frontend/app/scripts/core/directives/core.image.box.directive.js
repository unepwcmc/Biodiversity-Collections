define(['angularAMD', 'core/factory/imageFactory' ], function (angularAMD) {

    'use strict';

    angularAMD.directive('imageBox', ['$timeout', '$rootScope', 'toastr', 'Image','BaseController',
        function ( $timeout, $rootScope, toastr, Image, BaseController ) {

            return {

                restrict: 'EA',
                templateUrl: 'views/core/image.box.tpl.html',
                scope: { title: '@', image: '@', id: '@' },
                controller: ['$scope', '$http', '$rootScope', '$state', '$q', '$stateParams', '$translate',
                    function( $scope, $http, $rootScope, $state, $q, $stateParams, $translate ) {

                        angular.extend($scope, BaseController);

                        $rootScope.$watch('editMode', function(newValue, oldValue){
                            $scope.editMode = $rootScope.editMode;
                        },true);

                        loadImage();

                        $scope.addFile = function( files ){

                            for(var i = 0; i < files.length; i++){

                                if(files[i].size > 1024 * 1024 * 5){
                                     $scope.showWarningMessage('THE_FILE_SIZE_ETC','WARNING');
                                     return;
                                }
                            }

                            $rootScope.$broadcast("ATTACH_FILE", files );
                        };

                        $rootScope.$on('IMAGE_ADDED', function(){
                            loadImage();
                            $('#ipt-file').val(null);
                        },true);

                        function loadImage(){
                            if( $scope.image != '')
                                $('#box-image').attr('src',$rootScope.getHost() + "medias/" + $scope.id + "/image");
                        }

                    }],
                link: function (scope, element, attrs) {

                    $('#ipt-file').on('change', function (evt) {

                        var files = $(evt.currentTarget).get(0).files;

                        if( files.length > 5){
                            scope.showWarningMessage('ONLY_FIVE_FILES_WILL_BE_SELECTED','WARNING');
                        }

                        for(var i = 0; i < files.length; i++){

                             if (!files[i].name.match(/(?:gif|jpg|png|bmp)$/)) {
                                     scope.showWarningMessage('INPUTTED_FILE_PATH_ERROR','WARNING');
                                     return;
                             }
                        }

                        if(files.length > 0) {
                            showSelectedImage(files);
                            scope.addFile(files);
                        }
                    });

                    $('.img-thumbnail-mini').click(function(evt){
                        $('#box-image').attr('src',$(this).attr('src'));
                    });

                    function showSelectedImage( files ){

                        for(var i = 0; i < files.length; i++){

                            (function(file, index) {

                                var selectedFile = file;
                                var reader = new FileReader();

                                reader.onload = function(event) {
                                    if(index == 0){
                                        $('#box-image').attr('src',event.target.result);
                                    }
                                    $('#box-image-' + ( index +1 ) ).attr('src',event.target.result);
                                };
                                reader.readAsDataURL(selectedFile);

                            })(files[i], i);
                        }
                    }

                }
            };
        }]);
});
