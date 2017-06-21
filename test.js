'use strict';

require('mocha');
var assert = require('assert');
var handlebars = require('handlebars');
var isObject = require('isobject');
var helpers = require('./');
var error = console.error;
var log = console.log;

function render(str, ctx) {
  var hbs = handlebars.create();
  hbs.registerHelper(helpers);
  return hbs.compile(str)(ctx);
}

describe('logging helpers', function() {
  beforeEach(function() {
    error.history = [];
    log.history = [];

    console.log = function() {
      var args = helpers.createArgs([].slice.call(arguments));
      log.apply(console, args);
      log.history.push.apply(log.history, args);
    };

    console.error = function() {
      var args = helpers.createArgs([].slice.call(arguments));
      error.history.push.apply(error.history, args);
      error.apply(console, args);
    };
  });

  afterEach(function() {
    console.error = error;
    console.log = log;
  });

  describe('{{log}}', function() {
    it('should log a message to stdout', function() {
      render('{{log "Log helper worked!"}}');
      assert(/Log helper worked!/.test(log.history.join('')));
    });
  });

  describe('{{warn}}', function() {
    it('should log a warning message to stdout', function() {
      render('{{warn "warn helper worked!"}}');
      assert(/warn helper worked!/.test(error.history.join('')));
    });
  });

  describe('{{success}}', function() {
    it('should log a success message to stdout', function() {
      render('{{success "success helper worked!"}}');
      assert(/success helper worked!/.test(log.history.join('')));
    });
  });

  describe('{{ok}}', function() {
    it('should log an "ok" message to stdout', function() {
      render('{{ok "ok helper worked!"}}');
      assert(/ok helper worked!/.test(log.history.join('')));
    });
  });

  describe('{{info}}', function() {
    it('should log an info message to stdout', function() {
      render('{{info "info helper worked!"}}');
      assert(/info helper worked!/.test(log.history.join('')));
    });
  });

  describe('{{error}}', function() {
    it('should log an error message to stdout', function() {
      render('{{error "error helper worked!"}}');
      assert(/error helper worked!/.test(error.history.join('')));
    });
  });

  describe('{{_debug}}', function() {
    it('should log current context to stderr', function() {
      render('{{_debug this}}', 'foo');
      assert(/foo/.test(error.history.join('')));
    });
  });
});

