(function(global, module) {
  /*
  주민등록번호 의미와 가짜 진짜 확인하는 법
  http://blog.naver.com/skddl0514/60205244058
  */
  var exports = module.exports

  function RandomGenerator() {
    var self = this;

    function randint(min, max) {
      var min = min || 0;
      var max = max || 100;
      var val = parseInt((Math.random() * (max+1)) + min, 10);
      if(val > max) {
        val = min;
      }
      return val;
    }

    self.randint = randint;
  }

  function BirthdayGenerator() {
    var self = this;

    function generate() {
      // 생성 가능한 연도는 현실적인 범위로 잡자
      // 1960~1999
      var randomGen = new RandomGenerator();
      var year = randomGen.randint(60, 99);
      var month = randomGen.randint(1, 12);
      // index==month를 그대로 쓰기 위해서 첫번째 가짜 넣음
      var dayTable = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      assert.equal(12 + 1, dayTable.length);
      var day = randomGen.randint(1, dayTable[month]);

      year = base.zeroFill(year, 2);
      month = base.zeroFill(month, 2);
      day = base.zeroFill(day, 2);

      return [year, month, day].join("");
    }

    self.generate = generate;
  }

  function GenderGenerator() {
    var self = this;

    function generate(birth) {
      var randomGen = new RandomGenerator();
      var val = randomGen.randint(1, 2);
      assert.equal(true, val === 1 || val === 2);
      return val;
    }

    self.generate = generate;
  }

  function AreaGenerator() {
    var self = this;

    function generate() {
      /*
      서울 00~08
      부산 09~12
      인천 13~15
      경기 주요 도시  16~18
      주요 도시외 경기 19~25
      강원도 26~34
      충청북도  35~39
      충청남도  40~47
      전라북도  48~54
      전라남도  55~68
      경상도 67~90
      */

      var minVal = 0;
      var maxVal = 90;

      var randomGen = new RandomGenerator();
      var first = randomGen.randint(minVal, maxVal);
      var second = randomGen.randint(1, 99);

      first = base.zeroFill(first, 2);
      second = base.zeroFill(second, 2);
      return first + second;
    }

    self.generate = generate;
  }

  function OrderGenerator() {
    var self = this;

    function generate() {
      var randomGen = new RandomGenerator();
      return randomGen.randint(1, 3);
    }

    self.generate = generate;
  }

  function SSNGenerator(birthGen, genderGen, areaGen, orderGen) {
    /*
    http://www.ilovepc.co.kr/bbs/board.php?bo_table=software&wr_id=331
    */
    var self = this;
    var birthGen = birthGen || new BirthdayGenerator();
    var genderGen = genderGen || new GenderGenerator();
    var areaGen = areaGen || new AreaGenerator();
    var orderGen = orderGen || new OrderGenerator();

    function generate() {
      var birth = birthGen.generate();
      assert.equal(typeof birth, 'string');
      assert.equal(birth.length, 6);

      var gender = genderGen.generate(birth);
      gender = gender.toString();
      assert.equal(gender.length, 1);

      var area = areaGen.generate();
      assert.equal(typeof area, 'string');
      assert.equal(area.length, 4);

      var order = orderGen.generate();
      order = order.toString();
      assert.equal(order.length, 1);

      var num = birth + '-' + gender + area + order;
      var validator = new SSNValidator();
      var numList = str2numList(num);
      var parityGen = new ParityGenerator();
      var lastNum = parityGen.generate(numList);
      return num + lastNum;
    }

    self.generate = generate;
  }

  function ParityGenerator() {
    var self = this;

    function generate(numList) {
      var multiplierList = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
      assert.equal(multiplierList.length, numList.length);

      for(var i = 0 ; i < multiplierList.length ; ++i) {
        var multiplier = multiplierList[i];
        numList[i] *= multiplier;
      }
      var baseSum = 0;
      for(var i = 0 ; i < numList.length ; ++i) {
        baseSum += numList[i];
      }
      var lastNum = 11 - (baseSum % 11);
      if(lastNum >= 10) {
        lastNum -= 10;
      }
      assert.equal(true, lastNum >= 0 && lastNum <= 9);
      return lastNum;
    }

    self.generate = generate;
  }

  function SSNValidator() {
    var self = this;

    function validate(val) {
      if(!validateFormat(val)) {
        return false;
      }
      if(!validateNumber(val)) {
        return false;
      }
      return true;
    }

    function validateFormat(val) {
      var patt = new RegExp('[0-9]{6}-[0-9]{7}');
      if(!patt.test(val)) {
        return false;
      }
      return true;
    }

    function validateNumber(val) {
      var numList = str2numList(val);
      var lastNum = numList.pop();

      var parityGen = new ParityGenerator();
      var expectedLastNum = parityGen.generate(numList);
      return (expectedLastNum === lastNum);
    }

    self.validate = validate;
    self.str2numList = str2numList;
  }

  function SSNFilter() {
    // 생성한 주민등록번호의 뒤를 숨기기
    var self = this;
    self.apply = function(val, count) {
      var count = count || 1;
      var tokenList = [val.substr(0, val.length-count)];
      for(var i = 0 ; i < count ; ++i) {
        tokenList.push('*');
      }
      var expected = tokenList.join("");
      return expected.substr(0, val.length);
    }
  }

  function str2numList(val) {
    var numList = [];
    for(var i = 0 ; i < val.length ; ++i) {
      var elem = parseInt(val[i]);
      if(isNaN(elem)) {
        continue;
      }
      numList.push(parseInt(val[i], 10));
    }
    return numList;
  }

  exports.SSNGenerator = SSNGenerator;
  exports.SSNValidator = SSNValidator;
  exports.SSNFilter = SSNFilter;
  exports.str2numList = str2numList;


  if('undefined' !== typeof window) {
    window.ssn = module.exports;
  }
})(this, 'undefined' !== typeof module ? module : {exports: {}});
