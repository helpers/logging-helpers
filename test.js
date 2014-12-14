'use strict';

var should = require('should');
var Handlebars = require('handlebars');
Handlebars.registerHelper(require('./'));

var log = console ? console.log : function() {};
log.history = [];

console.log = function() {
  log.history.push.apply(log.history, arguments);
  log.apply(console, arguments);
};

describe('{{log}}', function() {
  it('should log a message to the console.', function() {
    var template = Handlebars.compile('{{log "Log helper worked!"}}');
    template();
    log.history.should.containEql('Log helper worked!');
  });
});

log.history = [];
describe('{{debug}}', function() {
  it('should log current context.', function() {
    var template = Handlebars.compile('{{debug this}}');
    template('assemble');
    log.history.should.containEql('assemble');
  });
});