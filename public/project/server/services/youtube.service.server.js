var request = require('request');
var url = 'https://www.googleapis.com/youtube/v3/search';
var API_KEY ='AIzaSyCHZ1oUry1vObeQXEjnxtlIWClMAlsLOYY';


module.exports=function(app) {
    app.get("/api/project/search/:query",findShortsByQuery);
    app.get("/api/project/search/:id",findShortById);

    function findShortsByQuery(req,res) {
        var query = req.params.query;

        var propertiesObject = { key: API_KEY,
            type: 'video',
            maxResults: '8',
            part: 'id,snippet',
            fields: 'items/id,items/snippet/title,items/snippet/description,' +
            'items/snippet/thumbnails/default,items/snippet/channelTitle',
            q: query
        };

        request({url:url, qs:propertiesObject}, function(err, response) {
            if(err) { console.log(err); return; }
            //console.log("response"+response.body);
            res.json(listResults(JSON.parse(response.body)));

        });
        //$http.get('https://www.googleapis.com/youtube/v3/search', {
        //        params: {
        //            key: 'AIzaSyCHZ1oUry1vObeQXEjnxtlIWClMAlsLOYY',
        //            type: 'video',
        //            maxResults: '8',
        //            part: 'id,snippet',
        //            fields: 'items/id,items/snippet/title,items/snippet/description,' +
        //            'items/snippet/thumbnails/default,items/snippet/channelTitle',
        //            q: query
        //        }
        //    })
        //    .success(function (data) {
        //        callback(listResults(data));
        //
        //    })
        //    .error(function () {
        //        callback(null);
        //    });


    }

    function listResults(data) {
        var results=[];
        console.log(data);
        //console.log("data"+data.items);
        for (var i = data.items.length - 1; i >= 0; i--) {
            results.push({
                id: data.items[i].id.videoId,
                title: data.items[i].snippet.title,
                description: data.items[i].snippet.description,
                url: "https://www.youtube.com/embed/" + data.items[i].id.videoId,
                author: data.items[i].snippet.channelTitle
            });
        }
        return results;

    }

    function findShortById(id) {
        var id = req.params.id;
        var propertiesObject= {
            key: API_KEY,
            q: id,
            part: 'id,snippet'
        };

        request({url:url, qs:propertiesObject}, function(err, response) {
            if(err) { console.log(err); return; }

            res.json(listResults(response.body));

        });


    }
}