import test from 'tape';
import uuid from 'uuid';
import { Map } from 'immutable';

import {
  addDestination,
  deleteDestination,
  addHouse,
  updateHouseData,
  updateDestinationData,
} from '../actions';

import {
  addDestinationReducer,
  deleteDestinationReducer,
  addHouseReducer,
  updateHouseDataReducer,
  updateDestinationDataReducer,
} from '../reducers';

test('adding destination', (t) => {
  const initState = { destinations: Map() };
  const newState = addDestinationReducer(initState, addDestination('WC1X 9QZ'));
  t.equal(newState.destinations.size, 1);
  t.deepEqual(newState.destinations.first().toJS(), Map({
    postcode: 'WC1X 9QZ',
  }).toJS());
  t.end();
});

test('removing a destination', (t) => {
  const initState = {
    destinations: Map({ 'abc': Map() }),
  };
  const newState = deleteDestinationReducer(initState, deleteDestination('abc'));
  t.ok(newState.destinations.isEmpty());
  t.end();
});

test('adding house', (t) => {
  const rightmoveUrl = 'www.rightmove.co.uk/property-to-rent/property-46665035.html';
  const initState = { houses: Map() };
  const newState = addHouseReducer(initState, addHouse(rightmoveUrl));
  t.equal(newState.houses.size, 1);
  t.deepEqual(newState.houses.first().toJS(), Map({
    url: rightmoveUrl,
  }).toJS());
  t.end();
});

test('updating a house', (t) => {
  const rightmoveUrl = 'www.rightmove.co.uk/property-to-rent/property-46665035.html';
  const initState = {
    houses: Map({
      [uuid.v1()]: Map({ url: rightmoveUrl }),
    }),
  };
  const newState = updateHouseDataReducer(initState, updateHouseData(rightmoveUrl, '6 Sanders House'));
  t.deepEqual(newState.houses.first().toJS(), Map({
    url: rightmoveUrl,
    address: '6 Sanders House',
  }).toJS());
  t.end();
});

test('updating a destination', (t) => {
  t.plan(1);
  const initState = {
    destinations: Map({
      [uuid.v1()]: Map({ postcode: 'E1 5QY' }),
    }),
  };

  const newState = updateDestinationDataReducer(initState, updateDestinationData('E1 5QY', 1, 2));
  t.deepEqual(newState.destinations.first().toJS(), {
    postcode: 'E1 5QY',
    latitude: 1,
    longitude: 2,
  });
});
