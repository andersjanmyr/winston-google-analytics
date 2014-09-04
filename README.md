# Winston-google-analytics

## Installation

```
$ npm install winston-newrelic
```

## Setup

```
var winston = require('winston');

// Add google analytics transport
var analyticsId ='UA-XXXXX-X';

// New style
var WinstonGoogleAnalytics = require('winston-google-analytics');
winston.add(new WinstonGoogleAnalytics({clientId: analyticsId}));

// Old style
require('winston-google-analytics');
winston.add(winston.transports.googleanalytics, {clientId: analyticsId});
```

## Usage

```
// Simple usage
winston.log('alert', 'message')
// >>>>
{ ec: 'alert', ea: 'message' }


// Metadata usage
var params = {
    ec: "Test Category",
    ea: "Test Action",
    el: "Test Label",
    ev: 42,
    dp: "/Testpath"
};

// This ignores both level (if ec) and message (if ea)
winston.log('debug', 'message', params) {

