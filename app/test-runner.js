import {
  assertions,
  processAssertions
} from './test-lib/main';

const testFiles = [
  'test/foo-test.js'
];

const promises = testFiles.map((f) => System.import(f));

const createResultUl = () => {
  const ul = document.createElement('ul');
  ul.classList.add('test-results');
  return ul;
}

const renderAssertions = (result) => {
  const wrap = document.createElement('ul');
  result.assertions.forEach((assertion) => {
    const assertionMessage = document.createElement('li');
    assertionMessage.classList.add('assertion-message');

    assertionMessage.textContent = `Assertion: ${assertion.message}`;
    wrap.appendChild(assertionMessage);

    if (assertion.error && assertion.error.stack) {
      const preStack = document.createElement('pre');
      preStack.classList.add('assertion-stack');
      const codeStack = document.createElement('code');
      codeStack.textContent = assertion.error.stack;
      preStack.appendChild(codeStack);
      wrap.appendChild(preStack);
    }
  });
  return wrap;
}

const renderResult = (result) => {
  const li = document.createElement('li');
  const div = document.createElement('div');
  div.classList.add(
    'test-result',
    `test-${result.passed() ? 'success' : 'fail'}`
  );

  const innerContent = (() => {
    const span = document.createElement('span');
    span.classList.add('describe-title');
    if (result.passed()) {
      span.textContent = `Describe: ${result.name} passed!`;
    } else {
      span.textContent = `Describe: ${result.name} failed!`;
    }

    span.appendChild(renderAssertions(result));

    return span;
  })();

  div.appendChild(innerContent);

  if (result.nested.length > 0) {
    console.log('doing nested', result.nested);
    div.appendChild(renderResults(result.nested));
  }

  li.appendChild(div);

  return li;
}

const renderResults = (results) => {
  const listFrag = document.createDocumentFragment();

  const ul = createResultUl();

  results.map((r) => renderResult(r)).forEach((elem) => {
    listFrag.appendChild(elem);
  });

  ul.appendChild(listFrag);
  return ul;
}

const logResult = (result, indentLevel) => {
  const prefix = Array.from({ length: indentLevel }, () => '\t').join('');
  console.log(prefix, result.name, result.passedString());
  if (result.error) console.warn(prefix, result.error);
  result.nested.forEach((result) => logResult(result, indentLevel + 1));
};

Promise.all(promises).then(() => {
  const results = processAssertions();
  document.body.appendChild(renderResults(results));
}).catch((e) => {
  console.log('Eror running tests', e);
});
