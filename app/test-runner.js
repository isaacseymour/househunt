import {
  runTestsOnFiles
} from './test-lib/runner';

const testFiles = [
  'test/add-destination-component-test.js',
  'test/add-house-component-test.js',
  'test/destination-component-test.js',
  'test/directions-test.js',
  'test/geocode-test.js',
  'test/house-component-test.js',
  'test/list-destinations-component-test.js',
  'test/list-houses-component-test.js',
  'test/reducers-test.js'
];

runTestsOnFiles(testFiles);

