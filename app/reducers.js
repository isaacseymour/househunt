import { combineReducers } from 'redux';

import destinations from './reducers/destination';
import houses from './reducers/house';

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
//       commutes: {
//         ${destination-uuid}: {
//           WALKING,
//           CYCLING,
//           TRANSIT,
//           DRIVING,
//         },
//         ...
//       }
//     }
//   },
// }

export default combineReducers({ destinations, houses });
