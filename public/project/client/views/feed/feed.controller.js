"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("FeedController",FeedController);

    function FeedController(UserService, FeedService, PostService, ShortService) {
        var vm = this;
        vm.currentUser = null;
        vm.addComment = addComment;
        vm.deleteComment = deleteComment;
        vm.favorite = favorite;
        vm.unfavorite = unfavorite;

        vm.reviewShort = reviewShort;
        vm.selectedReview = selectedReview;
        vm.deleteReview = deleteReview;
        vm.updateReview = updateReview;
        vm.cancel = cancel;


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
                        vm.updateFlags = [];
                        vm.reviews = [];
                        for(var i=0;i<vm.feedShorts.length;i++){
                            vm.updateFlags.push(false);
                        }
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


        function reviewShort (review,short,index){
            if(vm.currentUser) {
                console.log("In search controller",JSON.stringify(short));
                console.log("In search controller",JSON.stringify(review));
                review.username = vm.currentUser.username;
                review.userId = vm.currentUser._id;
                ShortService.addReview(vm.currentUser._id,short,review).then(
                    function(response){
                        console.log("reviews",JSON.stringify(response.data));
                        vm.userReviews=response.data;
                        vm.reviews[index] = {};
                        FeedService.getFollowingShorts(vm.currentUser._id).then(function(response){
                            console.log("response of get following shorts",JSON.stringify(response.data));
                            vm.feedShorts = response.data;
                        },function(err){
                            console.log("Error retrieving feed for user",JSON.stringify(err));
                        });
                    },
                    function(err){
                        console.log("Error retrieving reviews",console.log(err));
                    }
                );

            } else {
                $location.url("/login");
            }

        }



        function updateReview(review,short,index){

            if(vm.currentUser) {
                console.log("In search controller",JSON.stringify(short));
                console.log("In search controller",JSON.stringify(review));

                ShortService.updateReview(short.ytID,review._id,review).then(
                    function(response){
                        console.log("reviews",JSON.stringify(response.data));
                        vm.userReviews=response.data;
                        vm.reviews[index] ={};
                        vm.updateFlags[index] = false;
                        FeedService.getFollowingShorts(vm.currentUser._id).then(function(response){
                            console.log("response of get following shorts",JSON.stringify(response.data));
                            vm.feedShorts = response.data;

                        },function(err){
                            console.log("Error retrieving feed for user",JSON.stringify(err));
                        });
                    },
                    function(err){
                        console.log("Error retrieving reviews",console.log(err));
                    }
                );

            } else {
                $location.url("/login");
            }
        }
        function deleteReview(review,short){
            if(vm.currentUser) {
                console.log("To be deleted review",JSON.stringify(review));

                ShortService.deleteReview(short.ytID,review._id).then(
                    function(response){
                        console.log("reviews",JSON.stringify(response.data));
                        vm.userReviews=response.data;
                        FeedService.getFollowingShorts(vm.currentUser._id).then(function(response){
                            console.log("response of get following shorts",JSON.stringify(response.data));
                            vm.feedShorts = response.data;
                        },function(err){
                            console.log("Error retrieving feed for user",JSON.stringify(err));
                        });
                    },
                    function(err){
                        console.log("Error retrieving reviews",console.log(err));
                    }
                );

            } else {
                $location.url("/login");
            }

        }
        function selectedReview(review,index){

            console.log("In selected review",JSON.stringify(review));
            var selectedReview= {
                _id: review._id,
                content: review.content,
                userId: review.userId,
                username: review.username,
                rating:review.rating
            };
            vm.reviews[index] = selectedReview;
            vm.updateFlags[index]=true;

        }

        function cancel(index){
            vm.reviews[index] = {};
            vm.updateFlags[index]=false;

        }

    }

})();