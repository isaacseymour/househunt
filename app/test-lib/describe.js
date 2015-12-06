import { assertEqual, ok } from './assertions';
import { Assertion } from './assertion';
import isEqual from 'lodash.isequal';
import { expect } from 'chai';

let counter = 0;

const makeId = () => counter++;

const resetDom = () => document.body.innerHTML = '';

class Describe {
  constructor(name, fn) {
    this.id = makeId();
    this.name = name;
    this.fn = fn;
    this.nested = [];
    this.assertions = [];
    this.expectedCount = 0;
    this.ASYNC_TIMEOUT = 2000;
  }

  describe(name, fn) {
    const nested = makeDescribe(name, fn);
    this.nested.push(nested);
    return nested;
  }

  plan(num) {
    this.expectedCount = num;
  }

  passed() {
    if (this.asyncError) return false;

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

  runIteration() {
    this.fn.call(null, this);
    this.assertions.forEach((assertion) => {
      assertion.run();
    });
    // need to run anything nested too
    const nestedPromises = this.nested.map((d) => d.run());
    return Promise.all(nestedPromises);
  }

  run() {
    let maxTries = this.ASYNC_TIMEOUT / 10;
    let currentTries = 0;

    resetDom();

    return this.runIteration().then(() => {
      if (this.expectedCount === 0) {
        // tests not async, so no need to worry about anything
        return this;
      }

      if (this.expectedCount === this.assertions.length) {
        // tests async but we have as many as we expected
        return this;
      }

      // we're awaiting some extra assertions
      const waitForAsync = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            currentTries++;
             if (currentTries >= maxTries) {
              throw new Error(
                `Async Timeout. Expected ${this.expectedCount} assertions but got ${this.assertions.length}. Update your t.plan call.`
              );
             } else {
               if (this.expectedCount === this.assertions.length) {
                 // new ones got added, make sure we run them
                 this.assertions.forEach((a) => a.run());
                 resolve(this);
                 return;
               } else {
                 // let's check again in 10 milliseconds
                 return resolve(waitForAsync());
               }
             }
          }, 10);
        });
      }

      return waitForAsync();
    });
  }

  hasMatchingAssertion(name, args) {
    return this.assertions.some((a) => {
      return a.name === name && isEqual(a.args, args);
    });
  }
}

const wrapAssertion = (name, assertionFn) => {
  Describe.prototype[name] = function(...args) {

    const assertion = new Assertion({ name, args, fn: assertionFn });

    this.assertions.push(assertion);
  }
}

wrapAssertion('assertEqual', (x, y) => {
  expect(x).to.equal(y);
});

wrapAssertion('ok', (x) => {
  expect(x).to.be.ok;
});

wrapAssertion('deepEqual', (x, y) => {
  expect(x).to.deep.equal(y);
});

const makeDescribe = (name, fn) => {
  return new Describe(name, fn);
}

export { makeDescribe, wrapAssertion };

