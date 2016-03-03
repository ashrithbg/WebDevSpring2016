"use strict";
(function(){
    angular.module("ShortKutApp")
        .config(function($routeProvider){

            $routeProvider.
                when("/",{
                    templateUrl:"views/home/home.view.html",
                    controller: "HomeController"
                })
                . when("/search",{
                    templateUrl:"views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/admin",{
                    templateUrl:"views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/forms",{
                    templateUrl:"views/forms/forms.view.html",
                    controller: "FormController"
                })
                .when("/login",{
                    templateUrl:"views/users/login.view.html",
                    controller: "LoginController"
                }).when("/register",{
                templateUrl:"views/users/register.view.html",
                controller: "RegisterController"
            }).when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller: "ProfileController"
            }).otherwise({
                redirectTo: "/"
            });




        })





})();