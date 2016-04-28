import zipObject from 'lodash/array/zipObject';
import { TravelMode, LatLng, DirectionsStatus, DirectionsService } from '../maps';

const travelModes = Object.keys(TravelMode);
const directionsService = new DirectionsService();

// Returns a promise which resolves to the estimated travel time for each mode in seconds
export default function directions({ lat: fromLat, lng: fromLng }, { lat: toLat, lng: toLng }) {
  const from = new LatLng(fromLat, fromLng);
  const to = new LatLng(toLat, toLng);

  return Promise.all(
    travelModes.map((mode) => directionsForMode(from, to, mode))
  ).then(zipObject);
}

function directionsForMode(from, to, mode) {
  return new Promise((resolve) => {
    directionsService.route({
      origin: from,
      destination: to,
      travelMode: mode,
    }, (result, status) => {
      if(status === DirectionsStatus.OK) {
        resolve([mode, result.routes[0].legs[0].duration.value]);
      } else if(status === DirectionsStatus.OVER_QUERY_LIMIT) {
        return directionsForMode(from, to, mode);
      } else {
        resolve([mode, `Error: ${status}`]);
      }
    });
  });
}
