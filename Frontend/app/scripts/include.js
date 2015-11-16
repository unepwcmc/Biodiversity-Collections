define(
    [
        'angularAMD','angular','underscore','angular-translate',
        'angular-ui-router','angular-toastr','angular-cookies',
        'angular-resource','angular-sanitize','popover','nemLogging',
        'angular-toastr-tpl','leaflet-directive', 'leaflet', 'leaflet.markercluster',
        'core/directives/core.include.template.directive',
        'core/directives/core.load.screen.directive',
        'core/directives/core.jquery.tab.directive',
        'core/directives/core.select.wrap.directive',
        'core/directives/core.dialog.confirm.directive',
        'core/directives/core.translate.directive',
        'core/directives/core.main.directive',
        'core/directives/core.breadcrumbs.directive',
        'core/filters/core.pagination.filter',
        'core/controllers/BaseController',
        'auth/directives/auth.username.box.directive'
    ],
    function (angularAMD) {
        'use strict';

        return angularAMD;
    }
);
