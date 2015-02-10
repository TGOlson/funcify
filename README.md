# funcify

Convert Object-Oriented style functions to a pure functional style.

```js
o.fn(v)

var fn = funcify('fn');
// => fn(v, o) [curried]
```

## Examples

Use a method from the library

```js
var concat = funcify.concat;

toTheLimit = concat(' to the limit!');

toTheLimit('Push it');
// => Push it to the limit!
```

Globally expose the library

```js
funcify.expose(global);

add1ToAll = map(add1);

add1ToAll([1, 2, 3, 4]);
// => [ 2, 3, 4, 5 ]
```

Funcify a method

```js
var then = funcify('then');

function log(v) {
  console.log(v);
  return v;
}

var getAndAdd1 = compose(then(log), then(add1ToAll), getAsynch);

getAsynchAndAdd1([1, 2, 3, 4]);
// wait 500ms
// => [ 2, 3, 4, 5 ]
```

## TODO

* Add specs
* Clean up `expose` functions
* Documents
* Bring in other generic global JS functions (`split`, `splice`, etc.)
* Remove dependency on ramda (create a curry and compose function) (maybe?)
* Publish as node module (with revisions on GitHub)
