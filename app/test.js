import _ from 'lodash';

let idCounter = 0;
const makeId = () => idCounter++;

let assertions = [];

const resetDom = () => document.body.innerHTML = '';

// has to be regular fn so it can be bound
const describe = function(name, fn) {
  assertions.push({ id: makeId(), name, fn });
};

const processAssertions = () => {
  let results = [];
  assertions.forEach((assertion) => {
    results.push(processAssertion(assertion));
  });

  return results;
}

const processAssertion = (assertion) => {
  const oldAssertions = _.clone(assertions);
  let passed = true;
  let error;

  try {
    assertion.fn();
  } catch(e) {
    passed = false;
    error = e;
  } finally {
    resetDom();
  }

  let newResult = {
    name: assertion.name,
    passed,
    error,
    nested: []
  };

  const newAssertionIds = _.difference(
    assertions.map((a) => a.id),
    oldAssertions.map((a) => a.id)
  );

  // pull out the assertions we want and need as nested
  const newAssertions = assertions.filter((a) => newAssertionIds.indexOf(a.id) > -1);
  newResult.nested = newAssertions.map(processAssertion);

  // reset assertions back to just the top level
  assertions = assertions.filter((a) => newAssertionIds.indexOf(a.id) === -1);

  return newResult;
};

export { assertions, describe, processAssertions };
