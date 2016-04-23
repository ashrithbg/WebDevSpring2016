"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("FeedController",FeedController);

    function FeedController(UserService, FeedService, PostService) {
        var vm = this;
        vm.currentUser = null;
        vm.addComment = addComment;
        vm.deleteComment = deleteComment;
        vm.favorite = favorite;
        vm.unfavorite = unfavorite;

        function init(){

            UserService.getCurrentUser().then(function(response){
                    vm.currentUser = response.data;
                    FeedService.getFollowingPosts(vm.currentUser._id).then(function(response){
                        console.log("response of get following posts",JSON.stringify(response.data));
                        vm.feedPosts = response.data;
                    },function(err){
                        console.log("Error retrieving feed for user",JSON.stringify(err));
                    });
                    FeedService.getFollowingShorts(vm.currentUser._id).then(function(response){
                        console.log("response of get following shorts",JSON.stringify(response.data));
                        vm.feedShorts = response.data;
                    },function(err){
                        console.log("Error retrieving feed for user",JSON.stringify(err));
                    });
                    //if(vm.feedPosts.length == 0 && vm.feedShorts.length == 0){
                    //    vm.nofeed = true;
                    //}
                },
                function(err){
                    console.log("Error retrieving feed", JSON.stringify(err));
                }
            )

        }

        init();

        function addComment(post,comment){
            console.log("in add comment");
            var newComment = {
                content: comment.content,
                userId:vm.currentUser._id,
                username:vm.currentUser.username
            };
            PostService.addComment(post._id,newComment).then(function(response){
                vm.comment ={};
               return response;
            },function(err){
                console.log("Error adding a comment",JSON.stringify(err));

            }).then(function(response){
                FeedService.getFollowingPosts(vm.currentUser._id).then(function(response){
                    console.log("response of get following posts",JSON.stringify(response.data));
                    vm.feedPosts = response.data;
                },function(err){
                    console.log("Error retrieving feed for user",JSON.stringify(err));
                });
            },function(err){
                console.log("Could not get feed after adding a comment",JSON.stringify(err));
            });
        }

        function deleteComment(post,comment){

            PostService.deleteComment(post._id,comment._id).then(function(response){
                return response;
            },function(err){
                console.log("Error adding a comment",JSON.stringify(err));

            }).then(function(response){
                FeedService.getFollowingPosts(vm.currentUser._id).then(function(response){
                    console.log("response of get following posts",JSON.stringify(response.data));
                    vm.feedPosts = response.data;
                },function(err){
                    console.log("Error retrieving feed for user",JSON.stringify(err));
                });
            },function(err){
                console.log("Could not get feed after adding a comment",JSON.stringify(err));
            });

        }

        function favorite(post){
            PostService.userFavoritesPost(post._id,vm.currentUser.username).then(function(response){
                return response.data;
            },function(err){
                console.log("Could not like the post",JSON.stringify(err));
            }).then(function(response){
                FeedService.getFollowingPosts(vm.currentUser._id).then(function(response){
                    console.log("response of get following posts",JSON.stringify(response.data));
                    vm.feedPosts = response.data;
                },function(err){
                    console.log("Error retrieving feed for user",JSON.stringify(err));
                });
            },function(err){
                console.log("Could not get feed after favoriting a post",JSON.stringify(err));
            });

        }
        function unfavorite(post){
            PostService.userUnfavoritesPost(post._id,vm.currentUser.username).then(function(response){
                FeedService.getFollowingPosts(vm.currentUser._id).then(function(response){
                    console.log("response of get following posts",JSON.stringify(response.data));
                    vm.feedPosts = response.data;
                },function(err){
                    console.log("Error retrieving feed for user",JSON.stringify(err));
                });
            },function(err){
                console.log("Could not like the post",JSON.stringify(err));
            });

        }

    }

})();