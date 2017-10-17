const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');

const mongodb = require('./mongodb')

app.use(bodyParser.json());
app.use('/', express.static('frontend'));

app.post('/initial-tweet', async (req, res) => {
  const userId = req.body.userId;
  let tweet;
  try {
    tweet = await mongodb.selectTweetForUser('abcdefghijkl1');
  } catch (hi) {
    console.log(hi);
  }
  console.log(...tweet);
  res.send(...tweet);
});

app.post('/save-choice', (req, res) => {
  const userId = req.body.userId;
  const tweetId = req.body.tweetId;
  const choice = req.body.choice; // 1 or 0 or -1
  sleep(1000);
  if (choice === 1) {
    res.send(selectTweet());
  } else if (choice === 0) {
    res.send(selectTweet());
  } else if (choice === -1) {
    res.send(selectTweet());
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
    mongodb.connectToServer( function( err ) {
        app.listen(4000, _ => console.log('APP IS LISTENING: http://localhost:4000'));
    } );
}