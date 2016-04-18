"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("ShortController",shortController);

    function shortController($scope,$location,ShortService,UserService) {

        //UserService.loggedIn();
        var currentUser =null;
        UserService.getCurrentUser().then(function(response){
                currentUser= response.data;
                ShortService.findShortsForUser(
                currentUser._id).then(
                function(response){
                    $scope.shorts =response.data;
                },function(err){
                    console.log("Error retrieving shorts"+err);
                });
        }, function(err){
            console.log("Error getting the current user");
        });

        console.log("shorts"+$scope.shorts);
        $scope.$location = $location;

        $scope.addShort = addShort;
        $scope.deleteShort = deleteShort;
        $scope.updateShort = updateShort;
        $scope.selectShort = selectShort;
        $scope.favorite = favorite;
        $scope.reviewShort = reviewShort;
        //$scope.getShortsByUser = getShortsByUser;

        function favorite(short) {
            if(currentUser) {
                $scope.short.likes = [];
                $scope.short.likes.push(currentUser._id);
                ShortService
                    .userLikesShort(currentUser._id, short).then(
                    function(response){
                        UserService.setCurrentUser(response.data);
                    },
                    function(err){
                        console.log("Error while getting updated user after likes",JSON.stringify(err));
                    }
                );
            } else {
                $location.url("/login");
            }
        }

        function reviewShort(review,short){
            if(currentUser) {
                $scope.short.likes = [];
                $scope.short.likes.push(currentUser._id);
                ShortService
                    .userLikesShort(currentUser._id, short);
            } else {
                $location.url("/login");
            }

        }



        function addShort(newShort){
            if(!newShort || !newShort.title)
                return;
            console.log("current user id"+currentUser._id);
            ShortService.addShortForUser(
                currentUser._id,
                newShort).then(
                function(response){
                    ShortService.findShortsForUser(
                        currentUser._id).then(
                        function(response){
                            $scope.shorts = response.data;
                            $scope.short = {};
                        },function(err){
                            console.log("Error while retrieving shorts"+err);
                    });
                },
                function(err){
                    console.log("Error could not add short"+err);
                }
            );
            //ShortService.addShortForUser(newShort);
        }

        function updateShort(short){
            console.log("short to be updated"+short.title);
            console.log("short to be updated"+short._id);

            ShortService.updateShortById(short._id,
                short).then(
                function(response){
                    var selectedIndex = $scope.selectedIndex;
                    console.log($scope.selectedIndex);
                    console.log("response"+JSON.stringify(response));
                    if (selectedIndex>=0){
                        //console.log(selectedIndex);
                        //console.log(response.config.data.id);
                        //console.log(response.data.title);
                        $scope.shorts[selectedIndex]=response.config.data;
                        $scope.short={};

                    }

                },
                function(err){
                    console.log("Error while updating shorts"+err);
                }
            );
        }
        function deleteShort(index){
            var shorts = $scope.shorts;
            var shortId = shorts[index]._id;
            ShortService.deleteShortById(
                shortId).then(
                function(shorts){
                    ShortService.findShortsForUser(
                        currentUser._id).then(
                        function(response){
                            $scope.shorts = response.data;
                        },function(err){
                                console.log("Error while retrieving shorts"+err);
                            });
                },function(err){
                    console.log("Error while deleting shorts"+err);
                });


        }
        //var selectedIndex = null;
        function selectShort(index){
            console.log("In select short");
            console.log("In select short"+index);
            var selectedShort= {
                _id: $scope.shorts[index]._id,
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



    }

})();