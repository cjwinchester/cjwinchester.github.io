(function($, _) {

    /*
     * main function to load and play this jPlayer playlist
     * @param {String} path_to_json_index
     *
     */
    function loadPlayer(path_to_json_index) {
    
        /* first, fetch a json file with the playlist index data
         *
         * the json should be an array of objects with these keys:
         *     - track (zero-padded number)
         *     - artist
         *     - title
         *     - url
         *
         * all values are strings
         *
         */
        $.getJSON(path_to_json_index, function(data) {
        
            // sort incoming data by track number
            var sorted_data = _.sortBy(data, function(d) {
                return +d.track;
            });

           // set up the template for the playlist table
            _.templateSettings.variable = "songs";
           var template = _.template($( "script.template" ).html());
            $('#playlist').html(template(sorted_data));
            
            // set progress bar colors
            var progress_color_bg = "#eaf2f7";
            var progress_color_fg = "#337ab7";
            
            // cache $ selectors
            var $playlist = $('#audio-player-playlist');
            var $playpause = $('.playpause');
            var $progress_bar = $(".playlist-progress-bar");
            var $nowplaying_pre = $(".playlist-nowplaying-pre");
            var $nowplaying_track = $(".playlist-nowplaying-track");
            var $playlist_items = $(".playlist-item");

            /*
             * fetch a song from the array by track
             *
             * @param {String} track
             *
             * @returns {Object} obj.this_song
             * @returns {Object} obj.next_song
             * @returns {Object} obj.previous_song 
             *
             */
            function songFetcher(track) {
                // fetch the active record
                var this_record = _.findWhere(sorted_data, { "track": track });
                
                // get this index
                var this_record_idx = _.findIndex(sorted_data, this_record);

                // try to find the next song by index
                var next_record = sorted_data[this_record_idx+1];
                // if not, go back to the beginning
                if (typeof next_record === "undefined") {
                    next_record = _.first(sorted_data);
                }

                // try to find the previous song by index
                var previous_record = sorted_data[this_record_idx-1];
                // if not, go to the end
                if (typeof previous_record === "undefined") {
                    previous_record = _.last(sorted_data);
                }

                // return an object
                var obj = {
                    this_song: this_record,
                    next_song: next_record,
                    previous_song: previous_record
                }

                return obj;
            }
            
            
            /* 
             * function to navigate to next/previous track
             *
             * @param {String} direction - "previous" decrements
             *
             */
            function getNextOrPrevious(direction) {
            
                // get current track number
                var current = $playlist.data('jPlayer').track;

                // get current record
                var playing_now = songFetcher(current);

                // set next or previous song
                if (direction === "previous") {
                    setAudioMedia(playing_now.previous_song);
                } else {
                    setAudioMedia(playing_now.next_song);
                }
                
                // play it
                $playlist.jPlayer('play');
                $playpause.text('Pause');
            }

            
            // function to play or pause the audio
            function playPauseAudio() {
                var jPd = $playlist.data('jPlayer');
                if ( jPd.status.currentTime > 0 && jPd.status.paused === false ) {
                    $playlist.jPlayer('pause');
                    $playpause.text('Play');
                 }
                else {
                    $playlist.jPlayer('play');
                    $playpause.text('Pause');
                }
            }
            
            /*
             * function to set player media
             *
             * @param {Object} song_obj - an object from the data array
             *
             */
            var setAudioMedia = function(song_obj) {
                // set the page title
                $('title').html([
                    "&#9835; ",
                    song_obj.artist,
                    " ~ ",
                    song_obj.title,
                    " &#9835;"
                ].join(""));

                $nowplaying_pre.html("Loading: ");
                $nowplaying_track.html(song_obj.artist + ' - ' + song_obj.title);
                $progress_bar.css("background", progress_color_bg);
                
                // set the media and add the track number to the object
                $playlist.jPlayer('setMedia', {
                    mp3: song_obj.url
                });
                
                $playlist.data('jPlayer').track = song_obj['track'];
                
                $playlist_items.removeClass('playlist-item-active');
                $("td#" + song_obj['track']).addClass('playlist-item-active');

            };

            // a callback function to create/update progress bars
            function onTimeUpdate(e) {
            
                // get current time
                var timeNow = e.jPlayer.status.currentTime;

                // get time song duration
                var timeLeft = e.jPlayer.status.duration;

                // calculate percent finished
                var pctDone = (timeNow / timeLeft) * 100;

                // set vendor-prefixed background styles
                $progress_bar.css({
                    "background": [
                        "-webkit-gradient(linear, left top,right top, color-stop(",
                        pctDone,
                        "%,",
                        progress_color_fg,
                        "), color-stop(",
                        pctDone,
                        "%,",
                        progress_color_bg,
                        "))"
                    ].join(""),
                    "background": [
                        "-moz-linear-gradient(left center,",
                        progress_color_fg,
                        " ",
                        pctDone,
                        "%, ",
                        progress_color_bg,
                        " ",
                        pctDone,
                        "%)"
                    ].join(""),
                    "background": [
                        "-o-linear-gradient(left,",
                        progress_color_fg,
                        " ",
                        pctDone,
                        "%, ",
                        progress_color_bg,
                        " ",
                        pctDone,
                        "%)"
                    ].join(""),
                    "background": [
                        "linear-gradient(to right,",
                        progress_color_fg,
                        " ",
                        pctDone,
                        "%, ",
                        progress_color_bg,
                        " ",
                        pctDone,
                        "%)"
                    ].join("")
                });
            };

            // init jplayer
            $playlist.jPlayer({
                supplied: 'mp3',
                swfPath: '/assets/js/',
                timeupdate: onTimeUpdate,
                ended: function() {
                    getNextOrPrevious("next");
                    $progress_bar.css("background", progress_color_bg);
                },
                canplay: function() {
                    $nowplaying_pre.html("Now playing: ");
                }
            });
            
            // set the first song
            setAudioMedia(_.first(sorted_data));
            
            // play/pause when the play/pause button is clicked
            $playpause.on('click', playPauseAudio);
            
            // navigate forward on click
            $('.next').on('click', function() {
                getNextOrPrevious("next");
            });

            // navigate back on click
            $('.prev').on('click', function() {
                getNextOrPrevious("previous");
            });

            // go to song when song titles are clicked
            $playlist_items.on('click', function() {
                var this_song = songFetcher(this.id);
                setAudioMedia(this_song.this_song);    
                $playlist.jPlayer('play');
                $playpause.text('Pause');
            });
    
        }).fail(function() {
                alert("Something went wrong. Try reloading the page.");
            });
        
    } // <!-- loadPlayer function -->
    
    // load it all up on doc ready
    $(document).ready(function() {
        loadPlayer("/data/mixtape.json");
    });

})(jQuery, _);