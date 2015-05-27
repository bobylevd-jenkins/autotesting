var config = require('./env/config');
var pages = require('./env/pages');

// ===========================================================
// GLOBALS

var collector = [];
var x = require('casper').selectXPath;

// ===========================================================
// Casper hack for binding

casper.on( 'page.initialized', function(){
  this.evaluate(function(){
    var isFunction = function(o) {
      return typeof o == 'function';
    };

    var bind,
      slice = [].slice,
      proto = Function.prototype,
      featureMap;

    featureMap = {
      'function-bind': 'bind'
    };

    function has(feature) {
      var prop = featureMap[feature];
      return isFunction(proto[prop]);
    }

    // check for missing features
    if (!has('function-bind')) {
      // adapted from Mozilla Developer Network example at
      // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
      bind = function bind(obj) {
        var args = slice.call(arguments, 1),
          self = this,
          nop = function() {
          },
          bound = function() {
            return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
          };
        nop.prototype = this.prototype || {}; // Firefox cries sometimes if prototype is undefined
        bound.prototype = new nop();
        return bound;
      };
      proto.bind = bind;
    }
  });
});

// ===========================================================
// CASPER OPTIONS

casper.options.onResourceRequested = function(casper, req){
  if(req.url.indexOf("buzzfeed.d1.sc.omtrdc.net") > -1){
    collector.push(req.url);
  }
};
casper.options.viewportSize = { width: 800, height: 960 };
casper.options.pageSettings = { userAgent: config.apple_userAgent };

// ===========================================================
// CASPER TEST

casper.test.begin('Adobe Page and Click events verification on Mobile Web.', function suite(test) {
  phantom.clearCookies();

  casper.start(config.baseUrl + pages.urlIndex, function(){
      test.assertExist(x('//*[@id="menu-toggle"]'), 'Check that site is loaded.');
    casper.evaluate(function () {
      if (BF_STATIC.bf_env == 'dev') {
        BF_STATIC.bf_env = 'live';
        bfa('setSettings', {'debug':false});
        bfa('track','page');
      }
    });
  });

// ===========================================================
// Check page event test.

  casper.waitFor(function(){
      return collector.length == 2;
    },
    function then(){
      test.assertEquals(collector.length, 2, 'Check that page event was fired.');
    },
    function timeout(){
      test.assertEquals(collector.length, 2, 'Validation for page event has timed out.');
    }, 10000);

  casper.then(function(){
    this.click(x('//*[@id="menu-toggle"]'), 'Toggle Menu.');
  });

// ===========================================================
// Check click event test.

  casper.waitFor(function(){
      return (collector.length == 3, 'Check that click event was fired.');
    },
    function then(){
      test.assertEquals(collector.length, 3, 'Check that click event was fired.');
    },
    function timeout(){
      casper.echo("Validation for click event has timed out.");
      test.assertEquals(collector.length, 3, 'Check that click event was fired.');
    }, 10000);

// ===========================================================
// Check adobe cookies test.

  casper.then(function () {
    var savedcookies = JSON.stringify(phantom.cookies);
    test.assertEquals((savedcookies.indexOf('s_fid') > -1), true, 'Check for s_fid cookie to exist.');
    test.assertEquals((savedcookies.indexOf('s_cc') > -1), true, 'Check for s_cc cookie to exist.');
    test.assertEquals((savedcookies.indexOf('s_sq') > -1), true, 'Check for s_sq cookie to exist.');
    test.assertEquals((savedcookies.indexOf('s_vi') > -1), true, 'Check for s_vi cookie to exist.');
  });

  casper.run(function(){
    test.done();
  });
});