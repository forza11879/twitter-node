import Twitter from 'twitter';

let twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

//   app.locals.searchTerm

export const stream = (searchTerm, twitterStream) => {
  console.log('Resuming for ' + searchTerm);
  twitter.stream('statuses/filter', { track: searchTerm }, (stream) => {
    stream.on('data', (tweet) => {
      sendMessage(tweet);
    });

    stream.on('error', (error) => {
      console.log(error);
    });

    twitterStream = stream;
  });
};

export const sendMessage = (msg, socketConnection) => {
  if (msg.text.includes('RT')) {
    return;
  }
  socketConnection.emit('tweets', msg);
};
