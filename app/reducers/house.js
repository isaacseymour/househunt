import { Map } from 'immutable';
import { REQUEST_HOUSE, DELETE_HOUSE, UPDATE_HOUSE_DATA } from '../actions/house';
import { POPULATE_COMMUTE } from '../actions/commute';
import { DELETE_DESTINATION } from '../actions/destination';

function requestHouseReducer(houses, { id, url }) {
  return houses.set(id, Map({ url, commutes: Map({}) }));
}

const deleteHouseReducer = (houses, { id }) => houses.delete(id);

function updateHouseDataReducer(houses, { id, address, imageUrl, lat, lng }) {
  // We want to take the newer data so long as it's not falsey (i.e. undefined/null).
  // mergeWith's first argument resolves any conflicts
  const merger = (prev, next) => next || prev;
  const updater = (house) => house.mergeWith(merger, { address, imageUrl, lat, lng });
  return houses.update(id, updater);
}

function populateCommuteReducer(houses, { houseId, destinationId, commutes }) {
  return houses.setIn([houseId, "commutes", destinationId], new Map(commutes));
}

function deleteDestinationReducer(houses, { id }) {
  return houses.map((house) => house.deleteIn(["commutes", id]));
}

export default function houseReducer(houses = Map(), action) {
  switch(action.type) {
    case REQUEST_HOUSE:
      return requestHouseReducer(houses, action);
    case UPDATE_HOUSE_DATA:
      return updateHouseDataReducer(houses, action);
    case DELETE_HOUSE:
      return deleteHouseReducer(houses, action);
    case POPULATE_COMMUTE:
      return populateCommuteReducer(houses, action);
    case DELETE_DESTINATION:
      return deleteDestinationReducer(houses, action);

    default:
      return houses;
  }
}
