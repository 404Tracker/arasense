#!/usr/bin/python
import sys
import json

userIdPassedFromNode = sys.argv[1]

# You can then print your data back like the following code for example

data = [ { 'a' : 1, 'b' : 2, 'c' : 3, 'd' : 4, 'e' : 5 } ]

print json.dumps(data)
