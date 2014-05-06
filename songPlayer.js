var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var id3 = require('id3js');

var config = {
    app: 'app',
     dist: 'dist'
};

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/dist');



app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/bower_components')); 
console.log(__dirname + '/bower_components');


app.get('/', function(req,res){
    res.render("index.html");

});

app.get('/styles', function(req,res){
    
    console.log(req);
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
                                            /*json.titles.push({
                                                "name":song
                                            });*/
                                                id3({ file: 'app/songs/'+song, type: id3.OPEN_LOCAL }, function(err, tags) {
                                                    console.log(song,err);
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


app.listen(8080);