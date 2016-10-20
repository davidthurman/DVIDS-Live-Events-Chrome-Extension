function show(liveEvent) {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  var notification = new Notification(liveEvent['title'], {
    icon: 'icon.png',
    body: liveEvent['description']
  });
  notification.onclick = function () {
    window.open(liveEvent['url']);      
  };
}

if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   
  localStorage.frequency = 1;        
  localStorage.isInitialized = true; 
}

// Test for notification support.
if (window.Notification) {
  var title = "";
  searchUrl = "http://api.dvidshub.net/live/list?max_results=5&api_key=5ecc9ab2da671a108d5f588c8ba1fd3911076a2f";
  var events = [];
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  $.get( searchUrl, function( data ) {
    $.each(data['results'], function(index, value) {
      title = value['title'];
      date = new Date(value['begin']);
      var day = date.getDate();
      var monthIndex = date.getMonth();
      monthIndex = monthIndex + 1;
      var year = date.getFullYear();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var newDate = monthIndex + '/' + day + '/' + year + ' ' + hours + ':' + minutes;
      var url = value['url'];
      var description = value['description'];
      var liveEvent = {"title":title, "date":newDate, "url":url, "description":description};
      events.push(liveEvent);
    });
  });
  console.log(events);
  
  // While activated, show notifications at the display frequency.
  //if (JSON.parse(localStorage.isActivated)) { show(title); }

  var interval = 0; 

  setInterval(function() {
    interval++;


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    today = mm+'/'+dd+'/'+yyyy + ' ' + hours + ':' + minutes;
    console.log(today);



    if (
      JSON.parse(localStorage.isActivated) &&
        localStorage.frequency <= interval
    ) {
      for (var i = 0; i < events.length; i++) {
        if (events[i]['date'] != today){
          console.log(events[i]['date']);
          console.log(today);
          console.log("Not yet");
        }
        else {
          console.log("Now");
          show(events[i]);
        }
      };
        interval = 0;
    }
  }, 60000);
}
