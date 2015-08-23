import test from 'tape';
import { dom } from './helpers';
import { Map } from 'immutable';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import Destination from '../app/components/destination';

test('Destination component', (t) => {
  dom();
  const destination = Map({
    postcode: 'WC1X 9QZ',
  });


  const result = ReactTestUtils.renderIntoDocument(
    <Destination destination={destination} uuid="123" />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'div');
  t.ok(element.getDOMNode().textContent.indexOf('WC1X 9QZ') > -1);
  t.end();
});


