define(
    [
        'angularAMD','angular','underscore','angular-translate',
        'angular-ui-router','angular-toastr',
        'angular-resource','angular-sanitize','popover',
        'angular-toastr-tpl',
        'core/directives/core.include.template.directive',
        'core/directives/core.load.screen.directive',
        'core/directives/core.jquery.tab.directive',
        'core/directives/core.select.wrap.directive',
        'core/directives/core.dialog.confirm.directive',
        'core/directives/core.translate.directive',
        'core/filters/core.pagination.filter'
    ],
    function (angularAMD) {
        'use strict';

        return angularAMD;
    }
);
