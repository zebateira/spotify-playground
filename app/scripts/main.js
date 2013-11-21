'use strict';

function myFilter(parsedResponse) {
	var datums = [],
			type = parsedResponse.info.type + '',
			list = parsedResponse[type + 's'],
	max = {
		artist: 5,
		album: 5,
		track: 10
	}[type];

	// thumbnail_url = https://embed.spotify.com/oembed/?url=

	for (var i = 0; i <= max || i < list.length; i++) {
		if( list[i] ) {
			datums.push({
				value: list[i].name,
				popularity: list[i].popularity,
				type: type,
				href: list[i].href,
				artist: list[i].artists ? list[i].artists[0].name : list[i].name
			});
		}
	}

	return datums;
}

/* global Hogan:false */

$('#ta').typeahead([
	{
		name: 'Artists',
		remote: {
			url: '//ws.spotify.com/search/1/artist.json?q=%QUERY',
			filter: myFilter
		},
		header: '<span class="my-header">Artists</span>'
	},
  {
		name: 'Albums',
		remote: {
			url: '//ws.spotify.com/search/1/album.json?q=%QUERY',
			filter: myFilter
		},
		engine: Hogan,
		template: '<span>{{value}}</span><span class="by-artist">by {{artist}}</span>',
		header: '<span class="my-header">Albums</span>'
	},
	{
		name: 'Tracks',
		remote: {
			url: '//ws.spotify.com/search/1/track.json?q=%QUERY',
			filter: myFilter
		},
		engine: Hogan,
		template: '<span>{{value}}</span><span class="by-artist">by {{artist}}</span>',
		header: '<span class="my-header">Tracks</span>',
	}
]).on('typeahead:selected', function(obj, datum) {

	var widgetUrl = '//embed.spotify.com/?uri=';

	if( datum.type === 'artist' ) {
		$.ajax({
			url: 'http://ws.spotify.com/search/1/track.json?q=artist:' + datum.value,
			success: function(data) {
				widgetUrl += 'spotify:trackset:Popular Songs:';

				for (var i = 0; i < data.tracks.length && i < 11; i++) {
					widgetUrl += data.tracks[i].href.split(':')[2] + ',';
				}
				
				$('#play-btn').attr('src', widgetUrl).show();
			}
		})
	}
	else {
		widgetUrl += datum.href;
		widgetUrl += (datum.type !== 'album' ? '&view=coverart' : '');

		$('#play-btn').attr('src', widgetUrl).show();
	}


});

$('.typeahead.input-sm').siblings('input.tt-hint').addClass('hint-small');
$('.typeahead.input-lg').siblings('input.tt-hint').addClass('hint-large');
