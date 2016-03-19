"use strict";
(function(){
    angular.module("FormBuilderApp")
        .config(function($routeProvider){

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
                    controller: "FormController"
                })
                .when("/login",{
                    templateUrl:"views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs:"model"
                })
                .when("/register",{
                    templateUrl:"views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs:"model"
                })
                .when("/profile",{
                    templateUrl:"views/users/profile.view.html",
                    controller: "ProfileController"
                })
                //.when("/fields",{
                //    templateUrl:"views/forms/field.view.html",
                //    controller: "FieldController"
                //})
                .when("/form/:formId/fields",{
                    templateUrl:"views/forms/field.view.html",
                    controller: "FieldController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        })
})();