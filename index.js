const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const pythonShell = require('python-shell');

let userId = 'SuYaVmIwLjsjhwnMIoYhkobxFUZvQXVOXODcL6cYgp4WAX7ZNr';
pythonShell.run('./pickTweet.py', { args: userId }, function(err, ...results) {
  if (err) throw err;

  console.log(JSON.parse(results));
})

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

app.post('/initial-tweet', function(req, res) {
  const userId = req.body.userId;
  sleep(2000);
  res.send(selectTweet());
});

app.post('/save-choice', function(req, res) {
  const userId = req.body.userId;
  const tweetId = req.body.tweetId;
  const choice = req.body.choice; // 1 or 0 or -1
  sleep(2000);
  res.send(selectTweet());
});

app.listen(4000);
console.log('APP IS LISTENING: http://localhost:4000');