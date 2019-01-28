const express = require('express'),
      server = express(),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(port);
console.log('Topic server started on:', port);

const routes = require('./routes');
routes(server); //register the route
