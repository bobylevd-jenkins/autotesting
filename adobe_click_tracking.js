var config = require('./env/config');
var pages = require('./env/pages');

// ===========================================================
// GLOBALS

var collector = [];
var x = require('casper').selectXPath;

// ===========================================================
// CASPER OPTIONS

casper.options.onResourceRequested = function(casper, req){
  if(req.url.indexOf("buzzfeed.d1.sc.omtrdc.net") > -1){
    collector.push(req.url);
  }
};

casper.options.pageSettings.userAgent = config.userAgent;

// ===========================================================
// CASPER TEST

casper.test.begin('Adobe Page and Click events verification', function suite(test) {
  phantom.clearCookies();

  casper.start(config.baseUrl + pages.index.url, function(){
    test.assertExists(x('//*[@id="header-signin"]'), 'Check that site is loaded.');
    casper.evaluate(function () {
      if (BF_STATIC.bf_env == 'dev') {
        BF_STATIC.bf_env = 'live';
        bfa('setSettings', { 'debug':false });
        bfa('track','page');
      }
    });
  });

// ===========================================================
// Check page event test.
//
//  casper.waitFor(function(){
//      return collector.length == 2;
//    },
//    function then(){
//      test.assertEquals(collector.length, 2, 'Check that page event was fired.');
//    },
//    function timeout(){
//      test.assertEquals(collector.length, 2, 'Validation for page event has timed out.');
//    }, 10000);
//
//// ===========================================================
//// Check click event test.
//
//  casper.then(function(){
//    this.click(x('//*[@id="header-signin"]'), 'Click on Sign-In button.');
//  });
//
//  casper.waitFor(function(){
//      return (collector.length == 3, 'Check that click event was fired.');
//    },
//    function then(){
//      test.assertEquals(collector.length, 3, 'Check that click event was fired.');
//    },
//    function timeout(){
//      casper.echo("Validation for click event has timed out.");
//      test.assertEquals(collector.length, 3, 'Check that click event was fired.');
//    }, 10000);
//
//// ===========================================================
//// Check adobe cookies test.
//
//  casper.then(function () {
//    var savedcookies = JSON.stringify(phantom.cookies);
//    test.assertEquals((savedcookies.indexOf('s_fid') > -1), true, 'Check for s_fid cookie to exist.');
//    test.assertEquals((savedcookies.indexOf('s_cc') > -1), true, 'Check for s_cc cookie to exist.');
//    test.assertEquals((savedcookies.indexOf('s_sq') > -1), true, 'Check for s_sq cookie to exist.');
//    test.assertEquals((savedcookies.indexOf('s_vi') > -1), true, 'Check for s_vi cookie to exist.');
//  });

  casper.run(function(){
    test.done();
  });
});