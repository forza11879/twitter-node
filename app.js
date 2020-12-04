import express from 'express';
import { createServer } from 'http';
import socketio from 'socket.io';
import path from 'path';
import dotnev from 'dotenv';
import cors from 'cors';
import { stream } from './uitls/twitter.js';

// routes
import twitterRoute from './routes/tweetss.js';

dotnev.config({ path: './config/dev.env' });

const app = express();
const server = createServer(app);
const io = socketio(server);

app.use(cors());
app.use(bodyParser.json());

// Mount Rout
app.use('/twitter', twitterRoute);
// require('./routes/tweets.js')(app, io);

const port = process.env.PORT;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

server.listen(port, function () {
  console.log(`Server is up on port ${port}`);
});

app.locals.searchTerm = 'JavaScript'; //Default search term for twitter stream.
app.locals.showRetweets = false; //Default

let socketConnection;
let twitterStream;

//Establishes socket connection.
io.on('connection', (socket) => {
  socketConnection = socket;
  stream(app.locals.searchTerm, twitterStream, socketConnection);
  socket.on('connection', () => console.log('Client connected'));
  socket.on('disconnect', () => console.log('Client disconnected'));
});
