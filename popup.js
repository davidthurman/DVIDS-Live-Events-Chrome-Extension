document.addEventListener('DOMContentLoaded', function() {
    var liveEventButton = document.getElementById('')

    var settingsButton = document.getElementById('settings');
    settingsButton.addEventListener('click', function(){
      chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
    });

    var settingsButtonForLive = document.getElementById('settingsForLive');
    settingsButtonForLive.addEventListener('click', function(){
      chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
    });

    var searchButton = document.getElementById('searchButton');
    var loading = document.getElementById('loading');
    loading.style.display = 'none';
    var searchLoading = document.getElementById('searchLoading');
    searchLoading.style.display = 'none';

    var liveTabButton = document.getElementById('liveTabButton');
    var searchTabButton = document.getElementById('searchTabButton');
    var liveTabDiv = document.getElementById('liveTab');
    var searchTabDiv = document.getElementById('searchTab');
    searchTabButton.addEventListener('click', function(){
      liveTabDiv.style.display = 'none';
      searchTabDiv.style.display = 'block';
      searchTabButton.style.borderBottom = '4px solid #666666';
      liveTabButton.style.borderBottom = '2px solid #666666';
      $( ".content-wrapper" ).empty();
    });
    liveTabButton.addEventListener('click', function(){
      searchTabDiv.style.display = 'none';
      liveTabDiv.style.display = 'block';
      searchTabButton.style.borderBottom = '2px solid #666666';
      liveTabButton.style.borderBottom = '4px solid #666666';
      var loading = document.getElementById('loading');
      loading.style.display = 'block';
      $( ".content-wrapper" ).empty();
      var searchUrl = 'http://api.dvidshub.net/live/list?max_results=5&thumb_width=200&api_key=5ecc9ab2da671a108d5f588c8ba1fd3911076a2f';

      $.get( searchUrl, function( data ) {
        $.each(data['results'].reverse(), function(index, value) {
          var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];
          var d = new Date(value['begin']);
          var day = d.getDate();
          var monthIndex = d.getMonth();
          var year = d.getFullYear();
          var hours = d.getHours();
          var minutes = d.getMinutes();
          var singleVideo =
            '<a target="_blank" href="' + value['url'] + '">' +
              '<div class="single-video-container" data-url="' + value['url'] + '">' +
                '<div class="container-main-section">' +
                  '<div class="thumbnail-wrapper">' +
                    '<img class="img-rounded live-thumbnail" src="' + value['thumbnail']['url'] + '"/>' +
                  '</div>' +
                  '<div class="single-video-title">' + value['title'] + '</div>' +
                  '<div class="single-video-time">' + (monthIndex + 1) + "/" + day + "/" + year + "<br>" + hours + ":" + minutes + '</div>' +
                '</div>' +
                '<div class="live-single-video-summary">' + value['description'] + '</div>' +
              '</div></a>';
            if (index != 0){
              singleVideo = singleVideo + '<hr>';
            }
            
            $( ".content-wrapper" ).prepend(singleVideo); 
        });
      loading.style.display = 'none';
      });
    });


    searchButton.addEventListener('click', function() {
      $( ".content-wrapper" ).empty();
      searchLoading.style.display ='block';
      var searchParams = document.getElementById("searchBox").value;
      var searchUrl = 'https://api.dvidshub.net/search?q=' + searchParams;
      var dropdown = document.getElementById("types");
      var type = dropdown.options[dropdown.selectedIndex].value;
      if (type != "NA"){
        searchUrl = searchUrl + '&type=' + type;
      }
      dropdown = document.getElementById("max");
      var max = dropdown.options[dropdown.selectedIndex].value;
      if (max != "NA") {
        searchUrl = searchUrl + '&max_results=' + max;
      }
      dropdown = document.getElementById("branch");
      var branch = dropdown.options[dropdown.selectedIndex].value;
      if (branch != "NA") {
        searchUrl = searchUrl + '&branch=' + branch;
      }
      searchUrl = searchUrl  + '&api_key=5ecc9ab2da671a108d5f588c8ba1fd3911076a2f';
      $.get( searchUrl, function( data ) {
        $.each(data['results'].reverse(), function(index, value) {
          if (value['type'] == "publication_issue" || value["type"] == "webcast"){
            return true;
          }
          var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];
          if (value['type'] == "video"){
            var d = new Date(value['date_published']);
          }
          else if (value['type'] == "news" || value['type'] == "image" || value["type"] == "audio"){
            var d = new Date(value['date']);
          }
          var day = d.getDate();
          var monthIndex = d.getMonth();
          var year = d.getFullYear();
          var hours = d.getHours();
          var minutes = d.getMinutes();
          var singleVideo = '';
          if (value['type'] == "video"){
            singleVideo =
            '<a target="_blank" href="' + value['url'] + '">' +
              '<div class="single-video-container" data-url="' + value['url'] + '">' +
                '<p class="videoTypeTitle">' + value['type'] + '</p>' +
                  '<div class="container-main-section">' +
                    '<div class="thumbnail-wrapper">' +
                      '<img class="thumbnail, img-rounded" src="' + value['thumbnail'] + '"/>' +
                    '</div>' +
                    '<div class="single-video-title">' + value['title'] + '</div>' +
                    '<div class="single-video-time">' + (monthIndex + 1) + "/" + day + "/" + year + '</div>' +
                  '</div>' +
                  '<div class="single-video-summary">' + value['short_description'] + '</div>' +
              '</div></a>';
          }
          else if (value['type'] == "news" || value['type'] == "image") {
            singleVideo =
            '<a target="_blank" href="' + value['url'] + '">' +
              '<div class="single-video-container" data-url="' + value['url'] + '">' +
              '<p class="videoTypeTitle">' + value['type'] + '</p>' +
                '<div class="container-main-section">' +
                  '<div class="thumbnail-wrapper">' +
                    '<img class="thumbnail, img-rounded" src="' + value['thumbnail'] + '"/>' +
                  '</div>' +
                  '<div class="single-video-title">' + value['title'] + '</div>' +
                  '<div class="single-video-time">' + (monthIndex + 1) + "/" + day + "/" + year + '</div>' +
                '</div>' +
                '<div class="single-video-summary">' + value['short_description'] + '</div>' +
              '</div></a>';
          }
          else if (value['type'] == "audio") {
            singleVideo =
            '<a target="_blank" href="' + value['url'] + '">' +
              '<div class="single-video-container" data-url="' + value['url'] + '">' +
                '<div class="container-main-section">' +
                  '<div class="single-video-title">' + value['title'] + '</div>' +
                  '<div class="single-video-time">' + (monthIndex + 1) + "/" + day + "/" + year + '</div>' +
                '</div>' +
                '<div class="single-video-summary">' + value['short_description'] + '</div>' +
              '</div></a>';
          }
          
            if (index != 0){
              singleVideo = singleVideo + '<hr>';
            }
            
            $( ".content-wrapper" ).prepend(singleVideo); 
        });
      searchLoading.style.display = 'none';
      });

    });
});