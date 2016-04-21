"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("ShortController",shortController);

    function shortController($location,ShortService,UserService) {

        //UserService.loggedIn();
        var vm = this;
        var currentUser =null;
        vm.error=null;
        vm.updateFlag= false;

        vm.$location = $location;

        vm.addShort = addShort;
        vm.deleteShort = deleteShort;
        vm.updateShort = updateShort;
        vm.selectShort = selectShort;
        vm.favorite = favorite;
        vm.reviewShort = reviewShort;
        vm.cancel = cancel;

        function init()
        {
            UserService.getCurrentUser().then(function (response) {
                currentUser = response.data;
                ShortService.findShortsForUser(
                    currentUser._id).then(
                    function (response) {
                        vm.shorts = response.data;
                    }, function (err) {
                        console.log("Error retrieving shorts" + err);
                    });
            }, function (err) {
                console.log("Error getting the current user");
            });
        }
        init();
        console.log("shorts"+vm.shorts);


        function favorite(short) {
            if(currentUser) {
                vm.short.likes = [];
                vm.short.likes.push(currentUser._id);
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
                vm.short.likes = [];
                vm.short.likes.push(currentUser._id);
                ShortService
                    .userLikesShort(currentUser._id, short);
            } else {
                $location.url("/login");
            }

        }



        function addShort(newShort){
            if(!newShort){
                vm.error = "You must enter a short title and a URL";
                return;
            }
            if(!newShort.title) {
                vm.error = "You must enter a short title";
                return;
            }
            if(!newShort.url){
                vm.error = "You must enter a URL for your short";
                return;
            }
            console.log("current user id"+currentUser._id);
            ShortService.addShortForUser(
                currentUser._id,
                newShort).then(
                function(response){
                    ShortService.findShortsForUser(
                        currentUser._id).then(
                        function(response){
                            vm.shorts = response.data;
                            vm.short = {};
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
            if(!short){
                vm.error = "You must enter a short title and a URL";
                return;
            }
            if(!short.title) {
                vm.error = "You must enter a short title";
                return;
            }
            if(!short.url){
                vm.error = "You must enter a URL for your short";
                return;
            }

            console.log("Short to be updated !",JSON.stringify(short));

            ShortService.updateShortById(short.ytID,
                short).then(
                function(response){
                    var selectedIndex = vm.selectedIndex;
                    console.log(vm.selectedIndex);
                    console.log("response"+JSON.stringify(response));
                    if (selectedIndex>=0){
                        vm.shorts[selectedIndex]=response.config.data;
                        vm.short={};
                        vm.updateFlag=false;

                    }

                },
                function(err){
                    console.log("Error while updating shorts"+err);
                }
            );
        }
        function deleteShort(index){
            var shorts = vm.shorts;
            var shortId = shorts[index].ytID;
            ShortService.deleteShortById(
                shortId).then(
                function(shorts){
                    ShortService.findShortsForUser(
                        currentUser._id).then(
                        function(response){
                            vm.shorts = response.data;
                        },function(err){
                                console.log("Error while retrieving shorts"+err);
                            });
                },function(err){
                    console.log("Error while deleting shorts"+err);
                });


        }
        //var selectedIndex = null;
        function selectShort(index){
            vm.updateFlag = true;
            var selectedShort= {
                _id: vm.shorts[index]._id,
                title: vm.shorts[index].title,
                userId: vm.shorts[index].userId,
                description: vm.shorts[index].description,
                url: vm.shorts[index].url,
                language:vm.shorts[index].language,
                ytID:vm.shorts[index].ytID,
                likes:vm.shorts[index].likes,
                reviews:vm.shorts[index].reviews
            };
            vm.short = selectedShort;
            vm.selectedIndex = index;
            console.log(vm.selectedIndex);

        }

        function cancel(){
            vm.updateFlag = false;
            vm.short={};
        }



    }

})();