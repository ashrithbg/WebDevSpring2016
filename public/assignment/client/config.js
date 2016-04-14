"use strict";
(function(){
    angular.module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider,$httpProvider){
        $routeProvider.
            when("/",{
                templateUrl:"views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/admin",{
                templateUrl:"views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs:"model",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/forms",{
                templateUrl:"views/forms/forms.view.html",
                controller: "FormController",
                resolve: {
                    loggedIn: checkLoggedin
                }

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
                controller: "ProfileController",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
             })
            .when("/form/:formId/fields",{
                templateUrl:"views/forms/field.view.html",
                controller: "FieldController",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .otherwise({
                redirectTo: "/"
            });
    }
    //function checkLoggedIn(UserService, $q, $location) {
    //    var deferred = $q.defer();
    //    UserService
    //        .getCurrentUser()
    //        .then(function(response) {
    //            console.log(JSON.stringify("response"+response.data));
    //            var currentUser = response.data;
    //            if(currentUser) {
    //                UserService.setCurrentUser(currentUser);
    //                deferred.resolve();
    //            } else {
    //                deferred.reject();
    //                $location.url("/");
    //            }
    //        }, function(err){
    //            console.log("Error getting profile of the user"+JSON.stringify(err));
    //        });
    //
    //    return deferred.promise;
    //}

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/user/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/user/loggedin').success(function(user)
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

        $http.get('/api/assignment/user/loggedin').success(function(user)
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