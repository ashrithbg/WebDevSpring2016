"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope,$filter, UserService)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;


        var orderBy = $filter('orderBy');
        $scope.order = function(predicate) {
            $scope.predicate = predicate;
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.users = orderBy($scope.users, predicate, $scope.reverse);
        };
        $scope.order('username', true);


        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user)
        {
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user)
        {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function select(user)
        {
            $scope.user = angular.copy(user);
        }

        function handleSuccess(response) {
            console.log("response"+JSON.stringify(response));
            $scope.user={};
            $scope.users = response.data;

        }

        function handleError(error) {
            $scope.error = error;
        }



    }
})();