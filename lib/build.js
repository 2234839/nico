var post = require('./sdk/post');
var log = require('./sdk/log');
var file = require('./sdk/file');
var option = require('./sdk/option');


module.exports = function(options) {
  options = options || {};

  Object.keys(options).forEach(key, function(key) {
    option.set(key, options[key]);
  });

  // call start of writers
  var writers = option.get('writers') || [];
  writers.map(function(item) {
    var fn = new file.require(item)();
    fn.start && fn.start();
    return fn;
  });

  // load posts
  post.load();

  // run the end of the writers
  writers.forEach(function(fn) {
    fn.stop && fn.stop();
  });
};