const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const ck = require('ckey');
// routes
// const twitterRoute = require('./routes/tweetss.js');
const port = process.env.PORT || 3001;
const app = express();

// dotenv.config({ path: './config/dev.env' });
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// require('dotenv').config({ path: require('find-config')('.env') });

const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// twitterRoute(app, io);
require('./routes/tweetsss.js')(app, io);

server.listen(port, () => {
  console.log('server is up', port);
});
