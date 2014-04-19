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
	}


	player.next = next;
	player.prev = prev;
	player.indexSong = 0
	player.onended = next;

	songs  = getListSongs();
	first();

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

   var goFS = document.getElementById("goFS");
   goFS.addEventListener("click", function() {
      document.body.webkitRequestFullscreen();
   }, false);


})();

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