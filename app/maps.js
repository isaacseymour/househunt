"use strict";

module.exports = window.JSPM_TEST_MODE && window.JSPM_TEST_MODE === true ? require('./test/maps_mock') : require('google-maps');
