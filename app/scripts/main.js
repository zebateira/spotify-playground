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
						datums.push(parsedResponse.artists[i].name);
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
						datums.push(parsedResponse.albums[i].name);
					}
				}
				return datums;
			}
		},
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
						datums.push(parsedResponse.tracks[i].name);
					}
				}
				return datums;
			}
		},
		header: '<span class="my-header">Tracks</span>'
	}
]);

$('.typeahead.input-sm').siblings('input.tt-hint').addClass('hint-small');
$('.typeahead.input-lg').siblings('input.tt-hint').addClass('hint-large');