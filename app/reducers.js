import { Map } from 'immutable';
import {
  ADD_DESTINATION,
  DELETE_DESTINATION,
  ADD_HOUSE,
  UPDATE_HOUSE_DATA,
} from './actions';
import uuid from 'uuid';

// State looks like:
// {
//   destinations: {
//     uuid: {
//       postcode,
//       latitude,
//       longitude,
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
    [uuid.v1()]: Map({ postcode: 'WC1X 9QZ' }),
  }),
  houses: Map(),
  commutes: Map(),
};

export function addDestinationReducer(state, action) {
  const destinations = state.destinations.set(uuid.v1(), Map({
    postcode: action.postcode,
  }));

  return Object.assign({}, state, { destinations });
}

export function deleteDestinationReducer(state, action) {
  return Object.assign({}, state, {
    destinations: state.destinations.delete(action.uuid),
  });
}

export function addHouseReducer(state, action) {
  const houses = state.houses.set(uuid.v1(), Map({ url: action.url }));

  return Object.assign({}, state, { houses });
}

export function updateHouseDataReducer(state, action) {
  const houseToUpdateUuid = state.houses.findKey((house) => house.get('url') === action.url);
  const houses = state.houses.setIn([houseToUpdateUuid, 'address'], action.address);

  return Object.assign({}, state, { houses });
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
    default:
      return state;
  }
}
