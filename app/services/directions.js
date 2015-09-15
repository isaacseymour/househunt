// Google gets loaded in index.html, so is always on the global scope here.
export const { LatLng, TravelMode } = google.maps;
const { DirectionsStatus } = google.maps;
const DirectionsService = new google.maps.DirectionsService();

// Returns a promise which resolves to the estimated travel time in seconds.
// `mode` must be one of `TravelMode.WALKING`, `.TRANSIT`, `.DRIVING`, `.BICYCLING`.
export default function directions(from, to, mode) {
  return new Promise((resolve, reject) => {
    DirectionsService.route({
      origin: from,
      destination: to,
      travelMode: mode,
    }, (result, status) => {
      if(status === DirectionsStatus.OK) {
        resolve(result.routes[0].legs[0].duration.value);
      } else {
        reject(`Google returned error ${status}`);
      }
    });
  });
}
