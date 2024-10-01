#!/usr/bin/env python3

import http.server
import ssl
import socketserver

# Define the port to listen on
PORT = 443

# Use the http.server's SimpleHTTPRequestHandler to serve files from the current directory
Handler = http.server.SimpleHTTPRequestHandler

# Create the socket server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    # Wrap the server socket with SSL
    httpd.socket = ssl.wrap_socket(httpd.socket,
                                   certfile="./localhost.pem",  # Path to the certificate
                                   keyfile="./localhost-key.pem",  # Path to the private key
                                   server_side=True)
    print(f"Serving HTTPS on port {PORT}")
    # Start the server
    httpd.serve_forever()
