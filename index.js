const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use('/', express.static('frontend'));

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}
function randomNumber() {
  return Math.floor(Math.random() * (4 - 0) + 0);
}
function selectTweet() {
  const sampleTweets = fs.readFileSync('sample-tweets.json.txt', 'UTF-8').toString().split('\n');
  return JSON.parse(sampleTweets[randomNumber()]);
}
function selectTweetQuote() {
  const sampleTweets = fs.readFileSync('./sample-tweets-quotes.json.txt', 'UTF-8').toString().split('\n');
  return JSON.parse(sampleTweets[randomNumber()]);
}
function selectTweetReplies() {
  const sampleTweets = fs.readFileSync('./sample-tweets-replies.json.txt', 'UTF-8').toString().split('\n');
  return JSON.parse(sampleTweets[randomNumber()]);
}

app.post('/initial-tweet', (req, res) => {
  const userId = req.body.userId;
  sleep(1000);
  res.send(selectTweetQuote());
});

app.post('/save-choice', (req, res) => {
  const userId = req.body.userId;
  const tweetId = req.body.tweetId;
  const choice = req.body.choice; // 1 or 0 or -1
  sleep(1000);
  if (choice === 1) {
    res.send(selectTweet());
  } else if (choice === 0) {
    res.send(selectTweetQuote());
  } else if (choice === -1) {
    res.send(selectTweetReplies());
  }
});

app.listen(4000, _ => console.log('APP IS LISTENING: http://localhost:4000'));