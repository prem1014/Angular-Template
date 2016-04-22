'use strict';
(function () {
    angular.module('app.login',[])
    .controller('LoginController', loginController);

    loginController.$inject = ['$scope','$location', 'loginService'];

    function loginController($scope,$location, loginService) {
        $scope.userList = loginService.getListOfUser();
        $scope.selectedName = $scope.userList[0].id;

        //validate user credentiials
        $scope.login = function () {
            $location.path('products');
        };

    };

})();