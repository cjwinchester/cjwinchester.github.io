var projects = [
   {
        'hed': 'Election results',
        'type': 'web',
        'date': '2014-11-04',
        'url': 'http://dataomaha.com/media/election2014/general/',
        'desc': 'Nebraska 2014 general election returns (<a href="http://blog.dataomaha.com/tarbelling-the-election/">writeup</a>).',
        'collab': '<a href="https://twitter.com/bvankat" target="_blank">@bvankat</a>',
        'tools': ['Tarbell', 'D3']
    },
    {
        'hed': 'Bid problems',
        'date': '2014-05-20',
        'type': 'print',
        'url': 'http://www.omaha.com/news/metro/with-douglas-co-director-under-scrutiny-state-halts-work-on/article_7bc74930-9131-5cdb-97da-0a8ed946f8dc.html?TNNoMobile',
        'desc': 'A county 911 director is investigated for his role in bidding a $10 million state contract.',
        'collab': null,
        'tools': null
    }, 
    {
        'hed': 'Prison scandal',
        'type': 'web',
        'date': '2014-09-28',
        'url': 'http://dataomaha.com/prison',
        'desc': 'A database of prisoners in Nebraska whose sentences were mistakenly cut short.',
        'collab': '<a href="https://twitter.com/bvankat" target="_blank">@bvankat</a> and <a href="https://twitter.com/mattwynn" target="_blank">@mattwynn</a>',
        'tools': 'Django'
    },
    {
        'hed': 'Public pay',
        'type': 'web',
        'date': '2014-03-02',
        'url': 'http://www.dataomaha.com/salaries',
        'desc': 'A database of thousands of public employee salaries in the Omaha metro area.',
        'collab': '<a href="https://twitter.com/bvankat" target="_blank">@bvankat</a> and <a href="https://twitter.com/mattwynn" target="_blank">@mattwynn</a>',
        'tools': 'Django'
    },
    {
        'hed': 'What am I reading?',
        'type': 'web',
        'date': '2013-12-02',
        'url': '/reading',
        'desc': 'Books I\'m cracking.',
        'collab': null,
        'tools': 'Javascript'
    },
    {
        'hed': 'OPPD pay analysis',
        'date': '2014-03-02',
        'type': 'print',
        'url': 'http://www.omaha.com/news/oppd-salaries-perks-keep-staff-from-straying/article_b3ae0ef5-e7cc-5cc9-8eb1-7b01dc09d493.html',
        'desc': 'Taking a closer look at the local electrical utility\'s pay scale.',
        'collab': null,
        'tools': null
    },
    {
        'hed': 'Military surplus data',
        'date': '2014-09-20',
        'type': 'web',
        'url': 'http://www.dataomaha.com/militarysurplus',
        'desc': 'A database of surplus military items transferred to law enforcement agencies in Nebraska and Iowa.',
        'collab': '<a href="https://twitter.com/leahbecerra" target="_blank">@leahbecerra</a>',
        'tools': 'Django'
    },
    {
        'hed': 'Dutch World-Herald',
        'date': '2014-01-06',
        'type': 'web',
        'url': 'http://www.twitter.com/dutchowh',
        'desc': 'A bot that retweets the Omaha World-Herald account &mdash; in Dutch! (<a href="https://github.com/cjwinchester/dutchowh" target="_blank">repo</a>/<a href="http://blog.dataomaha.com/dit-is-een-blogbericht-ja" target="_blank">writeup</a>)',
        'collab': null,
        'tools': 'Python'
    },    
    {
        'hed': 'Minimum wage hike',
        'date': '2014-09-07',
        'type': 'web',
        'url': 'http://www.dataomaha.com/minimumwage',
        'desc': 'A database and analysis of a petition drive to raise the minimum wage.',
        'collab': '<a href="https://twitter.com/mattwynn" target="_blank">@mattwynn</a>',
        'tools': 'Django'
    },
    {
        'hed': 'Nuke plant costs',
        'date': '2014-05-07',
        'type': 'web',
        'url': 'http://dataomaha.com/media/exelon',
        'desc': 'Tracking contractor invoices for the manager of OPPD\'s nuclear plant.',
        'collab': null,
        'tools': 'Javascript'
    },
    {
        'hed': 'The many names of David Ryder',
        'date': '2014-01-12',
        'type': 'web',
        'url': '/z/ryder/',
        'desc': 'A tribute to the greatest space hero this side of Zapp Branagan.',
        'collab': null,
        'tools': 'Javascript'
    },
        {
        'hed': 'Double-dipping',
        'date': '2013-10-06',
        'type': 'print',
        'url': 'http://www.omaha.com/news/more-than-retired-city-of-omaha-employees-return-to-their/article_277a27e3-9c58-5d5c-82f8-b1cc7b774760.html',
        'desc': 'We examined how retired city workers can return to their jobs while drawing a pension.',
        'collab': '<a href="https://twitter.com/mattwynn" target="_blank">@mattwynn</a>',
        'tools': null
    },
    {
        'hed': 'Medicare payments',
        'date': '2014-04-10',
        'type': 'web',
        'url': 'http://dataomaha.com/medicare',
        'desc': 'A database of Medicare payments in Nebraska and Iowa.',
        'collab': '<a href="https://twitter.com/bvankat" target="_blank">@bvankat</a>',
        'tools': 'Django'
    },
    {
        'hed': 'Food in the newsroom',
        'date': '2013-09-10',
        'type': 'web',
        'url': 'http://istherefoodinthenewsroom.us',
        'desc': 'Is there food in the World-Herald newsroom?',
        'collab': null,
        'tools': 'Javascript'
    },
    {
        'hed': 'Analysis: 911 dispatch times',
        'date': '2013-05-05',
        'type': 'print',
        'url': 'http://www.omaha.com/news/vital-time-lost-in-calls-to-sarpy-county-s-center/article_4773a77a-860f-540f-9c6b-766256873340.html?mode=jqm',
        'desc': 'Dispatch times for fire and medical calls lagged in one county we examined.',
        'collab': '<a href="https://twitter.com/roseannmoring" target="_blank">@roseannmoring</a>',
        'tools': null
    },
    {
        'hed': 'USA! USA! USA!',
        'date': '2014-11-19',
        'type': 'web',
        'url': '/z/usa',
        'desc': 'A running tally of where we\'ve lived and visited.',
        'collab': null,
        'tools': ['Inkscape', 'Javascript']
    },
    {
        'hed': 'OPPD\'s energy options',
        'date': '2014-06-09',
        'type': 'web',
        'url': 'http://dataomaha.com/media/oppd-gen/',
        'desc': 'Omaha\'s electrical utility moves away from coal.',
        'collab': null,
        'tools': 'Javascript'
    },
    {
        'hed': 'Battling mental illness',
        'date': '2014-04-22',
        'type': 'print',
        'url': 'http://m.omaha.com/eedition/sunrise/articles/jails-and-ers-new-front-line-in-battling-mental-illness/article_f4852cbe-3b18-5782-aa5a-0c7263d994e4.html?mode=jqm',
        'desc': 'Delving into the problems of an overburdened mental health system.',
        'collab': '<a href="https://twitter.com/roseannmoring" target="_blank">@roseannmoring</a>',
        'tools': null
    },
    {
        'hed': 'Happy Birthday!',
        'date': '2014-12-26',
        'type': 'web',
        'url': 'http://www.codywinchester.com/birthday.html',
        'desc': 'Use this page to wish your loved one a happy birthday. (Hint: Pass his/her name as a URL hash.)',
        'collab': null,
        'tools': 'Javascript'
    },
    {
        'hed': 'Cody Ipsum',
        'date': '2014-06-10',
        'type': 'web',
        'url': 'http://www.codywinchester.com/tools/cody-ipsum/',
        'desc': 'My dummy text generator.',
        'collab': null,
        'tools': 'Javascript'
    }
]