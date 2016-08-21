---
layout: post
title: "Gist curlin'"
date: 2016-03-09 12:34:59 -0600
tags: ["gist", "sh"]
hedhighlight: blog
---

A shell script to bump a local markdown file into a new GitHub gist. (Assumes you have a local file called `test.md` and a GitHub [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) stashed as an environmental variable.)

{% highlight shell %}
file_contents=$(cat test.md); \
curl -u cjwinchester:$GITHUB_TOKEN -X POST \
-d '{ "files": { "test.md": { "content": "'"$(echo $file_contents)"'" } }, "description": "testing the gist endpoint here do not mind me", "public": true }' \
https://api.github.com/gists
{% endhighlight %}
