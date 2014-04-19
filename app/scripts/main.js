(function () {
	player  = document.getElementsByTagName('audio')[0];
	$(".btn-play").click(function(){
		if(player.paused){
			player.play();
			$(".btn-play").addClass("pause");
		}else{
			player.pause();
			$(".btn-play").removeClass("pause");
		}
	}).on('touchend', function(event) {
		event.preventDefault();
		if(player.paused){
			player.play();
			$(".btn-play").addClass("pause");
		}else{
			player.pause();
			$(".btn-play").removeClass("pause");
		}
	});


	player.next = next;
	player.indexSong = 0
	player.onended = next;

	songs  = getListSongs();

	function next () {
		player.indexSong++;
		if(player.indexSong===songs.titles.length){
			player.indexSong=0;
		}
		player.src="songs/"+songs.titles[player.indexSong].name;
		player.play();
	}
	function prev (pos){
		player.indexSong--;
		if(player.indexSong===0){
			player.indexSong=songs.titles.length-1;	
		}		
		player.src="songs/"+songs.titles[player.indexSong].name;
		player.play();
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

	function preLoadNextSong(){
		$.ajax({
			url: 'songs/let_her.mp3',
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