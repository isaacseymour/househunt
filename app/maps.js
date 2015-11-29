"use strict";

module.exports = typeof window === 'undefined' ? require('./test/maps_mock') : require('google-maps');
