#!/usr/bin/env python

import cgi, cgitb, pandas as pd

print "Content-type: text/html"
print ""

postData = cgi.FieldStorage()
post = postData.value
#post = post.JSONEncoder()

print post
#print len(post) #','.join(post)