import { Map } from 'immutable';
import { ADD_HOUSE, DELETE_HOUSE, UPDATE_HOUSE_DATA } from '../actions/house';

export const addHouseReducer = (houses, { id, url }) => houses.set(id, Map({ url }));

export const deleteHouseReducer = (houses, { id }) => houses.delete(id);

export function updateHouseDataReducer(houses, { id, address, imageUrl, lat, lng }) {
  const merger = (prev, next) => next || prev;
  const updater = (house) => house.mergeWith(merger, { address, imageUrl, lat, lng });
  return houses.update(id, updater);
}

export default function houseReducer(houses = Map(), action) {
  switch(action.type) {
    case ADD_HOUSE:
      return addHouseReducer(houses, action);
    case UPDATE_HOUSE_DATA:
      return updateHouseDataReducer(houses, action);
    case DELETE_HOUSE:
      return deleteHouseReducer(houses, action);

    default:
      return houses;
  }
}
