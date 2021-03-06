define(
    [
        'angularAMD','angular','underscore','angular-translate','angular-breadcrumb',
        'angular-ui-router','angular-toastr','angular-cookies','angucomplete-alt','angular-tablesort',
        'angular-resource','angular-sanitize','popover','nemLogging','waypoints', 'angular-animate',
        'angular-toastr-tpl','leaflet-directive', 'leaflet', 'leaflet.markercluster',
        'core/directives/core.include.template.directive',
        'core/directives/core.load.screen.directive',
        'core/directives/core.select.wrap.directive',
        'core/directives/core.dialog.confirm.directive',
        'core/directives/core.translate.directive',
        'core/directives/core.main.directive',
        'core/directives/core.footer.directive',
        'core/directives/core.read.more.directive',
        'core/directives/core.edit.form.directive',
        'core/directives/core.elastic.directive',
        'core/directives/core.on.finish.render.directive',
        'core/directives/core.search.box.directive',
        'core/filters/core.pagination.filter',
        'core/filters/core.trim.filter',
        'core/controllers/BaseController',
        'auth/directives/auth.login.form.directive',
        'auth/directives/auth.login.show.directive',
        'auth/directives/auth.username.box.directive'
    ],
    function (angularAMD) {
        'use strict';

        return angularAMD;
    }
);
