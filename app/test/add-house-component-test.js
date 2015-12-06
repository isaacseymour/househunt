import { describe } from '../test-lib/main';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import AddHouse from '../components/add-house';

describe('AddHouse component', (t) => {
  const callback = (url) => {
    t.equal(
      url,
      'www.rightmove.co.uk/property-to-rent/property-46665035.html'
    );
  };

  const result = ReactTestUtils.renderIntoDocument(
    <AddHouse addHouseCallback={callback}/>
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'input');
  const textNode = ReactDOM.findDOMNode(element);
  textNode.value = 'www.rightmove.co.uk/property-to-rent/property-46665035.html';
  ReactTestUtils.Simulate.change(textNode);

  const form = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'form');
  const formNode = ReactDOM.findDOMNode(form);
  ReactTestUtils.Simulate.submit(formNode);

  t.equal(textNode.value, '');
});
