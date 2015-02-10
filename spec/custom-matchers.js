var _ = require('ramda');

module.exports = {
  toBeFuncified: function(type, o, v) {
    var isFunction   = typeof this.actual === 'function',
        isFunctional = this.actual(v, o) === o[type].call(o, v),
        isCurried    = this.actual(v)(o) === o[type].call(o, v);

    return isFunction && isFunctional && isCurried;
  },

  toBeFuncifiedConcat: function() {
    var o = 'This is ',
        v = 'the end.';

    return module.exports.toBeFuncified.call(this, 'concat', o, v);
  },

  toBeFuncifiedThen: function() {
    var o = {
          then: _.always()
        },
        v = {};

    return module.exports.toBeFuncified.call(this, 'then', o, v);
  }
};
