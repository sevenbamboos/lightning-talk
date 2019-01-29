const express = require('express'),
      server = express(),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(port);
console.log('Topic server started on:', port);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const routes = require('./routes');
routes(server); //register the route
