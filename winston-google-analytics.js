'use strict';

var winston = require('winston'),
    util = require('util'),
    debug = require('debug')('winston:googleanalytics');

function WinstonGoogleAnalytics(options) {
    this.name = 'winston-google-analytics';
    this.level = options.level || 'info';
    this.clientId = options.clientId;
    var ua = options.ua || require('universal-analytics');
    this.ua = ua(this.clientId, null);
}


util.inherits(WinstonGoogleAnalytics, winston.Transport);

/**
 * Transporter getter for backward compatibility
 */
winston.transports.googleanalytics = WinstonGoogleAnalytics;

/**
 * Dispatched on each log, stores only errors to new-relic
 * @param {string} level
 * @param {string} msg
 * @param {object} meta
 * @param {function} callback
 */
WinstonGoogleAnalytics.prototype.log = function(level, msg, meta, callback) {
    var params = {};
    params.ec = meta.ec || level;
    params.ea = meta.ea || msg;
    if (meta.el) params.el = meta.el;
    if (meta.ev) params.ev = meta.ev;
    if (meta.dp) params.dp = meta.dp;

    debug(params);
    this.ua.event(params, function(err, count) {
        callback(err, count);
    });
};


module.exports = WinstonGoogleAnalytics;
