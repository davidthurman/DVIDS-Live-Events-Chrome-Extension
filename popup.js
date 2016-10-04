$(document).ready(function() {
  
});
function getImageUrl() {
  var searchUrl = 'http://api.dvidshub.net/live/list?max_results=3&api_key=key-57f3a82240293';
  $.get( searchUrl, function( data ) {
    var title1 = data.results[0].title;
    //alert(title1);
    console.log(data);
    $.each(data['results'], function(index, value) {
      // console.log(value);
      console.log(value['thumbnail']['url']);
      var singleVideo =
        '<a href="' + value['url'] + '">' +
          '<div class="single-video-container">' +
            '<div class="container-main-section">' +
              '<img class="thumbnail" src="' + value['thumbnail']['url'] + '"/>' +
              '<div class="single-video-title">' + value['title'] + '</div>' +
              '<div class="single-video-time">' + value['begin'] + '</div>' +
            '</div>' +
          '</div>' +
        '</a>';


        $( ".content-wrapper" ).prepend(singleVideo); 
    });
  });
}

getImageUrl();
