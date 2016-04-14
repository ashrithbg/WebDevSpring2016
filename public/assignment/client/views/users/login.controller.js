"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($location,$rootScope,UserService)
    {
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user)
        {
            if(user)
                UserService
                    .login(user)
                    .then(
                        function(response)
                        {
                            $rootScope.currentUser = response.data;
                            $location.url("/profile");
                        },
                        function(err) {
                            vm.error = err;
                        }
                    );
        }
    }
})();