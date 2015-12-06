import {
  assertions,
  processAssertions
} from './test-lib/main';

const testFiles = [
  'test/foo-test.js',
  // 'test/add-destination-component-test.js',
  // 'test/add-house-component-test.js',
  // 'test/destination-component-test.js',
  // 'test/directions-test.js'
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
    // if (assertion.error && assertion.error.stack) {
    //   const preStack = document.createElement('pre');
    //   preStack.classList.add('assertion-stack');
    //   const codeStack = document.createElement('code');
    //   codeStack.textContent = assertion.error.stack;
    //   preStack.appendChild(codeStack);
    //   wrap.appendChild(preStack);
    // }
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

    if (result.asyncError) {
      span.textContent += ' (Async test timed out)';
    }

    span.appendChild(renderAssertions(result));

    return span;
  })();

  div.appendChild(innerContent);

  if (result.nested.length > 0) {
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
  if (result.asyncError) {
    console.warn(prefix, result.asyncError.message, result.asyncError.stack);
  }
  result.assertions.forEach((a) => {
    if (a.passed) return;
    console.warn(prefix + '\t', a.error.stack);
  });
  result.nested.forEach((result) => logResult(result, indentLevel + 1));
};

Promise.all(promises).then(() => {
  return processAssertions();
}).then((results) => {
  console.log('results', results);
  const message = document.createElement('p');
  message.textContent = 'All errors are logged to the console for clickable stack traces!';
  message.classList.add('top-message');
  document.body.appendChild(message);
  document.body.appendChild(renderResults(results));
  results.forEach((r) => logResult(r, 0));
}).catch((e) => {
  console.error('Eror running tests', e);
});
