'use strict';

$('#ta').typeahead([
	{
		name: 'Artists',
		remote: {
			url: 'http://ws.spotify.com/search/1/artist.json?q=%QUERY',
			filter: function(parsedResponse) {
				var max = 5, datums = [];

				for (var i = 0; i <= max; i++) {
					if( parsedResponse.artists[i] ) {
						datums.push({
							value: parsedResponse.artists[i].name,
							name: parsedResponse.artists[i].name,
							popularity: parsedResponse.artists[i].popularity,
							type: parsedResponse.artists[i].type,
							href: parsedResponse.artists[i].href
						});
					}
				}

				return datums;
			}
		},
		header: '<span class="my-header">Artists</span>'
	},
  {
		name: 'Albums',
		remote: {
			url: 'http://ws.spotify.com/search/1/album.json?q=%QUERY',
			filter: function(parsedResponse) {
				var max = 3, datums = [];

				for (var i = 0; i <= max; i++) {
					if( parsedResponse.albums[i] ) {
						datums.push({
							value: parsedResponse.albums[i].name,
							name: parsedResponse.albums[i].name,
							type: parsedResponse.albums[i].type,
							popularity: parsedResponse.albums[i].popularity,
							href: parsedResponse.albums[i].href
						});
					}
				}
				console.log(datums);

				return datums;
			}
		},
		engine: Hogan,
		template: '<span>{{value}}</span>',
		header: '<span class="my-header">Albums</span>'
	},
	{
		name: 'Tracks',
		remote: {
			url: 'http://ws.spotify.com/search/1/track.json?q=%QUERY',
			filter: function(parsedResponse) {
				var max = 10, datums = [];

				for (var i = 0; i <= max; i++) {
					if( parsedResponse.tracks[i] ) {
						datums.push({
							value: parsedResponse.tracks[i].name,
							name: parsedResponse.tracks[i].name,
							type: parsedResponse.tracks[i].type,
							popularity: parsedResponse.tracks[i].popularity,
							href: parsedResponse.tracks[i].href
						});
					}
				}
				return datums;
			}
		},
		header: '<span class="my-header">Tracks</span>',
	}
]).on('typeahead:selected', function(obj, datum) {	
	$('#play-btn').attr('src', 'https://embed.spotify.com/?uri=' + datum.href + '&view=coverart').show();
});

$('.typeahead.input-sm').siblings('input.tt-hint').addClass('hint-small');
$('.typeahead.input-lg').siblings('input.tt-hint').addClass('hint-large');
