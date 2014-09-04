'use strict';

var expect = require('chai').expect;
var WinstonGoogleAnalytics = require('../winston-google-analytics');

describe('#winston-google-analytics', function() {
    var transport, mockUa;
    before(function() {
        mockUa = function() {
            return {
                event: function(params, callback) {
                    mockUa.params = params;
                    process.nextTick(callback.bind(null, null, 1));
                }
            };
        };
        transport = new WinstonGoogleAnalytics({
            clientId: 'UA-XXXXX-X',
            ua: mockUa
        });
    });
    it('calls ua with proper parameters', function(done) {
        var params = {
            ec: "Test Category",
            ea: "Test Action",
            el: "Test Label",
            ev: 42,
            dp: "/Testpath"
        };

        transport.log('debug', 'ignored', params, function(err, count) {
            expect(err).to.be.falsy;
            expect(count).to.equal(1);
            expect(mockUa.params).to.deep.equal(params);
            done();
        });
    });

    it('logs message if google params are empty', function(done) {
        transport.log('alert', 'message', {}, function(err, count) {
            expect(err).to.be.falsy;
            expect(count).to.equal(1);
            expect(mockUa.params).to.deep.equal({
                ec: 'alert',
                ea: 'message'
            });
            done();
        });
    });
});
