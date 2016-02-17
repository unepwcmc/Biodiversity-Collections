define(['angularAMD', 'core/factory/imageFactory','core/directives/core.image.popup.directive' ], function (angularAMD) {

    'use strict';

    angularAMD.directive('imagesBox', ['$timeout', '$rootScope', 'toastr', 'Image','BaseController','$window',
        function ( $timeout, $rootScope, toastr, Image, BaseController , $window) {

            return {

                restrict: 'EA',
                templateUrl: 'views/core/images.box.tpl.html',
                scope: { title: '@', images: '=', id: '@' },
                controller: ['$scope', '$http', '$rootScope', '$state', '$q', '$stateParams', '$translate',
                    function( $scope, $http, $rootScope, $state, $q, $stateParams, $translate ) {

                        angular.extend($scope, BaseController);

                        $scope.slots = [false, false, false, false, false];
                        $scope.selected_slot = null;

                        $rootScope.$watch('editMode', function(newValue, oldValue){
                            $scope.editMode = $rootScope.editMode;
                        },true);

                        $scope.$watch('images.length', function(newValue, oldValue){
                            if($scope.images && !$scope.editMode){
                                $scope.slots = [false, false, false, false, false];
                                $timeout( function(){
                                    $('#ipt-file').val(null);
                                    loadImage();
                                },300)
                            }
                        },true);

                        $scope.addFile = function( files ){

                            for(var i = 0; i < files.length; i++){

                                if(files[i].size > 1024 * 1024 * 5){
                                     $scope.showWarningMessage('WARNING','THE_FILE_SIZE_ETC');
                                     return;
                                }
                            }

                            $rootScope.$broadcast("ATTACH_FILE", files );
                        };

                        $scope.removeImage = function( id ){
                            $rootScope.$broadcast("REMOVE_IMAGE", id );
                        };

                        $rootScope.$on('IMAGE_ADDED', function(){
                            loadImage();
                            $('#ipt-file').val(null);
                        },true);

                        function loadImage(){

                            if($scope.images.length > 0){

                                for(var i = 0; i < $scope.images.length; i++){

                                    var indexSlot = _.findIndex($scope.slots, function( obj){
                                        return obj == false;
                                    });

                                    if(!$scope.slots[indexSlot]){

                                        $scope.slots[indexSlot] = true;

                                        (function( index ){

                                            $timeout( function(){

                                                var img_box = $('#box-image');
                                                var bt_box = $('#box-expand');

                                                if(index == 0){
                                                    img_box.attr('src',"/images/icons/ajax-loader-large.gif");
                                                    img_box.attr('href',"/images/icons/ajax-loader-large.gif");
                                                    $scope.selected_slot = 0;
                                                }
                                                var thumbnail = $('#box-image-' + ( index  ));
                                                thumbnail.attr('src',"/images/icons/ajax-loader.gif");

                                                $http.get($rootScope.getHost() + "medias/" + $scope.images[index].attachment.id + "/image")
                                                    .success( function( data, status){

                                                        if(index == 0){
                                                            thumbnail.addClass('active');
                                                            img_box.attr('src',"data:image/*;base64," + data);
                                                            bt_box.attr('href',"data:image/*;base64," + data);
                                                        }
                                                        thumbnail.attr('src',"data:image/*;base64," + data);
                                                        thumbnail.next().data('img-id', $scope.images[index].id );
                                                });
                                            },500);

                                        })(indexSlot);

                                    }
                                }
                            }
                        }

                    }],
                link: function (scope, element, attrs) {

                    $('#ipt-file').on('change', function (evt) {

                        var indexSlot = _.findIndex(scope.slots, function( obj){
                            return obj == false;
                        });

                        if(indexSlot < 0){
                            scope.showWarningMessage('WARNING','MAX_IMAGE_EXCEEDED');
                            return;
                        }

                        var files = $(evt.currentTarget).get(0).files;

                        if( files.length > 5){
                            scope.showWarningMessage('WARNING','ONLY_FIVE_FILES_WILL_BE_SELECTED');
                        }

                        if(files.length > 0) {
                            showSelectedImage(files);
                            scope.addFile(files);
                        }
                    });

                    $('a.bt-img-close-click').click( function( evt ){

                        var index = $(this).prev().data('slot');
                        scope.removeImage($(this).data('img-id'));
                        $(this).prev().attr("src", "/images/empty_img.png");
                        $(this).prev().data("empty", 1);
                        scope.slots[index] = false;

                        if(index == scope.selected_slot){
                            $('#box-image').attr("src", "/images/empty_img.png");
                        }
                    });

                    $('.img-thumbnail-mini').click(function(evt){

                        $('.img-thumbnail-mini').each(function(){
                            $(this).removeClass('active');
                        });

                        $(this).addClass('active');

                        scope.selected_slot = $(this).data('slot');
                        $('#box-image').attr('src',$(this).attr('src'));
                        $('#box-expand').attr('href',$(this).attr('src'));
                    });

                    function showSelectedImage( files ){

                        for(var i = 0; i < files.length; i++){

                            var indexSlot = _.findIndex(scope.slots, function( obj){
                                return obj == false;
                            });

                            if(!scope.slots[indexSlot]){

                                scope.slots[indexSlot] = true;

                                (function(file, index) {

                                    var selectedFile = file;
                                    var reader = new FileReader();

                                    reader.onload = function(event) {

                                        var thumbnail = $('#box-image-' + ( index ));

                                            if(index == 0){
                                                $('#box-image').attr('src',event.target.result);
                                                scope.selected_slot = 0;
                                            }
                                            thumbnail.attr('src',event.target.result);
                                            thumbnail.data('empty', 0);
                                    };
                                    reader.readAsDataURL(selectedFile);

                                })(files[i], indexSlot);
                            }

                        }
                    }

                }
            };
        }]);
});
