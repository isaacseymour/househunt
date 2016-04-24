import test from 'tape';
import { Map } from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';

import { ListDestinations } from '../components/list-destinations';
import Destination from '../components/destination';

test('ListDestinations component', (t) => {
  const destinations = Map({
    abc123: Map({
      postcode: 'WC1X 9QZ',
    }),
  });

  const result = shallow(
    <ListDestinations destinations={destinations} />
  );

  t.equal(result.find(Destination).length, 1);
  const element = result.find(Destination);
  t.deepEqual(element.props(), { destination: destinations.get("abc123"), uuid: 'abc123' });
  t.end();
});
