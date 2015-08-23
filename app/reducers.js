import { Map } from 'immutable';
import { ADD_DESTINATION } from './actions';
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

const initialState = Map({
  destinations: Map(),
  houses: Map(),
  commutes: Map(),
});

export function househuntApp(state = initialState, action) {
  switch(action.type) {
    case ADD_DESTINATION:
      return state.setIn(['destinations', uuid.v1()], Map({ postcode: action.postcode }));
    default:
      return state;
  }
}
