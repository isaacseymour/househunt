import { makeDescribe } from './describe';

let describes = [];

const describe = (name, fn) => {
  const desc = makeDescribe(name, fn);
  describes.push(desc);
  return desc;
}

const processAssertions = () => {
  let results = describes.map((d) => d.run());
  console.log('got results', results);
  return results;
}

export {
  describe,
  processAssertions
}
