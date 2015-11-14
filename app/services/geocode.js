// Returns a promise which resolves to a LatLng
export default function geocode(google, address) {
  const { GeocoderStatus } = google.maps;
  const Geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    Geocoder.geocode({ address }, (results, status) => {
      if(status === GeocoderStatus.OK) {
        resolve(results[0].geometry.location);
      } else {
        reject(`Google returned error ${status}`);
      }
    });
  });
}
