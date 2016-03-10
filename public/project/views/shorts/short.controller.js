"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("ShortController",shortController);

    function shortController($scope,$location,ShortService,UserService) {

        UserService.logged_in();
        var currentUser= UserService.getCurrentUser();
        ShortService.findShortsForUser(
            currentUser._id,
            function(shorts){
                $scope.shorts =shorts;
            });
        console.log("shorts"+$scope.shorts);
        $scope.$location = $location;

        $scope.addShort = addShort;
        $scope.deleteShort = deleteShort;
        $scope.updateShort = updateShort;
        $scope.selectShort = selectShort;
        //$scope.getShortsByUser = getShortsByUser;




        function addShort(newShort){
            if(!newShort || !newShort.title)
                return;
            ShortService.addShortForUser(
                currentUser._id,
                newShort,
                function(short){
                    ShortService.findShortsForUser(
                        currentUser._id,
                        function(shorts){
                            $scope.shorts = shorts;
                            $scope.short = {};
                        });
                }
            );
            //ShortService.addShortForUser(newShort);
        }
        //function deleteShort(){
        //    console.log("in upload short");
        //    //ShortService.(newShort);
        //}
        //function updateShort(short){
        //    console.log("in upload short");
        //    ShortService.updateShortById(short.id,short,function(){
        //
        //    });
        //}

        function updateShort(short){
            console.log("short to be updated"+short.title);
            console.log("short to be updated"+short.id);
            ShortService.updateShortById(short.id,
                short,
                function(updatedShort){
                    var selectedIndex = $scope.selectedIndex;
                    console.log($scope.selectedIndex);
                    if (selectedIndex>=0){
                        console.log(selectedIndex);
                        console.log(updatedShort.id);
                        console.log(updatedShort.title);
                        $scope.shorts[selectedIndex]=updatedShort;
                        $scope.short={};

                    }

                }
            );
        }
        function deleteShort(index){
            var shorts = $scope.shorts;
            var shortId = shorts[index].id;
            ShortService.deleteShortById(
                shortId,
                function(shorts){
                    ShortService.findShortsForUser(
                        currentUser._id,
                        function(deletedShorts){
                            $scope.shorts = deletedShorts;
                        }
                    )
                });
            //console.log($scope.forms);

        }
        //var selectedIndex = null;
        function selectShort(index){
            //selectedIndex = index;
            console.log(index);
            var selectedShort= {
                id: $scope.shorts[index].id,
                title: $scope.shorts[index].title,
                userId: $scope.shorts[index].userId,
                description: $scope.shorts[index].description,
                url: $scope.shorts[index].url,
                language:$scope.shorts[index].language
            };
            $scope.short = selectedShort;
            $scope.selectedIndex = index;
            console.log($scope.selectedIndex);

        }

        console.log("In upload Controller");

    }

})();