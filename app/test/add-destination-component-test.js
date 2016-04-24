import test from 'tape';
import { dom } from './helpers';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import { AddDestination } from '../components/add-destination';

test('AddDestination component', (t) => {
  dom();
  t.plan(2);
  const callback = (postcode) => {
    t.equal(postcode, 'WC1X 9QZ');
  };

  const result = ReactTestUtils.renderIntoDocument(
    <AddDestination addDestination={callback}/>
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'input');
  const textNode = ReactDOM.findDOMNode(element);
  textNode.value = 'WC1X 9QZ';
  ReactTestUtils.Simulate.change(textNode);

  const form = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'form');
  ReactTestUtils.Simulate.submit(ReactDOM.findDOMNode(form));

  t.equal(textNode.value, '');
});
