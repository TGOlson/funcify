# funcify

Convert Object-Oriented style functions to a pure functional style.

```js
o.fn(v)

var fn = funcify('fn');
// => fn(v)(o)
```
## Specs

Run the specs

```
$ jasmine-node spec/
```

## Usage

```js
var funcify = require('funcify');

// funcify a function by name
var map = funcify('map');

// use a function from the library
var concat = funcify.concat
```

Funcify an arbitrary method

```js
var map = funcify('map');

var add1 = function(v) {
  return v + 1;
};

var add1ToEach = map(add1);

add1ToEach([1, 2, 3, 4]);
// => [ 2, 3, 4, 5 ]
```

Use a method from the library

```js
var concat = funcify.concat;

var toTheLimit = concat(' to the limit!');

toTheLimit('Push it');
// => Push it to the limit!
```

Globally expose the library

```js
funcify.expose(global);

var toTheLimit = concat(' to the limit!');

toTheLimit('Push it');
// => Push it to the limit!
```

Funcify a more complex method

```js
var then = funcify('then');

function getAsynch(v) {
  return Q.Promise(function(resolve, reject) {
    setTimeout(resolve.bind(null, v), 500);
  });
}

function log(v) {
  console.log(v);
}

var getAsynchAndLog = compose(then(log), getAsynch);

getAsynchAndLog([1, 2, 3, 4]);
// wait 500ms
// => [ 1, 2, 3, 4 ]
```

## TODO

* Add specs
* Clean up `expose` functions
* Documents
* Bring in other generic global JS functions (`split`, `splice`, etc.)
* Remove dependency on ramda (create a curry and compose function) (maybe?)
* Publish as node module (with revisions on GitHub)
