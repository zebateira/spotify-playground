'use strict';

function doFilter(type, parsedResponse) {
  var datums = [];
  var group = parsedResponse[type + 's'];

  if (group === null) {
      return datums;
  }

  var list = group.items;

  // thumbnail_url = https://embed.spotify.com/oembed/?url=

  for (var i in list) {
    if( list[i] ) {
      datums.push({
        value: list[i].name,
        popularity: list[i].popularity,
        type: type,
        href: list[i].href,
        uri: list[i].uri,
        artist: list[i].artists ? list[i].artists[0].name : list[i].name
      });
    }
  }

  return datums;
}

function trackFilter(parsedResponse){
  return doFilter('track', parsedResponse);
}

function artistFilter(parsedResponse){
  return doFilter('artist', parsedResponse);
}

function albumFilter(parsedResponse){
  return doFilter('album', parsedResponse);
}

/* global Hogan:false */

$('#ta').typeahead([
  {
    name: 'Artists',
    remote: {
      url: '//api.spotify.com/v1/search?type=artist&q=%QUERY',
      filter: artistFilter
    },
    header: '<span class="my-header">Artists</span>',
  },
  {
    name: 'Albums',
    remote: {
      url: '//api.spotify.com/v1/search?type=album&q=%QUERY',
      filter: albumFilter
    },
    engine: Hogan,
    template: '<span>{{value}}</span><span class="by-artist">by {{artist}}</span>',
    header: '<span class="my-header">Albums</span>'
  },
  {
    name: 'Tracks',
    remote: {
      url: '//api.spotify.com/v1/search?type=track&q=%QUERY',
      filter: trackFilter
    },
    engine: Hogan,
    template: '<span>{{value}}</span><span class="by-artist">by {{artist}}</span>',
    header: '<span class="my-header">Tracks</span>',
  }
]).on('typeahead:selected', function(obj, datum) {

  var widgetUrl = '//embed.spotify.com/?uri=';

  if (datum.type === 'artist') {
    $.ajax({
      url: datum.href + '/top-tracks?country=us',
      success: function(data) {
        var topNumber = 11;

        widgetUrl += 'spotify:trackset:Top tracks for ' + datum.value;

        for (var i = 0; i < data.tracks.length && i < topNumber; i++) {
          widgetUrl += data.tracks[i].uri.split(':')[2] + ',';
        }

        $('#play-btn').attr('src', widgetUrl).show();
      }
  });
  }
  else {
    widgetUrl += datum.uri;
    widgetUrl += (datum.type !== 'album' ? '&view=coverart' : '');

    $('#play-btn').attr('src', widgetUrl).show();
  }


});

$('.typeahead.input-sm').siblings('input.tt-hint').addClass('hint-small');
$('.typeahead.input-lg').siblings('input.tt-hint').addClass('hint-large');
