// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = '../mp3/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Koolbear - Katalunia",
                "length": "03:45",
                "file": "01_Katalunia.mp3"
            }, {
                "track": 2,
                "name": "Koolbear - Laks",
                "length": "03:07",
                "file": "02_Laks.mp3"
            }, {
                "track": 3,
                "name": "Koolbear - Generator",
                "length": "03:06",
                "file": "03_Generator.mp3"
            }, {
                "track": 4,
                "name": "Koolbear - Mambo",
                "length": "02:53",
                "file": "04_Mambo.mp3"
            }, {
                "track": 5,
                "name": "Koolbear - Paris",
                "length": "03:22",
                "file": "05_Paris.mp3"
            }, {
                "track": 6,
                "name": "Koolbear - Chai latte",
                "length": "02:00",
                "file": "06_Chai_latte.mp3"
            }, {
                "track": 7,
                "name": "Koolbear - Habitat",
                "length": "03:48",
                "file": "07_Habitat.mp3"
            }, {
                "track": 8,
                "name": "Koolbear - Haw far",
                "length": "03:10",
                "file": "08_Haw_far.mp3"
            }, {
                "track": 9,
                "name": "Koolbear - Rubial",
                "length": "02:42",
                "file": "09_Rubial.mp3"
            }, {
                "track": 10,
                "name": "Koolbear - You you you",
                "length": "04:23",
                "file": "10_You_you_you.mp3"
            }],
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file; //+ extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});