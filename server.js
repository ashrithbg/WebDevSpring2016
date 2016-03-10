var express = require('express');


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


app.listen(port, ipaddress);