(function(global, module) {
  var exports = module.exports

  function int2krw(value) {
    //http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
    var text = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    text = text.substr(0, text.length - 3);
    return text;
  }

  exports.int2krw = int2krw;

  if('undefined' !== typeof window) {
    window.base = module.exports;
  }
})(this, 'undefined' !== typeof module ? module : {
  exports: {}
});
