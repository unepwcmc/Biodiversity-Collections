define([ 'angularAMD',
         'core/factory/documentFactory',
         'core/directives/core.table.sorter.directive',
         'core/directives/core.publication.popover.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('publications', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','Document','$q','toastr', '$translate',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, Document, $q, toastr, $translate) {

            return {
                restrict: 'EA',
                templateUrl: 'views/core/publications.tpl.html',
                scope: { type : '@' },
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.checkboxes_selected = false;
                        $scope.file = null;
                        $scope.documents = new Document();
                        angular.extend($scope.documents, {totalElements : 0, number: 0, size: 5, totalPages: 0});
                        $scope.checkboxCountPub = 0;

                        $rootScope.$watch('editMode', function(){
                            $scope.editMode = $rootScope.editMode;
                        });

                        $scope.load = function(id, page, size) {
                            if ($scope.type == 'collection') {
                                $scope.documents.loadByCollection(id, page, size);
                            } else if ($scope.type == 'sample') {
                                $scope.documents.loadBySample(id, page, size);
                            }
                        };

                        $scope.getAssociatedId = function() {
                            if ($stateParams.sampleId) {
                                return $stateParams.sampleId;
                            } else {
                                return $stateParams.id;
                            }
                        };

                        $scope.load($scope.getAssociatedId(), $scope.documents.number, $scope.documents.size);

                        $scope.paginatePublications = function(page, size){
                            $scope.load($scope.getAssociatedId() , page, size);
                        };

                        $scope.saveOrUpdate = function(){

                            if($scope.document.id){
                                $scope.updateDocument();
                            }
                            else{
                                $scope.saveNewDocument();
                            }
                        };

                        $scope.singleCheckBoxEvent = function($event){

                            if($($event.currentTarget).is(":checked"))
                                $scope.checkboxCountPub+=1;
                            else
                                $scope.checkboxCountPub-=1;
                        };

                        $scope.showPublicationForm = function(){

                            $scope.document = { authors :[""] };

                            $('#publicatioModal').modal('show');
                        };

                        $scope.$on('EDIT_DOCUMENT_EVENT', function( evt, data){

                            $scope.document = data;
                            $('#publicatioModal').modal('show');
                        });

                        $scope.saveNewDocument = function(){

                            if($scope.file == null){
                                $scope.showWarningMessage('WARNING', 'PLEASE_ADD_A_FILE');
                                return;
                            }

                            $scope.document.contentType = getFileExtension($scope.file.name);
                            $scope.document.status = true;

                            if ($scope.type == 'collection') {
                                $scope.document.collection = { id: $stateParams.id };
                            } else if ($scope.type == 'sample') {
                                $scope.document.sample = { id: $scope.getAssociatedId() };
                            }

                            $scope.documents.save($scope.document, function( data, status){

                                if(status === 200){
                                    $('#loader-wrapper').fadeToggle('400');
                                    $scope.documents.upload($scope.file, function(data, status){
                                        successState();
                                        $('#loader-wrapper').fadeToggle('400');
                                        $scope.showSuccessMessage('SUCCESS', 'DOCUMENT_CREATED_SUCCESSFULLY');
                                    });
                                }else{
                                    $scope.showErrorMessage('ERROR', data);
                                }
                            });
                        };

                        $scope.updateDocument = function(){

                            if($scope.file !== null){
                                $scope.document.contentType = getFileExtension($scope.file.name);
                            }

                            if ($scope.type == 'collection') {
                                $scope.document.collection = { id: $stateParams.id };
                            } else if ($scope.type == 'sample') {
                                $scope.document.sample = { id: $scope.getAssociatedId() };
                            }

                            $scope.documents.update( $scope.document, function( data, status){

                                if(status === 200){

                                    if($scope.file != null){
                                        console.log('uploading...');
                                        $('#loader-wrapper').fadeToggle('400');
                                        $scope.documents.upload($scope.file, function(data, status){
                                            successState();
                                            $('#loader-wrapper').fadeToggle('400');
                                            $scope.showSuccessMessage('SUCCESS', 'DOCUMENT_UPDATED_SUCCESSFULLY');
                                        });
                                    }
                                    else{
                                        successState();
                                        $scope.showSuccessMessage('SUCCESS', 'DOCUMENT_UPDATED_SUCCESSFULLY');
                                    }
                                }else{
                                    $scope.showErrorMessage('ERROR', data);
                                }
                            });
                        };

                        $scope.deleteDocument = function( id ){

                            if($scope.documents.number > 0){
                                if( (($scope.documents.totalElements - 1) % $scope.documents.size) == 0){
                                    $scope.documents.number = $scope.documents.number - 1;
                                    $scope.documents.totalPages = $scope.documents.totalPages - 1;
                                }
                            }

                            $scope.documents.delete( id, function( data, status){

                                if(status === 200){
                                    $scope.load($scope.getAssociatedId(), $scope.documents.number, $scope.documents.size);
                                    $scope.showSuccessMessage('SUCCESS', 'DOCUMENT_DELETED_SUCCESSFULLY');
                                }else{
                                    $scope.showErrorMessage('ERROR', data);
                                }
                            });
                        };

                        $scope.checkAndUnCheckAll = function(){

                            $scope.checkboxes_selected = !$scope.checkboxes_selected;

                            if($scope.checkboxes_selected && $scope.checkboxCountPub > 0){
                                $scope.checkboxCountPub = 0;
                            }

                            $("input[type=checkbox].pub-checkbox-delete").each(function () {
                                $(this).prop("checked", $scope.checkboxes_selected);

                                if($scope.checkboxes_selected)
                                    $scope.checkboxCountPub +=1;
                                else
                                    $scope.checkboxCountPub -= 1;
                            });

                        };

                        $scope.deleteAll = function(){

                            var promises = [];

                            $("input[type=checkbox].pub-checkbox-delete").each(function () {
                                if($(this).is(":checked")){
                                    if($(this).data('publication-id') != undefined){
                                        promises.push( $http.delete( $rootScope.getHost() + "documents/" + $(this).data('publication-id') ));
                                    }
                                }
                            });

                            if($scope.documents.number > 0){
                                $scope.documents.number = $scope.documents.number - 1;
                                $scope.documents.totalPages = $scope.documents.totalPages -1;
                            }

                            $q.all( promises ).then(function( results ){
                                $scope.showSuccessMessage('SUCCESS', 'DOCUMENT_DELETED_SUCCESSFULLY');
                                $scope.load($scope.getAssociatedId(), $scope.documents.number, $scope.documents.size);
                                $scope.checkboxes_selected = !$scope.checkboxes_selected;
                                $scope.checkboxCountPub = 0;
                            });
                        };

                        $scope.showSuccessMessage = function( title, message ){
                            toastr.success($translate.instant(message), $translate.instant(title));
                        };

                        $scope.showErrorMessage = function( title, message ){
                            toastr.error($translate.instant(message), $translate.instant(title));
                        };


                        function getFileExtension(filename)
                        {
                            var ext = /^.+\.([^.]+)$/.exec(filename);
                            return ext == null ? "" : ext[1];
                        }

                        function successState(){

                            $scope.file = null;
                            $('#publication_ipt_file').val("");
                            $scope.document = {};
                            $('#publicatioModal').modal('hide');
                            $scope.load($scope.getAssociatedId(), $scope.documents.number, $scope.documents.size);
                            $scope.multimedia_form.$setPristine();
                            $scope.multimedia_form.$setUntouched();
                        }

                    }],
                link: function (scope, element, attrs) {

                    $("#publication-size-box").change(function() {
                        scope.documents.size = parseInt($(this).val());
                        scope.paginatePublications(scope.documents.number, parseInt($(this).val()))
                    });

                    $('#publication_ipt_file').on('change', function (evt) {

                        var files = $(evt.currentTarget).get(0).files;

                        if(files.length > 0) {
                            scope.file = files[0];
                        }
                    });
                }
            };
        }]);
});