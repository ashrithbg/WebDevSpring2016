"use strict";
(function(){
    angular.module("ShortKutApp")
        .config(configuration);

        function configuration($routeProvider,$httpProvider, $sceDelegateProvider){

            $routeProvider.
                when("/",{
                    templateUrl:"views/home/home.view.html",
                    controller: "HomeController",
                    resolve:{
                        loggedIn: checkCurrentUser
                    }
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
                    controller: "PostDetailsController as model",

                }).when("/details/search/:id", {
                    templateUrl: "views/details/search.details.html",
                    controller: "SearchDetailsController as model",
                    resolve: {
                        loggedIn: checkCurrentUser
                    }
                })
                .when("/search/:query", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController",
                    controllerAs:"model"
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
                controller: "RegisterController",
                controllerAs:"model"
            }).when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs:"model",
                resolve: {
                    loggedIn: checkLoggedin
                }
            }).when("/shorts",{
                    templateUrl:"views/shorts/short.view.html",
                    controller: "ShortController",
                    controllerAs: "model",
                    resolve: {
                    loggedIn: checkLoggedin
                }
                }).when("/posts",{
                    templateUrl:"views/posts/posts.view.html",
                    controller: "PostController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedin
                }
                }).when("/feed",{
                    templateUrl:"views/feed/feed.view.html",
                    controller: "FeedController",
                    controllerAs:"model",
                    resolve: {
                        loggedIn: checkLoggedin
                    }
                }).when("/profile/public/:username",{
                    templateUrl:"views/users/public.profile.view.html",
                    controller:"PublicProfileController",
                    controllerAs:"model",
                    resolve:{
                        loggedIn:checkCurrentUser
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

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/user/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/user/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };


})();