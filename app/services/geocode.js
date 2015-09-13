// Google gets loaded in index.html, so is always on the global scope here.
const { LatLng, GeocoderStatus } = google.maps;
const Geocoder = new google.maps.Geocoder();

export default function geocode(address) {
  return new Promise((resolve, reject) => {
    Geocoder.geocode({ address }, (results, status) => {
      if(status == GeocoderStatus.OK) {
        resolve(results[0].geometry.location);
      } else {
        reject(`Google returned error ${status}`);
      }
    });
  });
}
