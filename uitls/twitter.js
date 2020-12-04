import Twitter from 'twitter';

let twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// console.log('port: ', process.env.PORT);
// console.log('TWITTER_CONSUMER_KEY: ', process.env.TWITTER_CONSUMER_KEY);
// console.log('TWITTER_CONSUMER_SECRET: ', process.env.TWITTER_CONSUMER_SECRET);
// console.log('port: ', process.env.TWITTER_ACCESS_TOKEN_KEY);
// console.log('port: ', process.env.TWITTER_ACCESS_TOKEN_SECRET);

export const stream = (searchTerm, twitterStream, socketConnection) => {
  console.log('Resuming for ' + searchTerm);
  twitter.stream('statuses/filter', { track: searchTerm }, (stream) => {
    stream.on('data', (tweet) => {
      sendMessage(tweet, socketConnection);
    });

    stream.on('error', (error) => {
      console.log(error);
    });

    twitterStream = stream;
  });
};

/**
 * Emits data from stream.
 * @param {String} msg
 */

const sendMessage = (msg, socketConnection) => {
  if (msg.text.includes('RT')) {
    return;
  }
  socketConnection.emit('tweets', msg);
};
