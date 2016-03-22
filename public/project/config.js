"use strict";
(function(){
    angular.module("ShortKutApp")
        .config(function($routeProvider){

            $routeProvider.
                when("/",{
                    templateUrl:"views/search/search.view.html",
                    controller: "SearchController"
                })
                . when("/search",{
                    templateUrl:"views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/details/shorts/:id", {
                    templateUrl: "views/details/short.details.html",
                    controller: "ShortDetailsController as model"
                }).when("/details/posts/:id", {
                    templateUrl: "views/details/post.details.html",
                    controller: "PostDetailsController as model"
                }).when("/details/search/:id", {
                    templateUrl: "views/details/search.details.html",
                    controller: "SearchDetailsController as model"
                })
                .when("/search/:query", {
                    templateUrl: "views/search/search.view.html",
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
            }).when("/shorts",{
                    templateUrl:"views/shorts/short.view.html",
                    controller: "ShortController"
                }).when("/posts",{
                    templateUrl:"views/posts/posts.view.html",
                    controller: "PostController"
                }).when("/feed",{
                    templateUrl:"views/feed/feed.view.html",
                    controller: "FeedController"
                })
                .otherwise({
                redirectTo: "/"
            });




        })





})();