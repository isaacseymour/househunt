import test from 'tape';
import { Map } from 'immutable';

import {
  addDestination,
  deleteDestination,
} from '../app/actions';

import {
  addDestinationReducer,
  deleteDestinationReducer,
} from '../app/reducers';

test('adding destination', (t) => {
  const initState = { destinations: Map() };
  const newState = addDestinationReducer(initState, addDestination('WC1X 9QZ'));
  t.equal(newState.destinations.size, 1);
  t.end();
});

