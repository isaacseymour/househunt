import { Map } from 'immutable';
import {
  ADD_DESTINATION,
  DELETE_DESTINATION,
  ADD_HOUSE,
  UPDATE_HOUSE_DATA,
  UPDATE_DESTINATION_DATA,
} from './actions';

// State looks like:
// {
//   destinations: {
//     uuid: {
//       postcode,
//       lat,
//       lng,
//     },
//     ...
//   },
//   houses: {
//     uuid: {
//       url,
//       postcode,
//       imageUrl,
//     }
//   },
//   commutes: {
//     `${house-uuid}.${destination-uuid}`:{
//       walking,
//       cycling,
//       transit,
//       driving,
//     },
//     ...
//   },
// }

const initialState = {
  destinations: Map({
    specialId: Map({ postcode: 'WC1X 9QZ' }),
  }),
  houses: Map(),
  commutes: Map(),
};

export function addDestinationReducer(state, { id, postcode }) {
  const destinations = state.destinations.set(id, Map({ postcode }));

  return Object.assign({}, state, { destinations });
}

export function deleteDestinationReducer(state, { id }) {
  return Object.assign({}, state, {
    destinations: state.destinations.delete(id),
  });
}

export function addHouseReducer(state, { id, url }) {
  const houses = state.houses.set(id, Map({ url: url }));

  return Object.assign({}, state, { houses });
}

export function updateHouseDataReducer(state, { id, address, imageUrl }) {
  const houses = state.houses.mergeIn([id], { address, imageUrl });

  return Object.assign({}, state, { houses });
}

export function updateDestinationDataReducer(state, { id, lat, lng }) {
  const destinations = state.destinations.mergeIn([id], { lat, lng });

  return Object.assign({}, state, { destinations });
}

export function househuntApp(state = initialState, action) {
  switch(action.type) {
    case ADD_DESTINATION:
      return addDestinationReducer(state, action);
    case DELETE_DESTINATION:
      return deleteDestinationReducer(state, action);
    case ADD_HOUSE:
      return addHouseReducer(state, action);
    case UPDATE_HOUSE_DATA:
      return updateHouseDataReducer(state, action);
    case UPDATE_DESTINATION_DATA:
      return updateDestinationDataReducer(state, action);

    default:
      return state;
  }
}
