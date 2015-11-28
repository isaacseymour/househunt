import { combineReducers } from 'redux';

import commuteReducer from './reducers/commute';
import destinationReducer from './reducers/destination';
import houseReducer from './reducers/house';

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

export default combineReducers({
  commutes: commuteReducer,
  destinations: destinationReducer,
  houses: houseReducer,
});
