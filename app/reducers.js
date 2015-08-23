import { Map } from 'immutable';
import { ADD_DESTINATION, DELETE_DESTINATION } from './actions';
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

export function househuntApp(state = initialState, action) {
  switch(action.type) {
    case ADD_DESTINATION:
      return Object.assign({}, state, {
        destinations: state.destinations.set(uuid.v1(), Map({ postcode: action.postcode })),
      });
    case DELETE_DESTINATION:
      return Object.assign({}, state, {
        destinations: state.destinations.delete(action.uuid),
      });
    default:
      return state;
  }
}
