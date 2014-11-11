'use strict';

var chalk = require('chalk');

/**
 * ```js
 * // Handlebars
 * {{log "this is a message!"}}
 *
 * // Lo-Dash
 * <%= log("this is a message!") %>
 * <%= log("%j", foo) %>
 * ```
 */

exports.log = function () {
  console.log.apply(console, arguments);
};

exports.info = function () {
  arguments[0] = chalk.cyan(arguments[0]);
  console.log.apply(console, arguments);
};

exports.bold = function () {
  arguments[0] = chalk.bold(arguments[0]);
  console.log.apply(console, arguments);
};

exports.warn = function () {
  arguments[0] = chalk.yellow(arguments[0]);
  console.warn.apply(console, arguments);
};

exports.error = function () {
  arguments[0] = chalk.red(arguments[0]);
  console.error.apply(console, arguments);
};