import { expect } from 'chai';
import { describe } from '../test';

const foo = (x, y) => x + y;

describe('testing foo', () => {
  describe('Adding 2 + 2', () => {
    expect(foo(2, 2)).to.eql(4);
  });

  describe('Adding 3 + 3', () => {
    expect(foo(2, 3)).to.eql(6);
  });

  describe('another nested case', () => {
    describe('well this is awks', () => {
      expect(foo(1, 1)).to.eql(3);
    });
  });
});

describe('another test', () => {
  expect(foo(1, 1)).to.eql(2);
});
