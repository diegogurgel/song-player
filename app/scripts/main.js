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
	});


	player.next = next;
	player.indexSong = 0
	player.onended = next;


		songs = {
		titles:["let_her","all_off_me"],

	};

	function next () {
		player.indexSong++;
		if(player.indexSong===songs.titles.length){
			player.indexSong=0;
		}
		player.src="songs/"+songs.titles[player.indexSong]+".mp3";
		player.play();
	}
	function prev (pos){
		player.indexSong--;
		if(player.indexSong===0){
			player.indexSong=songs.titles.length-1;	
		}		
		player.src="songs/"+songs.titles[player.indexSong]+".mp3";
		player.play();
	}


})();


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