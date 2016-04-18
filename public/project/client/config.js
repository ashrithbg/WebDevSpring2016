"use strict";
(function(){
    angular.module("ShortKutApp")
        .config(configuration);

        function configuration($routeProvider,$sceDelegateProvider){

            $routeProvider.
                when("/",{
                    templateUrl:"views/home/home.view.html",
                    controller: "HomeController"
                })
                . when("/search",{
                    templateUrl:"views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/details/short/:id", {
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
                .when("/login",{
                    templateUrl:"views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs:"model"
                }).when("/register",{
                templateUrl:"views/users/register.view.html",
                controller: "RegisterController"
            }).when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            }).when("/shorts",{
                    templateUrl:"views/shorts/short.view.html",
                    controller: "ShortController",
                    resolve: {
                    checkLoggedIn: checkLoggedIn
                }
                }).when("/posts",{
                    templateUrl:"views/posts/posts.view.html",
                    controller: "PostController",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                }
                }).when("/feed",{
                    templateUrl:"views/feed/feed.view.html",
                    controller: "FeedController",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
            .otherwise({
                redirectTo: "/"
            });

            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',
                // Allow loading from our assets domain.  Notice the difference between * and **.
                'https://www.youtube.com/embed/*',
                '/api/*'
            ]);




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