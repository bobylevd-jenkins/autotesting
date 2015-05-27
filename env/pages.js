var pages = {
  index : {
    url : 'index',
    title : 'BuzzFeed',
    xpath : '//*[@id="page-header"]/div[1]/h1/a',
    binder : {
      v51 : '',
      v52 : '',
      v53 : ''
    }
  },
  lol : {
    url : 'lol',
    title : 'LOL Feed (lol) on BuzzFeed',
    xpath : '//*[@id="page-header"]/div[1]/ul/li[1]/a',
    binder : {
      v51 : 'v51=home%3Aheader',
      v52 : 'v52=badge%2Flol',
      v53 : 'v53=%28no%20label%29'
    }
  },
  win : {
    url : 'win',
    title : 'WIN Feed (win) on BuzzFeed',
    xpath : '//*[@id="page-header"]/div[1]/ul/li[2]/a',
    binder : {
      v51 : 'v51=home%3Aheader',
      v52 : 'v52=badge%2Fwin',
      v53 : 'v53=%28no%20label%29'
    }
  },
  omg : {
    url : 'omg',
    title : 'OMG Feed (omg) on BuzzFeed',
    xpath : '//*[@id="page-header"]/div[1]/ul/li[3]/a',
    binder : {
      v51 : 'v51=home%3Aheader',
      v52 : 'v52=badge%2Fomg',
      v53 : 'v53=%28no%20label%29'
    }
  },
  cute : {
    url : 'cute',
    title : 'Cute Feed (cute) on BuzzFeed',
    xpath : '//*[@id="page-header"]/div[1]/ul/li[4]/a',
    binder : {
      v51 : 'v51=home%3Aheader',
      v52 : 'v52=badge%2Fcute',
      v53 : 'v53=%28no%20label%29'
    }
  },
  fail : {
    url : 'fail',
    title : 'Fail Feed (fail) on BuzzFeed',
    xpath : '//*[@id="page-header"]/div[1]/ul/li[5]/a',
    binder : {
      v51 : 'v51=home%3Aheader',
      v52 : 'v52=badge%2Ffail',
      v53 : 'v53=%28no%20label%29'
    }
  },
  wtf : {
    url : 'wtf',
    title : 'WTF Feed (wtf) on BuzzFeed',
    xpath : '//*[@id="page-header"]/div[1]/ul/li[6]/a',
    binder : {
      v51 : 'v51=home%3Aheader',
      v52 : 'v52=badge%2Fwtf',
      v53 : 'v53=%28no%20label%29'
    }
  },
  trending : {
    url : 'trending',
    title : 'Trending On BuzzFeed',
    xpath : '//*[@id="page-header"]/div[1]/ul/li[7]/a',
    binder : {
      v51 : 'v51=home%3Aheader',
      v52 : 'v52=badge%2Ftrending',
      v53 : 'v53=%28no%20label%29'
    }
  }
};
module.exports = pages;

