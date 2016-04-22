(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        //'ngResource',
        'app.core',

        // Features (listed alphabetically)
        'app.approot',
        'app.dashboard',
        'app.topnav',
        'app.login',
        'app.products'
    ]);
})();
