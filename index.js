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

exports.debug = function(val) {
  console.log('=================================');
  console.log('context: ', this);
  if (!isUndefined(val)) {
    console.log('value: ', val);
  }
  console.log('=================================');
  return;
};

/**
 * Returns stringified JSON, wrapped in a markdown-formatted
 * codeblock, html pre tags, or nothing based on the `ext`
 * passed on the context.
 *
 */

exports._inspect = function(context, options) {
  context = JSON.stringify(context, null, 2);
  var ext = options
    && options.hash
    && options.hash.ext || 'html';
  return switchOutput(ext, context);
};

/**
 * Generate output for the `inspect` helper based on the
 * extension passed.
 *
 * @api private
 */

function switchOutput(ext, res) {
  if (ext[0] === '.') ext = ext.slice(1);
  switch (ext) {
    case 'md':
      return ''
        + '\n```json\n'
        + res
        + '\n```\n';
    case 'html':
      return ''
        + '<pre><code class="json">\n'
        + res
        + '</code></pre>';
    default:
      return res;
  }
}

function isUndefined(val) {
  return typeof val === 'undefined'
    || typeof val === 'function'
    || val.hash != null;
}
