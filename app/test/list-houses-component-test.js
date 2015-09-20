import test from 'tape';
import { dom } from './helpers';
import { Map } from 'immutable';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import ListHouses from '../components/list-houses';

test('ListHouses component', (t) => {
  dom();

  const houses = Map({
    abc123: Map({ url: 'www.rightmove.co.uk/property-to-rent/property-46665035.html' }),
  });

  const result = ReactTestUtils.renderIntoDocument(
    <ListHouses houses={houses} />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'li');
  const textNode = element.getDOMNode();
  t.ok(textNode.textContent.indexOf('Fetching property details...') > -1);
  t.end();
});
