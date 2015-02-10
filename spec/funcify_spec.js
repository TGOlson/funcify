var _ = require('ramda');

var funcify = require('../lib/funcify');

describe('funcify', function() {

  function toBeFuncified(type, o, v) {
    var isFunction   = typeof this.actual === 'function',
        isFunctional = this.actual(v, o) === o[type].call(o, v),
        isCurried    = this.actual(v)(o) === o[type].call(o, v);

    return isFunction && isFunctional && isCurried;
  }

  function toBeFuncifiedConcat() {
    var o = 'This is ',
        v = 'the end.';

    return toBeFuncified.call(this, 'concat', o, v);
  }

  function toBeFuncifiedThen() {
    var o = {
          then: _.always()
        },
        v = {};

    return toBeFuncified.call(this, 'then', o, v);
  }

  beforeEach(function() {
    this.addMatchers({
      toBeFuncified: toBeFuncified,
      toBeFuncifiedConcat: toBeFuncifiedConcat,
      toBeFuncifiedThen: toBeFuncifiedThen
    });
  });

  it('should return a curried function with the same functionality', function() {
    expect(funcify('concat')).toBeFuncifiedConcat();
  });

  it('should expose a library of converted functions', function() {
    expect(funcify.concat).toBeFuncifiedConcat();
  });

  it('should be able to expose the library globally', function() {
    funcify.expose(global);
    expect(concat).toBeFuncifiedConcat();
  });

  it('should expose arbitrary conversions globally', function() {
    funcify('then').expose(global);
    expect(then).toBeFuncifiedThen();
  });
});
