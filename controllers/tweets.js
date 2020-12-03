import { stream } from '../uitls/twitter.js';

let twitterStream;
//    Resumes the twitter stream.
export const getResume = (req, res) => {
  console.log('Resume');
  stream(req.app.locals.searchTerm, twitterStream);
};

// Sets search term for twitter stream.
export const setSearchTerm = (req, res) => {
  let { term } = req.body;
  req.app.locals.searchTerm = term;
  twitterStream.destroy();

  stream(req.app.locals.searchTerm, twitterStream);
};
// Pauses the twitter stream.
export const getPause = (req, res) => {
  console.log('Pause');
  twitterStream.destroy();
};
