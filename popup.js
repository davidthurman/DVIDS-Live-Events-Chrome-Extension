$(document).ready(function() {
  
});
function getImageUrl() {
  var searchUrl = 'http://api.dvidshub.net/live/list?max_results=5&api_key=key-57f3a82240293';
  //var searchUrl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/32509460?api_key=RGAPI-d75c4630-e53f-4d28-a9c9-6729774e99ae';

  $.get( searchUrl, function( data ) {
    var title1 = data.results[0].title;
    console.log(data);
    console.log("Test");
    data['results'] = data['results'].reverse();
    $.each(data['results'], function(index, value) {
      console.log(value['thumbnail']['url']);
      console.log(index);

      // var urlTest = "https://www.dvidshub.net/webcast/9488";
      // var thumbnailTest = "http://static.dvidshub.net/media/thumbs/webcast/images/dod_default/122x92_q95.jpg";
      // var titleTest = "AUSA Military Family Forum III";
      // var beginTimeTest = "2016-10-05T12:45:00+00:00";
      // var descriptionTest = "“A Town Hall with Senior Army Leaders”\r\n\r\nSpeakers:\r\nHON Eric K. Fanning\r\nSecretary of the Army\r\n\r\nGEN Mark A. Milley\r\nChief of Staff\r\nUnited States Army\r\n\r\nSMA Daniel A. Dailey\r\nSergeant Major of the Army\r\n\r\nMrs. Hollyanne Milley\r\n\r\nMrs. Holly Dailey";
      
      // var singleVideo =
      //   '<a href="' + urlTest + '">' +
      //     '<div class="single-video-container">' +
      //       '<div class="container-main-section">' +
      //         '<div class="thumbnail-wrapper">' +
      //           '<img class="thumbnail" src="' + thumbnailTest + '"/>' +
      //         '</div>' +
      //         '<div class="single-video-title">' + titleTest + '</div>' +
      //         '<div class="single-video-time">' + beginTimeTest + '</div>' +
      //       '</div>' +
      //       '<div class="single-video-summary">' + descriptionTest + '</div>' +
      //     '</div>' +
      //   '</a>';

      var singleVideo =
        '<a id="container-link" href="' + value['url'] + '">' +
          '<div class="single-video-container">' +
            '<div class="container-main-section">' +
              '<div class="thumbnail-wrapper">' +
                '<img class="thumbnail" src="' + value['thumbnail']['url'] + '"/>' +
              '</div>' +
              '<div class="single-video-title">' + value['title'] + '</div>' +
              '<div class="single-video-time">' + value['begin'] + '</div>' +
            '</div>' +
            '<div class="single-video-summary">' + value['description'] + '</div>' +
          '</div>' +
        '</a>';
        if (index != 0){
          singleVideo = singleVideo + '<hr>';
        }
        


        $( ".content-wrapper" ).prepend(singleVideo); 
    });
  $("#container-link").click(function() {
      var newURL = "https://reddit.com";
      chrome.tabs.create({ url: newURL });
    });
  });
}

// chrome.browserAction.onClicked.addListener(function(activeTab)
// {
//     var newURL = "http://www.youtube.com/watch?v=oHg5SJYRHA0";
//     chrome.tabs.create({ url: newURL });
// });

getImageUrl();
// var newURL = "http://www.youtube.com/watch?v=oHg5SJYRHA0";
// chrome.tabs.create({ url: newURL });
