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
                controller: "AdminController"
                })
                .when("/forms/forms",{
                templateUrl:"views/forms/forms.view.html",
                controller: "FormController"
                })
                .when("/forms/fields",{
                    templateUrl:"views/forms/fields.view.html",
                    controller: "FieldsController"
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