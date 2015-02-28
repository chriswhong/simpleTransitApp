$( document ).ready(function() {

  // fade out splash screen after 1.8 seconds
  setTimeout(function(){
    $('.splashScreen').fadeOut();
  },1800)

  //listen for enter on number lookup 
  $('#stopInput').keypress(function(e) {
      if(e.which == 13) {
          var reqStopNumber = $(this).val();
          console.log(reqStopNumber);
          getStopData(reqStopNumber);
      }
  });
       

  function getStopData(reqStopNumber) {
       

    $.getJSON('http://mtabustrack.herokuapp.com/stoptimes/' + reqStopNumber, function(data){


      //PUSH triggers the loading of new pages in ratchet.  
      //Normally called with a touch event, we call it manually here
      PUSH({
        url        : 'inbox.html',
        transition : 'slide-in'
      },updateData);


      if (data.stop_times.length>0) {

      }

      // $('#stopId').text(stop_id);
      // $('#stopName').text(data.stop_name);

      // data.stop_times.forEach(function(s){
      //   var appendString = '<p>' + s.route_number + ' - ' + s.route_name + " " + s.direction_name + " - " + moment(s.stop_time).format('h:mm a') + " ";

      //   appendString += s.realtime ? '(estimated)' : '(scheduled)';

      //   $('#arrivalList').append(appendString);
      //   $('.results').show();
      // });
      function updateData() {
        console.log(data);
        //update Header
        $('.stopNumber').text(data.stop_id);
        $('.stopName').text(data.stop_name);

        //initialize the leaflet map, set options, view, and basemap
        var map = L.map('map', {
            zoomControl: false,
            scrollWheelZoom: false
          })
          .setView([39.2833, -76.6167], 12);

        L.tileLayer(
          'http://openmapsurfer.uni-hd.de/tiles/roadsg/x={x}&y={y}&z={z}', {
            minZoom: 0,
            maxZoom: 19,
            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);


        data.stop_times.forEach(function(stop_time) {
          console.log('hello');

          var s = '<li class=\"table-view-cell\">';
          s += "<p>" + stop_time.route_number + " - " + stop_time.route_name + " " + stop_time.direction_name + '</p>';
          s += "<p>" + stop_time.stop_time + "</p>";
          s += '</li>'

          $('.table-view').append(s);

        });


      }
    });

    
  }

  
      

});