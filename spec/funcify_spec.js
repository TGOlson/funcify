var funcify = require('../lib/funcify');

describe('funcify', function() {
  beforeEach(function() {
    this.addMatchers(require('./custom-matchers'));
  });

  it('should convert an arbitrary function', function() {
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
