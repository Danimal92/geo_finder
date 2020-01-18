let GEO_CODER;
let SUMMARY_DATA = {};
let PANO_ID;

function codeLatLng(lat, lng) {
    GEO_CODER = new google.maps.Geocoder();
    console.log('streetMap.js')
    let latlng = new google.maps.LatLng(lat, lng);
    GEO_CODER.geocode({
      'latLng': latlng
    },
    function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                let address = results[1].formatted_address;
                // console.log(address);
            } 
        }
    });
}
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

// ** 2 
function TryRandomLocation(callback) {
    // console.log('2')
    let lat = getRandomInRange(-90,90,1);
    let lng = getRandomInRange(-180,180,1);
    // console.log(`lat: ${lat}, lng: ${lng}`)
    sv = new google.maps.StreetViewService();
    // console.log('sv',sv)
    sv.getPanorama({
        location: new google.maps.LatLng(lat,lng),
        radius: 300000,
        source: google.maps.StreetViewSource.OUTDOOR,
    }, callback);
}
  
  // ** 3
  function HandleCallback(data, status) {
    
    //   console.log('3')
      if (status === 'OK') {
        let latitude = data.location.latLng.lat()
        let longitude = data.location.latLng.lng()
        // console.log('latitude',latitude)
        // console.log('longitude', longitude)
        let panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
              visible: false
        });

        panorama.setOptions({
            disableDefaultUI: true,
            panControl: true,
            zoomControl: true,
            showRoadLabels: false,
            streetViewControl: true
        })
        let latLng = new google.maps.LatLng(latitude, longitude)
        // console.log('lat long', latLng)
        panorama.setPano(data.location.pano)

        PANO_ID = data.location.pano
        panorama.setVisible(true);
        // console.log("panorama:",panorama)
        codeLatLng(latitude, longitude)
        SUMMARY_DATA.actual_lat = latitude
        SUMMARY_DATA.actual_lng = longitude
        // console.log(SUMMARY_DATA)

      } else {
        // console.log('5')
        // Nothing here! Let's try another location.
        TryRandomLocation(HandleCallback);
      }
      console.log("Done With Dan's code")
  }

 