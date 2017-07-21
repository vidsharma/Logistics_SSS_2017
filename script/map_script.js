google.maps.event.addDomListener(window, 'load', init);

var map;
var infowindow = null;
function initMap() {
  //googlemaps api docs can explain what each option does
  //I just kept tweaking until the colors matched the pages color scheeme, and
  //all of the place/road names and, icons were either removed or blended into
  //the background enough to stop them from cluttering the view
  var mapOptions = {
    center: new google.maps.LatLng(37.227827,-80.422021),
    zoom: 15,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
    },
    disableDoubleClickZoom: true,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    },
    scaleControl: true,
    scrollwheel: true,
    streetViewControl: false,
    draggable : true,
    overviewMapControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
   // styles: [{
   //   featureType:"poi",
   //   elementType:"all",
   //   stylers:[{
   //     visibility:"off"
   //   }]
   // },{
   //   featureType:"landscape.man_made",
   //   elementType:"all",
   //   stylers:[
   //   { visibility:"simplified" }
   //   ]
   // },{
   //   featureType:"poi.school",
   //   elementType:"all",
   //   stylers:[
   //   {
   //     visibility: "simplified"
   //   },
   //   {
   //     color:"#ff6666"
   //   }]
   // },{
   //   featureType:"poi.school",
   //   elementType:"labels",
   //   stylers:[{
   //     visibility:"off"
   //   }]
   // },{
   //   featureType:"road.local",
   //   elementType:"geometry",
   //   stylers:[
   //   {
   //     visibility:"simplified",
   //   },
   //   {
   //     color:"#c39b8b"
   //   }]
   // },{
   //   featureType:"water",
   //   elementType:"all",
   //   stylers:[{color:"#8b9dc3"}]
   // },{
   //   featureType: "all",
   //   elementType: "labels",
   //   stylers:[{
   //     visibility: "off"
   //   }]
   // },{
   //   featureType:"road.local",
   //   elementType:"labels.text.fill",
   //   stylers:[{
   //     visibility: "on",
   //     color: "#6FFFFF",
   //     weight:2.0
   //   }]
   // },{
   //   featureType:"road.artierial",
   //   elementType:"labels.text.fill",
   //   stylers:[{
   //     visibility: "on",
   //     color: "#FFFFFF",
   //     weight:2.0
   //   }]
   // }]
  };
  //You need to give the map an element to attach itself too.
  // The line below will put the map in any element with id ='map'
  // so in my site I just had a <div id="map"></div>
  var mapElement = document.getElementById('map');
  // The map object is created passing in the options, and element from above
  var map = new google.maps.Map(mapElement, mapOptions);
  // The objects in the `locations` array are used to create the pins (google calls them marker objects, you will see below)
  //    that appear on the map
  //
  // name: Becomes the title of the Marker object
  // latlang: Becomes the location of the Marker object. Latitude, Longitude  where the pin will be.
  //    I don't 100% recall how I figured these out. I think there might have been a utility somewhere
  //    on the web that I used to help, but I vaguely recall that if you open up the developer console
  //    and drop a pin on google maps it will say somewhere what the latitude/longitude at that pin is.
  // ico: Becomes the icon of the Marker object. The image to use as the actual pin on the map
  //    I found the icons for free on the internet and resized them so that they weren't too big.
  //    *The path is relative to the page.html where the map will be rendered, not relative to this file*.
  //    Urls should work too, I think.
  // ctent: Become the html attribute on the marker object
  //    this is the text that appears when you click on the pin with a little bit more info about each location.
  //    I will admit, I was playing around a bit when I decided to set this up instead of just putting the text
  //    on the page below the map.
  var locations = [{
    name:"Goodwin Hall",
    latlang:new google.maps.LatLng(37.232508, -80.425851),
    ico:'images/class.png',
    ctent:'<h4 class="text-muted">Goodwin Hall</h4>'+
      '<p>Daily Lectures will be held in Goodwin Hall Room 135. Students '+
      'will have access to power outlets for thier laptops.</p>'
  },{
    name:"Parking",
    latlang:new google.maps.LatLng(37.221338, -80.420498),
    ico:'images/car.png',
    ctent:'<h4 class="text-muted">Washington Street Parking Lot</h4>'+
      '<p>If you are driving to Virginia Tech, the closest parking lot to the '+
      'residence hall is the Washington Street Parking Lot near Cassell Coliseum. '+
      'You will be given a parking permit at check in which should be hung '+
      'from the rear-view mirror of your vehicle for the duration of the summer '+
      'school to avoid getting tickets on campus.</p>'
  },{
    name:"Parking Garage",
    latlang:new google.maps.LatLng(37.231230, -80.426216),
    ico:'images/car2.png',
    ctent:'<h4 class="text-muted">Perry Street Parking Garage</h4>'+
      '<p>Students who have driven to Virginia Tech may wish to park their '+
      'vehicles in the Perry Street Parking Garage while attending lectures '+
      'in Goodwin Hall.  If students choose to do so, parking permits should '+
      'still be hung from the rear-view mirror of your vehicle to avoid getting '+
      'tickets on campus.</p>'
  },{
    name:"D2 Dining Facility",
    latlang:new google.maps.LatLng(37.22497572, -80.42208096),
    ico:'images/food.png',
    ctent:'<h4 class="text-muted">'+
      '<a href="http://www.dining.vt.edu/centers/d2/dtwo.html" target="_blank">'+
      'D2 Dining Facility</a></h4>'+
      '<p>Students will recieve a meal card which grants them access '+
      'to the D2 dining facility. The D2 facility is a short walk from '+
      'Campbell Hall where students will be staying.</p>'
  },{
    name:"Campbell Hall",
    latlang:new google.maps.LatLng(37.22604852, -80.42205155),
    ico:'images/bed.png',
    ctent:'<h4 class="text-muted">Campbell Hall</h4>'+
      '<p>Students will be staying in '+
     '<a href="https://www.vt.edu/about/buildings/campbell-hall.html" target="_blank">'+
     'Campbell Hall</a>. Bed linens will be provided.'
  },{
    name:"Check-in (after 4pm)",
    latlang:new google.maps.LatLng(37.222206, -80.422463),
    ico:'images/welcome.png',
    ctent:'<h4 class="text-muted">New Hall West</h4>'+
     '<p>Formal check-in will take place in Campbell Hall (see map) from'+
     ' 11:00 AM until 4:00 PM on Sunday July 23<sup>rd</sup>. If you are driving'+
     ' to campus, please try to arrive during this time. However, if you are arriving'+
     ' at any other time, you will check-in here at New Hall West. The check-in'+
     ' desk is open 24 hours so just say that you are with the MolSSI Software'+
     ' Summer School</p>'
  },{
    name:"Smartway Bus",
    latlang: new google.maps.LatLng(37.229811,-80.418426),
    ico:'images/bus.png',
    ctent:'<h4 class="text-muted">Smartway Bus Stop</h4>'+
       '<p>The smart way bus will stop on the Almumni Mall Side'+
       ' of the Squires Student Center.  This is the side where '+
       'the construction is taking place, not the side facing College Ave.</p>'+
       '<em>The bus schedule can be found '+
       '<a href="http://www.smartwaybus.com/schedule.htm" target="_blank">here</a>.</em>'
  }];
  //I loop over the locations array and create another array of marker objects
  var marks = [];
  for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      icon: locations[i].ico,
      title:locations[i].name,
      position: locations[i].latlang,
      map: map,
      html:locations[i].ctent
    });
    marks.push(marker);
  }
  // This is the window that will appear on the marker when clicked. I created a single InfoWindow,
  // so that when you click on one marker, then another the first infobox wont stay on the map and cover it all up.
  infowindow = new google.maps.InfoWindow({
    content:"junk",
    maxWidth:200
  });
  //Loop over the markers and add an event listener to display the marker's html in the InfoWindow and open it over the marker
  //when the marker is clicked
  for (var i=0; i < marks.length; i++){
    var marker = marks[i];
    google.maps.event.addListener(marker,'click',function(){
      // I am certain I got this directly from an example on stack overflow.
      // I'm pretty sure `this` is the marker object passed to the callback function?
      infowindow.setContent(this.html);
      infowindow.open(map,this);
    });
  }
};
