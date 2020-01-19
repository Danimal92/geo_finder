let ADDRESS_ARRAY = "";
let MAP;
let MARKERA;
let MARKERB;
let LATA;
let LNGA;
let LATB;
let LNGB;
let geocoder;



function initMap(){
    console.log("1: initMap")
    MAP = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 2
      });
    google.maps.event.addListener(MAP, 'click', function(event) {
        console.log("2: clicked on map")
            let latitude = event.latLng.lat();
            let longitude = event.latLng.lng();
            initialize(latitude, longitude);
            console.log("3.5")
            placeMarker(event.latLng);
    });
}

function initialize(latitude, longitude) {
    console.log("3 initialize")
  geocoder = new google.maps.Geocoder();
  codeLatitudeLng(latitude, longitude);
}

function codeLatitudeLng(lat, lng) {
    console.log("4: codeLatLng")
    console.log('actualMap.js')
    let latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
      'latLng': latlng
    }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          let address = results[0].formatted_address;
          SUMMARY_DATA.guessed_address = address
          console.log('SUPPOSEDLY GUESSED ADDRESS', SUMMARY_DATA.guessed_address)
          ADDRESS_ARRAY = address
          
          console.log("Address Array: ",ADDRESS_ARRAY);
          LATA = lat;
          LNGA = lng;
        }
      }
    });
   }

function placeMarker(location) {
    let submit = document.getElementById('submit-button');
    submit.style.display = "block"
    console.log("5: placeMarker")
    if(MARKERA){
        MARKERA.setPosition(location);
    } else {
        console.log("2nd")
        MARKERA = new google.maps.Marker({
            position: location, 
            map: MAP
        });
    }
        
}

function compareCoordinates(){
    console.log("6: compareCoordinates")
    let answerDiv = document.getElementById('answer');
    answerDiv.style.display = "block"
    let answerP = document.createElement('p');
    answerP.textContent = "Your guess is in " + ADDRESS_ARRAY;
    setTimeout(function(){ answerDiv.style.display = "none"}, 7000);
    setTimeout(removeAnswerP(), 8000);
    
    
    answerDiv.appendChild(answerP);
    SUMMARY_DATA.input_lat = MARKERA.position.lat();
    SUMMARY_DATA.input_lng = MARKERA.position.lng();
    console.log(MARKERA.position.lat(), MARKERA.position.lng());
    console.log(MARKERB.position.lat(), MARKERB.position.lng());
    init();
}
function init() {
    console.log("7: init")
    var flightPlanCoordinates = [
        {lat: MARKERA.position.lat(), lng: MARKERA.position.lng()},
        {lat: MARKERB.position.lat(), lng: MARKERB.position.lng()}
    ];
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(MAP);
    }

function refreshThePageWithNewStreetMap(){
    console.log("8: refreshThePageWithNewStreetMap")
    TryRandomLocation(HandleCallback);
    initMap();
}

function removeAnswerP(){
    let answerDiv = document.getElementById('answer');
    while (answerDiv.firstChild) {
        answerDiv.firstChild.remove()
    }
}

