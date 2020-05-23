let GEO_CODER;
let SUMMARY_DATA = {};
let PANO_ID;
let GLOBAL;

function codeLatLng(lat, lng) {
  GEO_CODER = new google.maps.Geocoder();

  let latlng = new google.maps.LatLng(lat, lng);
  GEO_CODER.geocode(
    {
      latLng: latlng
    },
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          SUMMARY_DATA.actual_address = results[0].formatted_address;
        }
      }
    }
  );
}
function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

// ** 2
function TryRandomLocation(callback) {
  //
  let lat = getRandomInRange(-90, 90, 1);
  let lng = getRandomInRange(-180, 180, 1);
  //
  sv = new google.maps.StreetViewService();
  //
  sv.getPanorama(
    {
      location: new google.maps.LatLng(lat, lng),
      radius: 300000,
      source: google.maps.StreetViewSource.OUTDOOR
    },
    callback
  );
}


const test = () => {
  //test
}

function HandleCallback(data, status) {
  if (status === "OK") {
    let latitude = data.location.latLng.lat();
    let longitude = data.location.latLng.lng();

    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"),
      {
        visible: false
      }
    );

    panorama.setOptions({
      disableDefaultUI: true,
      panControl: true,
      zoomControl: true,
      showRoadLabels: false,
      streetViewControl: true
    });

    let latLng = new google.maps.LatLng(latitude, longitude);
    panorama.setPano(data.location.pano);
    PANO_ID = data.location.pano;
    panorama.setVisible(true);
    SUMMARY_DATA.actual_address = codeLatLng(latitude, longitude);
    SUMMARY_DATA.actual_lat = latitude;
    SUMMARY_DATA.actual_lng = longitude;
    
  } else {
    // Nothing here! Let's try another location.
    TryRandomLocation(HandleCallback);
  }
}
