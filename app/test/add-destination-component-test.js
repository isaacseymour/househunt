import { describe } from '../test-lib/main';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import AddDestination from '../components/add-destination';

describe('AddDestination component', (t) => {
  const callback = (postcode) => {
    t.assertEqual(postcode, 'WC1X 9QZ');
  };

  const result = ReactTestUtils.renderIntoDocument(
    <AddDestination addDestinationCallback={callback}/>
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'input');
  const textNode = ReactDOM.findDOMNode(element);
  textNode.value = 'WC1X 9QZ';
  ReactTestUtils.Simulate.change(textNode);

  const form = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'form');
  ReactTestUtils.Simulate.submit(ReactDOM.findDOMNode(form));

  t.assertEqual(textNode.value, '');
});
