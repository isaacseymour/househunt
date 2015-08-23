import test from 'tape';
import { dom } from './helpers';
import { Map } from 'immutable';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import AddDestination from '../components/add-destination';

test('AddDestination component', (t) => {
  dom();
  t.plan(1);
  const callback = (postcode) => {
    t.equal(postcode, 'WC1X 9QZ');
  };

  const result = ReactTestUtils.renderIntoDocument(
    <AddDestination addDestinationCallback={callback}/>
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'input');
  const textNode = element.getDOMNode();
  textNode.value = 'WC1X 9QZ';
  ReactTestUtils.Simulate.change(textNode);

  const form = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'form');
  ReactTestUtils.Simulate.submit(form.getDOMNode());
});
