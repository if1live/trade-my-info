(function(global, module) {
  var exports = module.exports

  function int2krw(value) {
    //http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
    var text = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    text = text.substr(0, text.length - 3);
    return text;
  }

  function zeroFill( number, width ) {
    // http://stackoverflow.com/questions/1267283/how-can-i-create-a-zerofilled-value-using-javascript
    width -= number.toString().length;
    if ( width > 0 ) {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
  }

  exports.int2krw = int2krw;
  exports.zeroFill = zeroFill;

  if('undefined' !== typeof window) {
    window.base = module.exports;
  }
})(this, 'undefined' !== typeof module ? module : {exports: {}});
