var express = require('express');
var Youtube = require('youtube-video-api');

var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','GET, PUT, DELETE, POST');
    res.header('Access-Control-Allow-Headers',"Content-Type");
    console.log("here");
    next();
});

app.get('/hello', function(req, res){
    res.send('hello world');

});


//app.post("/api/shorts/upload", uploadShort);

//function uploadShort() {
//    var youtube = Youtube({
//        video: {
//            part: 'status,snippet'
//        }
//    });
//    var youtube = Youtube({
//        video: {
//            part: 'status,snippet'
//        },
//        email: 'ashrithbg@gmail.com',
//        password: 'Seinfeld7515'
//    });
//    var params = {
//        resource: {
//            snippet: {
//                title: 'test video',
//                description: 'This is a test video uploaded via the YouTube API'
//            },
//            status: {
//                privacyStatus: 'private'
//            }
//        }
//    };
//
//    youtube.authenticate('176797207413-8bmlj6ev8l3m4ur5dk45mr729rshpkg3.apps.googleusercontent.com', 'KxYD4NPtROmhmdTaEDvV5EBB', function (err, tokens) {
//        if (err)
//            return console.error('Cannot authenticate:', err)
//            uploadVideo();
//    });
//
//
//    youtube.on('auth:success', function (err) {
//        if (!err) {
//            youtube.upload('video.mp4', params, function (err, video) {
//                if (!err) console.log('Video was uploaded:', video.id)
//            })
//        }
//    });
//    youtube.authenticate('my-client-id', 'my-client-secret');
//
//
//    var youtube = Youtube({
//        video: {
//            part: 'status,snippet'
//        },
//        email: 'john@gmail.com',
//        password: 'svp3r_p@s$p0rd'
//    })
//
//    youtube.on('auth:success', function (err) {
//        if (!err) {
//            youtube.upload('path/to/video.mp4', {}, function (err, video) {
//                if (!err) console.log('Video was uploaded:', video.id)
//            })
//        }
//    })
//
//    //
//    function uploadVideo() {
//        youtube.upload('video.mp4', params, function (err, video) {
//            if (err) {
//                return console.error('Cannot upload video:', err);
//            }
//
//            console.log('Video was uploaded with ID:', video.id);
//
//            // this is just a test! delete it
//            //youtube.delete(video.id, function (err) {
//            //    if (!err) console.log('Video was deleted');
//            //});
//        });
//    }
//}

app.listen(port, ipaddress);