var _ = require('ramda'),
    curry = _.curry,
    compose = _.compose;


var fnames = [
  'map',
  'forEach',
  'concat'
  // TODO: add more

].forEach(addToLibrary);


function addToLibrary(fname) {
  funcify[fname] = funcify(fname);
}


/*
 * funcify
 */

// ask dr-boolean about lamda-js
function funcify(fname) {
  return wrap(fname);
}

function wrap(fname) {
  var fn = curry(function(v, o) {
    return o[fname].call(o, v);
  });

  fn.fname = fname;
  fn.expose = _.lPartial(expose, fn);

  return fn;
}

funcify.expose = _.lPartial(exposeAll, _.omit('expose', funcify));

function exposeAll(fns, env) {
  function exposeEnv(fn) {
    expose(fn, env);
  }

  compose(funcify.map(exposeEnv), _.values)(fns);
}

function expose(fn, env) {
  env[fn.fname] = fn;
}

module.exports = funcify;
