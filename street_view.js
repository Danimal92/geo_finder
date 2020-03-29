let geocoder;

const SUMMARY_DATA = {};

let CURRENT_ADDRESS;

document.addEventListener("DOMContentLoaded", () => {
  newViewClickListener();
});

function codeLatLng(lat, lng) {
  geocoder = new google.maps.Geocoder();
  let latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode(
    {
      latLng: latlng
    },
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          let address = results[1].formatted_address;
        }
      }
    }
  );
}

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function TryRandomLocation(callback) {
  let lat = getRandomInRange(-90, 90, 1);
  let lng = getRandomInRange(-180, 180, 1);

  sv = new google.maps.StreetViewService();

  sv.getPanorama(
    {
      location: { lat: lat, lng: lng },
      radius: 300000,
      source: google.maps.StreetViewSource.OUTDOOR
    },
    callback
  );
}

function HandleCallback(data, status) {
  if (status === "OK") {
    let latitude = data.location.latLng.lat();

    let longitude = data.location.latLng.lng();

    let latLng = new google.maps.LatLng(latitude, longitude);
    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"),
      {
        pov: {
          heading: 34,
          pitch: 0
        },
        visible: false,
        linksControl: false,
        disableDefaultUI: true,
        panControl: true,
        zoomControl: true,
        showRoadLabels: false,
        streetViewControl: false,
        fullscreenControl: true,
        addressControl: false
      }
    );

    panorama.setPano(data.location.pano);
    panorama.setVisible(true);

    CURRENT_ADDRESS = codeLatLng(latitude, longitude);

    SUMMARY_DATA.actual_lat = latitude;
    SUMMARY_DATA.actual_lng = longitude;
  } else {
    // Nothing here! Let's try another location.
    TryRandomLocation(HandleCallback);
  }
}

function newViewClickListener() {
  let newViewButton = document.getElementById("new-view-button");
  newViewButton.addEventListener("click", () => {
    TryRandomLocation(HandleCallback);
  });
}
