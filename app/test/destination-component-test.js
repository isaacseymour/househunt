import test from 'tape';
import { dom } from './helpers';
import { Map } from 'immutable';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import Destination from '../components/destination';

const destination = Map({
  postcode: 'WC1X 9QZ',
});

test('Destination component', (t) => {
  dom();

  const result = ReactTestUtils.renderIntoDocument(
    <Destination destination={destination} uuid="123" />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'div');
  t.ok(element.getDOMNode().textContent.indexOf('WC1X 9QZ') > -1);
  t.end();
});

test('Deleting the destination', (t) => {
  dom();
  t.plan(1);

  const callback = (uuid) => {
    t.equal(uuid, 'abc123');
  }

  const result = ReactTestUtils.renderIntoDocument(
    <Destination 
      destination={destination} uuid='abc123'
      deleteDestinationCallback={callback}
    />
  );

  const link = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'a');
  ReactTestUtils.Simulate.click(link);
});
