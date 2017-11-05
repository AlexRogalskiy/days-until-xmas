const moment = require('moment');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.handler = (event, context, callback) => {
  console.log('starting function with event:', JSON.stringify(event));
  moment.locale('de');

  const today = moment().startOf('day');
  let year = moment().year();
  if (moment().isAfter(year + '-12-24T23:59:59')) {
    year++;
  }
  const xmas = moment(year + '-12-24').startOf('day');
  const days = xmas.diff(today, 'days');
  console.log('days until xmas: ' + days);

  let status = '';
  if (days === 0) {
    status = 'Merry #XMAS everyone! 🎄🎅';
  } else if (days === 1) {
    status = 'Only 1 day until #xmas! 🎄🎅';
  } else {
    status = 'Only ' + days + ' days until #xmas! 🎄🎅';
  }
  // console.log({status});

  client.post('statuses/update', {status}, (error, tweet, response) => {
    if (error) {
      callback(error);
    }
    console.log('Tweeted: ' + JSON.stringify(tweet));
  });

};
