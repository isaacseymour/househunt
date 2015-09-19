import test from 'tape';
import { dom } from './helpers';
import { Map } from 'immutable';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import House from '../components/house';

const house = Map({ url: 'www.rightmove.co.uk/property-to-rent/property-46665035.html' });

test('House component while fetching the house', (t) => {
  dom();

  const result = ReactTestUtils.renderIntoDocument(
    <House house={house} uuid="123" />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'div');
  t.ok(element.getDOMNode().textContent.indexOf('Fetching property details...') > -1);
  t.end();
});
