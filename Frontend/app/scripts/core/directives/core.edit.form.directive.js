/**
 * Directive for control the button edit and save int the tabs
 *
 */
define(['angularAMD', 'jquery'], function (angularAMD) {

    'use strict';

    angularAMD.directive('editForm', ['$timeout', '$rootScope', function ($timeout, $rootScope) {

        return {
            restrict: 'A',
            controller: ['$scope', '$rootScope', function($scope, $rootScope){

                $scope.logged = $rootScope.logged;

                $rootScope.$watch('logged', function(newValue, oldValue){
                    $scope.logged = newValue;
                }, true);
            }],
            link: function (scope, element, attrs) {

                var $form = null;
                var $elements = null;
                var $edit_form = $(element).find('.edit-form');
                var $edit_mode = $(element).find('.edit-mode');
                var $save_form = $(element).find('.save-form');
                var $save_mode = $(element).find('.save-mode');

                $save_form.hide();
                $save_mode.hide();

                $(element).find('form.view-mode').find('textarea,input[type="text"],input[type="email"],input[type="password"]').attr('readonly', 'input[type="text"]');
                $(element).find('form.view-mode').find('input[type="number"]').attr('disabled', 'disabled');
                $(element).find('form.view-mode').find('select').attr('disabled','disabled');

                $edit_form.click(function (event) {
                    event.preventDefault();

                    $save_form.show();
                    $save_mode.show();
                    $edit_form.hide();
                    $edit_mode.hide();

                    $form = $(this).parents('.collapseible').find('form.form-block');
                    $elements = 'textarea,input[type="text"],input[type="email"],input[type="password"],select';

                    if ($form.hasClass('view-mode')) {

                        $form.removeClass('view-mode').addClass('edit-mode');
                        $form.find($elements).removeAttr('readonly');
                        $form.find('.no-editable').attr('readonly', 'readonly');
                        $form.find('select').removeAttr('disabled');
                        $form.find('input[type="number"]').removeAttr('disabled');
                        $(element).find('.rem-row').removeAttr('disabled');
                    }

                    isEditing(true, element);
                });

                $save_form.click(function (event) {
                    event.preventDefault();

                    resetEditMode();

                    if ($(this).hasClass('cancel')) {
                        $rootScope.$broadcast("SpecieReloaded");
                    } else {
                        $rootScope.$broadcast("SaveSpecie");
                    }

                    isEditing(false, element);
                });

                function resetEditMode(){

                    $edit_form.show();
                    $edit_mode.show();
                    $save_form.hide();
                    $save_mode.hide();

                    if ($form.hasClass('edit-mode')) {

                        $form.removeClass('edit-mode').addClass('view-mode');
                        $form.find($elements).attr('readonly', 'readonly');
                        $form.find('select').attr('disabled','disabled');
                        $form.find('input[type="number"]').attr('disabled','disabled');
                        $multiselect.multiselect('disable');
                        $(element).find('.rem-row').attr('disabled', 'disabled');
                    }

                    isEditing(false, element);
                }

                /**
                 * Set a variable to scope to identify when editing
                 * Used to hide/show textareas without data
                 * @param param: boolean
                 */
                function isEditing(param, element) {
                    scope.isEditing = param;

                    var textAreas = $(element).find('textarea');
                    textAreas.trigger('click');

                    scope.$apply();
                }

                scope.$on('ngRepeatFinished', function() {
                    $(element).find('form.view-mode').find('textarea,input[type="text"],input[type="email"],input[type="password"],select,select[ multiple="multiple"]').attr('readonly', 'input[type="text"]');
                    $(element).find('form.view-mode').find('.rem-row').attr('disabled', 'disabled');
                    $(element).find('form.view-mode').find('input[type="number"]').attr('disabled', 'disabled');
                    $(element).find('form.view-mode').find('select').attr('disabled', 'disabled');
                    $(element).find('form.edit-mode').find('textarea,input[type="text"],input[type="email"],input[type="password"],select,select[ multiple="multiple"]').removeAttr('readonly');
                    $(element).find('form.edit-mode').find('.rem-row').removeAttr('disabled');
                    $(element).find('form.edit-mode').find('input[type="number"]').removeAttr('disabled');
                    $(element).find('form.edit-mode').find('select').removeAttr('disabled');
                    $(element).find('.no-editable').attr('readonly', 'readonly');
                });

                scope.$watch('logged', function( newValue, oldValue ){

                    if( newValue != oldValue){
                        if(newValue == false){

                           resetEditMode();
                        }
                    }
                }, true);
            }
        };
    }])
    .directive('elastic', [
        '$timeout', '$parse',
        function($timeout, $parse) {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {
                    $scope.initialHeight = $scope.initialHeight || element[0].style.height;

                    var resize = function(eventType) {
                        //var paddingTop = Number($(element).css('padding-top').replace("px", "")) || 0,
                        //    paddingBottom = Number($(element).css('padding-bottom').replace("px", "")) || 0,
                        //    convertedPadding = paddingTop + paddingBottom,
                        //    paddingToConsider = (eventType === 'input') ? convertedPadding : 0;

                        element[0].style.height = $scope.initialHeight;
                        var heightToUse = (element[0].scrollHeight !== 0) ? (element[0].scrollHeight) : 35;

                        element[0].style.height = "" + heightToUse + "px";
                    };

                    var modelValue = $parse(attrs.ngModel);
                    $scope.$watch(modelValue, function(value) {
                        if (value) {
                            resize();
                        }
                    });

                    element.on("input change paste cut click", function(evt) {
                        resize(evt.type);
                    });

                    $timeout(resize, 0);
                }
            };
        }
    ])
    ;
});
