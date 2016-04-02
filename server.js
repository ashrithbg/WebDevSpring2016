var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var session = require('express-session');

var connectionString = 'mongodb://127.0.0.1:27017/formMakerDb';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.cookieParser());
app.use(express.session({ secret: "This is a secret"}));
app.use(express.static(__dirname + '/public'));

app.get('/hello', function(req, res){
    res.send('hello world');

});

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app) ;

app.listen(port, ipaddress);