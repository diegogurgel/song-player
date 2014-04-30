
(function(){
    options = {

    // Required. Called when a user selects an item in the Chooser.
    success: function(files) {
        var length = songs.titles.length;
        files.forEach(function(file,index){
            songs.titles.push(file);
            appendSongToList(index+length, file.name);

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
        });
    },

    // Optional. Called when the user closes the dialog without selecting a file
    // and does not include any parameters.
    cancel: function() {

    },

    // Optional. "preview" (default) is a preview link to the document for sharing,
    // "direct" is an expiring link to download the contents of the file. For more
    // information about link types, see Link types below.
    linkType: "direct", // or "direct"

    // Optional. A value of false (default) limits selection to a single file, while
    // true enables multiple file selection.
    multiselect: true, // or true

    // Optional. This is a list of file extensions. If specified, the user will
    // only be able to select files with these extensions. You may also specify
    // file types, such as "video" or "images" in the list. For more information,
    // see File types below. By default, all extensions are allowed.
    extensions: ['.mp3'],
};
    var button = Dropbox.createChooseButton(options);
    document.getElementById("drop-box").appendChild(button);

})();