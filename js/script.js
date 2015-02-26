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

      console.log(data);

      //PUSH triggers the loading of new pages in ratchet.  
      //Normally called with a touch event, we call it manually here
      PUSH({
        url        : 'inbox.html',
        transition : 'slide-in'
      });


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
    });
  }
      

});