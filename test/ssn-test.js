if(typeof window === 'undefined') {
  assert = require('assert');
  base = process.env.LIB_COV ? require('../lib-cov/base.js') : require('../lib/base.js');
  ssn = process.env.LIB_COV ? require('../lib-cov/ssn.js') : require('../lib/ssn.js');
}

describe('SSNValidator', function() {
  describe('#validate', function() {
    it('success', function() {
      // 수동으로 생성한 샘플
      var dataList = ['901212-1023457'];
      var validator = new ssn.SSNValidator();
      for(var i = 0 ; i < dataList.length ; ++i) {
        assert.equal(true, validator.validate(dataList[i]));
      }
    })
    it('fail', function() {
      var dataList = [
        '111111-111111',  // 6-6 형태로 입력되서 맞지 않는 경우
        '1111111111111',  // - 없이 입력한 경우
        '901212-1023456',
      ];
      var validator = new ssn.SSNValidator();
      for(var i = 0 ; i < dataList.length ; ++i) {
        assert.equal(false, validator.validate(dataList[i]));
      }
    })
  })
})

describe('SSNFilter', function() {
  describe('#apply', function() {
    it('run', function() {
      var filter = new ssn.SSNFilter();
      assert.equal('123*', filter.apply('1234'));
      assert.equal('12**', filter.apply('1234', 2));
      assert.equal('****', filter.apply('1234', 4));
      assert.equal('****', filter.apply('1234', 10));
      assert.equal('1234', filter.apply('1234', -1));
    })
  })
})

describe('SSNGenerator', function() {
  describe('#generate', function() {
    it('run', function() {
      var generator = new ssn.SSNGenerator();
      var validator = new ssn.SSNValidator();

      for(var i = 0 ; i < 20 ; ++i) {
        var val = generator.generate();
        //console.log(val);
        assert.equal(true, validator.validate(val));
      }
    })
  })
})

describe('ssn', function() {
  describe('#str2numList', function() {
    it('run', function() {
      var input = '12-a93s';
      var output = [1, 2, 9, 3];
      assert.deepEqual(output, ssn.str2numList(input));
    })
  })
})