"use strict";
(function(){
    angular.module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider.
            when("/",{
                templateUrl:"views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/admin",{
                templateUrl:"views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs:"model"
            })
            .when("/forms",{
                templateUrl:"views/forms/forms.view.html",
                controller: "FormController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })
            .when("/login",{
                templateUrl:"views/users/login.view.html",
                controller: "LoginController",
                controllerAs:"model"
            })
            .when("/register",{
                templateUrl:"views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
             })
            .when("/form/:formId/fields",{
                templateUrl:"views/forms/field.view.html",
                controller: "FieldController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/"
            });
    }
    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function(response) {
                console.log(JSON.stringify("response"+response.data));
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/");
                }
            }, function(err){
                console.log("Error getting profile of the user"+JSON.stringify(err));
            });

        return deferred.promise;
    }
})();