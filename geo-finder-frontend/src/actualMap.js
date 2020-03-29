let ADDRESS_ARRAY = "";
let MAP;
let MARKERA;
let MARKERB;
let LATA;
let LNGA;
let LATB;
let LNGB;
let geocoder;

function initMap() {
  MAP = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2
  });
  google.maps.event.addListener(MAP, "click", function(event) {
    if (!SUMMARY_DATA.distance_in_mi) {
      let latitude = event.latLng.lat();
      let longitude = event.latLng.lng();
      initialize(latitude, longitude);
      placeMarker(event.latLng);
    }
  });
}

function initialize(latitude, longitude) {
  geocoder = new google.maps.Geocoder();
  codeLatitudeLng(latitude, longitude);
}

function codeLatitudeLng(lat, lng) {
  let latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode(
    {
      latLng: latlng
    },
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          let address = results[0].formatted_address;
          SUMMARY_DATA.guessed_address = address;

          ADDRESS_ARRAY = address;

          LATA = lat;
          LNGA = lng;
        }
      }
    }
  );
}

function placeMarker(location) {
  let submit = document.getElementById("submit-button");
  submit.style.display = "block";

  if (MARKERA && SUMMARY_DATA.distance_in_mi) {
    console.table("already submitted:", SUMMARY_DATA);
  } else if (MARKERA) {
    console.log("nothing submitted yet");
    MARKERA.setPosition(location);
  } else {
    MARKERA = new google.maps.Marker({
      position: location,
      map: MAP,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      }
    });
  }
}

function compareCoordinates() {
  let answerDiv = document.getElementById("answer");
  answerDiv.style.display = "block";
  let answerP = document.createElement("h4");
  console.log("text------------------------text");
  setTimeout(function() {
    answerP.textContent =
      "The actual location is " +
      SUMMARY_DATA.actual_address +
      `, about ${SUMMARY_DATA.distance_in_km} km/${SUMMARY_DATA.distance_in_mi} mi from your guess(${SUMMARY_DATA.guessed_address})`;
  }, 100);

  answerDiv.appendChild(answerP);
  SUMMARY_DATA.input_lat = MARKERA.position.lat();
  SUMMARY_DATA.input_lng = MARKERA.position.lng();

  init();
}
function init() {
  var flightPlanCoordinates = [
    { lat: MARKERA.position.lat(), lng: MARKERA.position.lng() },
    { lat: MARKERB.position.lat(), lng: MARKERB.position.lng() }
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: false,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  flightPath.setMap(MAP);
}

function refreshThePageWithNewStreetMap() {
  TryRandomLocation(HandleCallback);
  initMap();
}

function removeAnswerP() {
  let answerDiv = document.getElementById("answer");
  while (answerDiv.firstChild) {
    answerDiv.firstChild.remove();
  }
}
