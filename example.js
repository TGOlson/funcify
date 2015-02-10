var Q = require('q'),
    curry = require('lodash').curry,
    compose = require('lodash').compose;

var funcify = require('./lib/funcify');

/*
 * Test setup
 */
var list = [1, 2, 3, 4];

var add = curry(function(v1, v2) {
  return v1 + v2;
});

var add1 = add(1);


function getAsynch() {
 return Q.Promise(function(resolve, reject) {
  setTimeout(resolve.bind(null, list), 500);
 });
}

/*
 * Examples
 */

// using a method from the library
var concat = funcify.concat;

toTheLimit = concat(' to the limit!');

var result = toTheLimit('Push it');

console.log(result);
// => Push it to the limit!


// globally exposing the library
funcify.expose(global);

add1ToAll = map(add1);

var result = add1ToAll(list);

console.log(result);
// => [ 2, 3, 4, 5 ]


// funcifying a method
var then = funcify('then');

function log(v) {
  console.log(v);
  return v;
}

var getAndAdd1 = compose(then(log), then(add1ToAll), getAsynch);

getAndAdd1();
// wait 500ms
// => [ 2, 3, 4, 5 ]
