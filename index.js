const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
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
  let randomStatus = sampleTweets[randomNumber()];
  return JSON.parse(randomStatus);
}
function selectTweetQuote() {
  const sampleTweets = fs.readFileSync('./sample-tweets-quotes.json.txt', 'UTF-8').toString().split('\n');
  let randomStatus = sampleTweets[randomNumber()];
  return JSON.parse(randomStatus);
}
function selectTweetReplies() {
  const sampleTweets = fs.readFileSync('./sample-tweets-replies.json.txt', 'UTF-8').toString().split('\n');
  let randomStatus = sampleTweets[randomNumber()];
  return JSON.parse(randomStatus);
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

if (process.argv[2] === "prod" || process.argv[2] === "production") {
  let privateKey = fs.readFileSync('/etc/letsencrypt/live/arasense.net/privkey.pem', 'utf-8');
  let certificate = fs.readFileSync('/etc/letsencrypt/live/arasense.net/fullchain.pem', 'utf-8');
  
  https.createServer({
    key: privateKey,
    cert: certificate
  }, app).listen(443);
  
  
  // redicrects users that are on http to https
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<script>window.location = "https://arasense.net"</script>')
    return res.end();
  }).listen(80);
} else {
  app.listen(4000, _ => console.log('APP IS LISTENING: http://localhost:4000'));
}