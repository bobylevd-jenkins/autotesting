var config = require('./env/config');
var pages = require('./env/pages');

// ===========================================================
// GLOBALS

var collector = [];
var x = require('casper').selectXPath;

var paramsLol = {
  v51 : 'v51=home%3Aheader',
  v52 : 'v52=badge%2Flol',
  v53 : 'v53=%28no%20label%29'
};
var paramsWin = {
  v51 : 'v51=home%3Aheader',
  v52 : 'v52=badge%2Fwin',
  v53 : 'v53=%28no%20label%29'
};
var paramsOmg = {
  v51 : 'v51=home%3Aheader',
  v52 : 'v52=badge%2Fomg',
  v53 : 'v53=%28no%20label%29'
};
var paramsCute = {
  v51 : 'v51=home%3Aheader',
  v52 : 'v52=badge%2Fcute',
  v53 : 'v53=%28no%20label%29'
};
var paramsFail = {
  v51 : 'v51=home%3Aheader',
  v52 : 'v52=badge%2Ffail',
  v53 : 'v53=%28no%20label%29'
};
var paramsWtf = {
  v51 : 'v51=home%3Aheader',
  v52 : 'v52=badge%2Fwtf',
  v53 : 'v53=%28no%20label%29'
};
var paramsTrending = {
  v51 : 'v51=home%3Aheader',
  v52 : 'v52=badge%2Ftrending',
  v53 : 'v53=%28no%20label%29'
};

function checkenv() {
  this.evaluate(function () {
    if (BF_STATIC.bf_env == 'dev') {
      BF_STATIC.bf_env = 'live';
      bfa('setSettings', {'debug': false});
    }
  });
};

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

  casper.start(config.baseUrl + pages.urlIndex, function() {
    test.assertSelectorExists(x('//*[@id="header-signin"]'), 'Check that site is loaded.');
  });

  casper.then(checkenv);

// ===========================================================
// LOL Feed

  casper.thenClick(x(pages.xpathLol), function (){
    test.assertTitle((pages.titleLol), 'assert title matches ' + pages.titleLol);
    for (var key in paramsLol) {
      if (paramsLol.hasOwnProperty(key)) {
        var obj = paramsLol[key];
        test.assertEquals((collector[0].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// WIN Feed

  casper.thenClick(x(pages.xpathWin), function (){
    test.assertTitle((pages.titleWin), 'assert title matches ' + pages.titleWin);
    for (var key in paramsWin) {
      if (paramsWin.hasOwnProperty(key)) {
        var obj = paramsWin[key];
        test.assertEquals((collector[1].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// OMG Feed

  casper.thenClick(x(pages.xpathOmg), function (){
    test.assertTitle((pages.titleOmg), 'assert title matches ' + pages.titleOmg);
    for (var key in paramsOmg) {
      if (paramsOmg.hasOwnProperty(key)) {
        var obj = paramsOmg[key];
        test.assertEquals((collector[2].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// CUTE Feed

  casper.thenClick(x(pages.xpathCute), function (){
    test.assertTitle((pages.titleCute), 'assert title matches ' + pages.titleCute);
    for (var key in paramsCute) {
      if (paramsCute.hasOwnProperty(key)) {
        var obj = paramsCute[key];
        test.assertEquals((collector[3].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// FAIL Feed

  casper.thenClick(x(pages.xpathFail), function (){
    test.assertTitle((pages.titleFail), 'assert title matches ' + pages.titleFail);
    for (var key in paramsFail) {
      if (paramsFail.hasOwnProperty(key)) {
        var obj = paramsFail[key];
        test.assertEquals((collector[4].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// WTF Feed

  casper.thenClick(x(pages.xpathWtf), function (){
    test.assertTitle((pages.titleWtf), 'assert title matches ' + pages.titleWtf);
    for (var key in paramsWtf) {
      if (paramsWtf.hasOwnProperty(key)) {
        var obj = paramsWtf[key];
        test.assertEquals((collector[5].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.then(checkenv);

// ===========================================================
// Trending Feed

  casper.thenClick(x(pages.xpathTrending), function (){
    test.assertTitle((pages.titleTrending), 'assert title matches ' + pages.titleTrending);
    for (var key in paramsTrending) {
      if (paramsTrending.hasOwnProperty(key)) {
        var obj = paramsTrending[key];
        test.assertEquals((collector[6].indexOf(obj) > -1), true, obj + ' check');
      }
    }
  });

  casper.run(function(){
    test.done();
  });
});