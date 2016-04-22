'use strict';
(function () {
    angular.module('app.login')
    .factory('loginService', loginService);

    function loginService() {
        var service = {};

        service.getListOfUser = function () {
            var userList = [{ name: 'Select your name', id: 0 },{ name: 'Prem Prakash', id: 1 }, { name: 'Sneha Roy', id: 2 }];
            return userList;
        };
        return service;
    };

})();