(function(){


    angular
        .module("ShortKutApp")
        .controller("SearchDetailsController", SearchDetailsController);

    function SearchDetailsController( $rootScope, $location, $routeParams, UserService, ShortService, YoutubeService) {
        var vm = this;
        var id = $routeParams.id;
        console.log(id);
        var currentUser = $rootScope.currentUser;
        vm.updateFlag = false;
        vm.favorite = favorite;
        vm.unfavorite = unfavorite;
        vm.reviewShort = reviewShort;
        vm.selectedReview = selectedReview;
        vm.deleteReview = deleteReview;
        vm.updateReview = updateReview;
        vm.cancel = cancel;


        function init() {


            UserService.getCurrentUser().then(function(response){
                    var currentUser = response.data;
                     vm.likes =[];
                     vm.reviews =[];
                     if(currentUser.shortLikes.indexOf(id) > -1) {
                         vm.likes.push(currentUser._id);
                     }

                    ShortService.findUserLikes(id).then(
                        function(response){
                            vm.userLikes=[];
                            for(var like in response.data){
                                if(response.data[like]._id !=currentUser._id){
                                    vm.userLikes.push(response.data[like]);
                                }

                            }
                        },
                        function(err){
                            console.log("Error retrieving user likes for this short ",JSON.stringify(err));

                        }
                    );
                    ShortService.findShortReviews(id).then(
                        function(response){
                            vm.userReviews = response.data;
                            //for(var r in vm.userReviews){
                            //    if(currentUser._id == vm.userReviews[r].userId){
                            //        vm.review = vm.userReviews[r].userId;
                            //    }
                            //}
                        },function(err){
                            console.log("Error while retrieiving reviews for short",JSON.stringify(err));
                        });
                },
                function(err){
                    console.log("Error getting the current user",JSON.stringify(err));
                });

            fetchShort(id);


        }
        init();


        function fetchShort(id) {
            ShortService.findShortById(id).then(function(response){
                return response.data;
            },function(err){
                console.log("Error while retrieving search details from db"+err);
            }).then(function(response){
                if(!response)
                    YoutubeService.findShortById(id).then(renderDetails,renderError);
                else
                    vm.details = response;
            },function(err){
                console.log("Error while retrieving search details from youtube"+err);
            });


        }

        function renderDetails(response) {
            if(response!=null)
                vm.details = response.data[0];
        }
        function renderError(err){
            console.log("Error while retrieving search details"+err);
        }
        function favorite(short) {
            if(currentUser) {
                ShortService.userLikesShort(currentUser._id, short).then(
                    function(response){
                        if(vm.likes.indexOf(currentUser._id) == -1) {
                            vm.likes.push(currentUser._id);
                        }
                    },function(err){
                        console.log("Error while liking the short",JSON.stringify(err));
                    });
            } else {
                $location.url("/login");
            }
        }
        function unfavorite(short) {
            if(currentUser) {
                ShortService
                    .userUnlikesShort(currentUser._id, short).then(function(response){
                    vm.likes.splice(vm.likes.indexOf(currentUser._id),1);
                },function(err){
                    console.log("Error while unliking the short",JSON.stringify(err));
                });
            } else {
                $location.url("/login");
            }
        }

        function reviewShort (review,short){
            if(currentUser) {
                review.username = currentUser.username;
                review.userId = currentUser._id;
                ShortService.addReview(currentUser._id,short,review).then(
                    function(response){
                        vm.userReviews=response.data;
                        vm.review = {};
                    },
                    function(err){
                        console.log("Error retrieving reviews",console.log(err));
                    }
                );

            } else {
                $location.url("/login");
            }

        }



        function updateReview(review,short){

            if(currentUser) {

                ShortService.updateReview(id,review._id,review).then(
                    function(response){

                        vm.userReviews=response.data;
                        vm.review ={};
                        vm.updateFlag = false;
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
            if(currentUser) {


                ShortService.deleteReview(id,review._id).then(
                    function(response){
                        vm.userReviews=response.data;
                    },
                    function(err){
                        console.log("Error retrieving reviews",console.log(err));
                    }
                );

            } else {
                $location.url("/login");
            }

        }
        function selectedReview(review){
            vm.updateFlag=true;
            var selectedReview= {
                _id: review._id,
                content: review.content,
                userId: review.userId,
                username: review.username,
                rating:review.rating
            };
            vm.review = selectedReview;

        }

        function cancel(){
            vm.review = {};
            vm.updateFlag = false;
        }
    }
})();