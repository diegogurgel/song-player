(function () {
	player  = document.getElementsByTagName('audio')[0];
	$(".btn-play").click(function(){
		if(player.paused){
			player.play();

		}else{
			player.pause();

		}
	}).on('touchend', function(event) {
		event.preventDefault();
		if(player.paused){
			player.play();

		}else{
			player.pause();

		}
	});


	player.onpause= function(){
		$(".btn-play").removeClass("pause");
	}
	player.onplay = function(){
		$(".btn-play").addClass("pause");
		$(".songlist>ul>li").removeClass('playing');
		$($(".songlist>ul>li")[player.indexSong]).addClass('playing');
	}


	player.next = next;
	player.prev = prev;
	player.indexSong = 0
	player.onended = next;

	songs  = getListSongs();
	console.log(songs);
	if(songs.titles.length!=0){
		first();
	}


	$(".btn-next").click(function(event) {
		player.next();
	});
	$(".btn-prev").click(function(event) {
		player.prev();
	});

	function next () {
		player.indexSong++;
		if(player.indexSong===songs.titles.length){
			player.indexSong=0;
		}
		player.src="songs/"+songs.titles[player.indexSong].title;
		player.play();
	}
	function prev (){
		player.indexSong--;
		if(player.indexSong<0){
			player.indexSong=songs.titles.length-1;	
		}		
		player.src="songs/"+songs.titles[player.indexSong].title;
		player.play();
	}
	function first(){
		player.src="songs/"+songs.titles[player.indexSong].title;
	}
	player.playIndex = playSong;


   /*var goFS = document.getElementById("goFS");
   goFS.addEventListener("click", function() {
      document.body.webkitRequestFullscreen();
   }, false);*/


   for (var i = 0; i < songs.titles.length; i++) {
   		var title = songs.titles[i].title;
   		appendSongToList(i,title);
   }
   $('.songlist>ul>li').click(function(){
   		if($(this).hasClass("playing")){
   			if(player.paused){
   				player.play();
   			}else{
   				player.pause();
   			}
   		}else{
   			player.playIndex($(this).attr("pos"));	
   		}
   		
   		

   });
   


})();
	function playSong(index){
		
		if(songs.titles[index].link){
			player.src=songs.titles[index].link;
		}else{
			player.src="songs/"+songs.titles[index].title;
		}
		player.indexSong = index;
		player.play();



	}
	function appendSongToList(index, title){
		title = title.substring(0,title.length-4);
		$('.songlist>ul').append('<li pos='+index+'>'+title+'</li>');
	}

	function getListSongs(){
		var songs;
		$.ajax({
			url: 'songs',
			type: 'GET',
			async:false,
		})
		.done(function(data) {
			
			songs = data;

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			
		});
		return songs;
		
	}

	function preLoadNextSong(songName){
		$.ajax({
			url: 'songs/'+songName,
			type: 'GET',
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}