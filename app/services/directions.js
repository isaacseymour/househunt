import _ from 'lodash';

// Returns a promise which resolves to the estimated travel time for each mode in seconds
export default function directions(google, from, to) {
  const travelModes = Object.keys(google.maps.TravelModes);

  return Promise
    .all(travelModes.map((mode) => directionsForMode(google, from, to, mode)))
    .then(_.zipObject);
}

function directionsForMode(google, from, to, mode) {
  const { DirectionsStatus } = google.maps;
  const DirectionsService = new google.maps.DirectionsService();

  return new Promise((resolve) => {
    DirectionsService.route({
      origin: from,
      destination: to,
      travelMode: mode,
    }, (result, status) => {
      if(status === DirectionsStatus.OK) {
        resolve([mode, result.routes[0].legs[0].duration.value]);
      } else {
        resolve([mode, `Error: ${status}`]);
      }
    });
  });
}
