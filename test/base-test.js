/* global expect:true, document */
/* global base:true, document */

if(typeof window === 'undefined') {
  assert = require('assert');
  base = process.env.LIB_COV ? require('../lib-cov/base.js') : require('../lib/base.js');
}
describe('base', function() {
  describe('#int2krw', function() {
    it('run', function() {
      assert.equal(base.int2krw(1), "1");
      assert.equal(base.int2krw(12), "12");
      assert.equal(base.int2krw(123), "123");
      assert.equal(base.int2krw(1234), "1,234");
      assert.equal(base.int2krw(12345), "12,345");
      assert.equal(base.int2krw(123456), "123,456");
      assert.equal(base.int2krw(1234567), "1,234,567");
    })
  })
})
