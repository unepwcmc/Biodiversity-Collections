require.config({
    baseUrl: 'scripts/',

    // alias libraries paths.  Must set 'angular'
    paths: {
        'jquery' : 'ext/jquery.min',
        'jquery-ui': 'ext/jquery-ui',
        'jquery-validation': 'ext/additional-methods',
        'jquery-magnific-popup':'ext/jquery.magnific-popup',
        'popover':'ext/jquery.webui-popover',
        'angular': 'ext/angular',
        'angular-ui-router': 'ext/angular-ui-router',
        'angular-translate': 'ext/angular-translate',
        'angular-sanitize': 'ext/angular-sanitize',
        'angular-toastr': 'ext/angular-toastr',
        'angular-toastr-tpl': 'ext/angular-toastr.tpls',
        'angularAMD': 'ext/angularAMD',
        'ngload': 'ext/ng-load',
        'angular-resource': 'ext/angular-resource',
        'bootstrap' : 'ext/bootstrap',
        'underscore': 'ext/underscore'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'jquery': { exports: '$'},
        'jquery-ui': { deps: ['jquery']},
        'jquery-validation': { deps: ['jquery']},
        'jquery-magnific-popup': { deps: ['jquery']},
        'popover': { deps: ['jquery']},
        'angular':{ exports: 'angular'},
        'angularAMD': { exports: 'angularAMD', deps: ['angular']},
        'ngload':{ exports: 'ngload', deps: ['angularAMD']},
        'angular-resource': { deps: ['angular']},
        'angular-translate': { deps: ['angular']},
        'angular-ui-router':{ deps: ['angular']},
        'angular-sanitize':{ deps: ['angular']},
        'angular-toastr':{ deps: ['angular']},
        'angular-toastr-tpl':{ deps: ['angular-toastr']},
        'bootstrap': { exports: 'bootstrap', deps: ['jquery']}
    },

    // kick start application
    deps: ['app']
});
