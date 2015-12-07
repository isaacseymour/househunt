import { describe } from 'jspm-test/describe';

import { Map } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import Destination from '../components/destination';

const destination = Map({
  postcode: 'WC1X 9QZ',
});

describe('Destination component', (t) => {
  const result = ReactTestUtils.renderIntoDocument(
    <Destination destination={destination} uuid="123" />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'div');
  t.ok(ReactDOM.findDOMNode(element).textContent.indexOf('WC1X 9QZ') > -1);
});

describe('Deleting the destination', (t) => {
  const callback = (uuid) => {
    t.equal(uuid, 'abc123');
  };

  const result = ReactTestUtils.renderIntoDocument(
    <Destination
      destination={destination} uuid='abc123'
      deleteDestinationCallback={callback}
    />
  );

  const link = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'a');
  ReactTestUtils.Simulate.click(link);
});
