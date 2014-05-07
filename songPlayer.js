
var path = require('path');
var fs = require('fs');
var id3 = require('id3js');
var express = require('express');
var app = express();
var http = require('http')
    , server = http.createServer(app)
    , io = require('socket.io').listen(server);

var config = {
    app: 'app',
    dist: 'dist'
};

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/app');








app.get('/', function(req,res,next){
    console.log("------------OK----------");
    res.cookie('bar', 'baz');
    res.render("index.html",{nome:"Diego Gurgel",idade:22});
    app.use(express.static(__dirname + '/app'));
    app.use(express.static(__dirname + '/bower_components')); 
});

app.get('/control', function(req,res,next){
    console.log("------------OK----------");
    res.cookie('bar', 'baz');
    res.render("control.html",{nome:"Diego Gurgel",idade:22});
    app.use(express.static(__dirname + '/app'));
});

app.get('/styles', function(req,res){
    
    console.log(req);
});
app.post('/next',function(req,res){
    io.sockets.in('123').emit('next');
    res.writeHead(200);
    res.end("ok");
});
app.post('/play',function(req,res){
    io.sockets.in('123').emit('play');
    res.writeHead(200);
    res.end("ok");
});
app.post('/pause',function(req,res){
    io.sockets.in('123').emit('pause');
    res.writeHead(200);
    res.end("ok");
});
app.post('/prev',function(req,res){
    io.sockets.in('123').emit('prev');
    res.writeHead(200);
    res.end("ok");
});



app.get('/songs',function(req,res){
    var json = {
        'titles':[]};

        res.writeHead(200, {"Content-Type": "json"});
        fs.readdir(config.app+"/songs", function (err, files) {
            var songs = files.filter(function(el){
                if(el.substring(el.length-4,el.length)===".mp3")
                {
                    return el;
                }
            });
            if(songs.length===0){
                returnSongList();
            }

            songs.forEach(function(song,index){
            id3({ file: 'app/songs/'+song, type: id3.OPEN_LOCAL }, function(err, tags) {
                
                tags.title = song;
                json.titles.push(tags);

                if(json.titles.length === songs.length){
                    returnSongList();
                }
            });

        });

            function returnSongList(){
                res.end(JSON.stringify(json));
            };



        });
});
server.listen(8080,'10.12.10.58');

io.sockets.on('connection',function(socket){
    //console.log(socket);
    socket.join('123');

    socket.on('pause',function(){
        io.sockets.in('123').emit('pause');
    })
    socket.on('next',function(){
        io.sockets.in('123').emit('next');
    })
    socket.on('prev',function(){
        io.sockets.in('123').emit('prev');
    })
});

