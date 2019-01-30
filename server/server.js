const express = require('express'),
      server = express(),
      bodyParser = require('body-parser'),
      routes = require('./routes'),
      port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

server.use((req, _, next) => {
  req.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  req.browser = require('browser-detect')(req.headers['user-agent']);
  console.log(`[inbound] ip ${req.ip}; host ${req.hostname}; browser ${req.browser.name}`);
  next();
});

routes(server);

server.listen(port);
console.log('Topic server started on:', port);
