#!/usr/bin/env python2.7

import rospy, os, ssl
#from http.server import HTTPServer, SimpleHTTPRequestHandler
import SimpleHTTPServer

def kill():
    os.system("kill -KILL " + str(os.getpid()))

os.chdir("/home/amigos/ros/src/opust_monitor/topic_server")
host = 'localhost'
port = 8000
#httpd = HTTPServer(("", port), SimpleHTTPRequestHandler)
print("serving at port", port)
#httpd.serve_forever()

rospy.init_node("webserver")
rospy.on_shutdown(kill)
SimpleHTTPServer.test()
