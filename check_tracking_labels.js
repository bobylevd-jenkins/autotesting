var config = require('./env/config');
var pages = require('./env/pages');

// ===========================================================
// GLOBALS

var collector = [];
var x = require('casper').selectXPath;

function checkenv() {
  this.evaluate(function () {
    if (BF_STATIC.bf_env == 'dev') {
      BF_STATIC.bf_env = 'live';
      bfa('setSettings', {'debug': false});
    }
  });
}

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

  casper.start(config.baseUrl + pages.index.url, function() {
    test.assertSelectorExists(x('//*[@id="header-signin"]'), 'Check that site is loaded.');
  });

  casper.then(checkenv);

// ===========================================================
// LOL Feed

  casper.thenClick(x(pages.lol.xpath), function (){
    test.assertTitle((pages.lol.title), 'assert title matches ' + pages.lol.title);
    for (var key in pages.lol.binder) {
      if (pages.lol.binder.hasOwnProperty(key)) {
        var obj = pages.lol.binder[key];
        test.assertEquals((collector[0].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// WIN Feed

  casper.thenClick(x(pages.win.xpath), function (){
    test.assertTitle((pages.win.title), 'assert title matches ' + pages.win.title);
    for (var key in pages.win.binder) {
      if (pages.win.binder.hasOwnProperty(key)) {
        var obj = pages.win.binder[key];
        test.assertEquals((collector[1].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// OMG Feed

  casper.thenClick(x(pages.omg.xpath), function (){
    test.assertTitle((pages.omg.title), 'assert title matches ' + pages.omg.title);
    for (var key in pages.omg.binder) {
      if (pages.omg.binder.hasOwnProperty(key)) {
        var obj = pages.omg.binder[key];
        test.assertEquals((collector[2].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// CUTE Feed

  casper.thenClick(x(pages.cute.xpath), function (){
    test.assertTitle((pages.cute.title), 'assert title matches ' + pages.cute.title);
    for (var key in pages.cute.binder) {
      if (pages.cute.binder.hasOwnProperty(key)) {
        var obj = pages.cute.binder[key];
        test.assertEquals((collector[3].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// FAIL Feed

  casper.thenClick(x(pages.fail.xpath), function (){
    test.assertTitle((pages.fail.title), 'assert title matches ' + pages.fail.title);
    for (var key in pages.fail.binder) {
      if (pages.fail.binder.hasOwnProperty(key)) {
        var obj = pages.fail.binder[key];
        test.assertEquals((collector[4].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// WTF Feed

  casper.thenClick(x(pages.wtf.xpath), function (){
    test.assertTitle((pages.wtf.title), 'assert title matches ' + pages.wtf.title);
    for (var key in pages.wtf.binder) {
      if (pages.wtf.binder.hasOwnProperty(key)) {
        var obj = pages.wtf.binder[key];
        test.assertEquals((collector[5].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// Trending Feed

  casper.thenClick(x(pages.trending.xpath), function (){
    test.assertTitle((pages.trending.title), 'assert title matches ' + pages.trending.title);
    for (var key in pages.trending.binder) {
      if (pages.trending.binder.hasOwnProperty(key)) {
        var obj = pages.trending.binder[key];
        test.assertEquals((collector[6].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.run(function(){
    test.done();
  });
});