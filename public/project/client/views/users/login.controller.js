//"use strict";
//(function(){
//    angular
//        .module("ShortKutApp")
//        .controller("LoginController",LoginController);
//
//    function LoginController($location, UserService)
//    {
//        var vm = this;
//
//        vm.login = login;
//
//        function init() {
//        }
//        init();
//
//        function login(user) {
//            if(!user) {
//                return;
//            }
//            UserService.findUserByCredentials(user.username,
//                user.password).then(
//                function(response){
//                    if (response) {
//                        console.log(response);
//                        UserService.setCurrentUser(response.data);
//                        $location.url("/profile");
//                    }
//                },function(err){
//                    UserService.setCurrentUser(null);
//                    $location.url("/home");
//                }
//            );
//        }
//    }
//})();


"use strict";
(function(){
    angular
        .module("ShortKutApp")
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