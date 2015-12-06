import { makeDescribe } from './describe';

let describes = [];

const describe = (name, fn) => {
  const desc = makeDescribe(name, fn);
  describes.push(desc);
  return desc;
}

const processAssertions = () => {
  let resultPromises = describes.map((d) => d.run());
  return Promise.all(resultPromises);
}

export {
  describe,
  processAssertions
}
