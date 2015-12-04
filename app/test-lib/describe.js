import { assertEqual, ok } from './assertions';
import { expect } from 'chai';

let counter = 0;

const makeId = () => counter++;

class Describe {
  constructor(name, fn) {
    this.id = makeId();
    this.name = name;
    this.fn = fn;
    this.nested = [];
    this.assertions = [];
    this.hasRun = false;
  }

  describe(name, fn) {
    const nested = makeDescribe(name, fn);
    this.nested.push(nested);
    return nested;
  }

  passed() {
    if (!this.hasRun) throw new Error('Describe hasn\'t run yet');
    if (this.assertions.length === 0) {
      // if this describe has no direct assertions
      // we say it passed if all its nested ones passed
      return this.nestedAllPass();
    } else {
      // however, if this has assertions
      // we say it's passed if they passed
      return this.assertionsAllPass();
    }
  }

  nestedAllPass() {
    return this.nested.every((d) => d.passed());
  }

  assertionsAllPass() {
    return this.assertions.every((a) => a.passed);
  }

  passedString() {
    if (this.assertions.length > 0) {
      let str = this.assertionsAllPass() ? 'Success!' : 'Fail!';
      if (!this.nestedAllPass()) {
        str += ' (A nested test failed)';
      }
      return str;
    } else {
      return this.nestedAllPass() ? 'Success!' : 'Fail!';
    }
  }

  run() {
    if (this.hasRun) return this;

    this.fn.call(null, this);
    // need to run anything nested too
    this.nested.forEach((d) => d.run());

    this.hasRun = true;

    return this;
  }
}

const wrapAssertion = (name, assertionFn) => {
  Describe.prototype[name] = function(...args) {
    let passed = true;
    let error;

    try {
      assertionFn.apply(null, args);
    } catch (e) {
      passed = false;
      error = e;
    }

    this.assertions.push({ passed, error });
  }
}

wrapAssertion('assertEqual', (x, y) => {
  expect(x).to.equal(y);
});

wrapAssertion('ok', (x) => {
  expect(x).to.be.ok;
});

const makeDescribe = (name, fn) => {
  return new Describe(name, fn);
}

export { makeDescribe, wrapAssertion };

