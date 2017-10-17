const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');

const mongodb = require('./mongodb');

app.use(bodyParser.json());
app.use('/', express.static('frontend'));

app.post('/initial-tweet', async (req, res) => {
  let tweets;
  try {
    tweets = await mongodb.selectTwoTweets(req.body.userId);
  } catch (error) {
    res.writeHead(500, { 'Message': 'couldn\'t get two tweets for some reason!' });
    res.end();
    return;
  }
  
  res.send(tweets);
});

app.post('/save-choice', async (req, res) => {
  mongodb.addVote(
    req.body.tweetId, 
    req.body.choice, 
    req.body.userId
  );

  let tweets;
  try {
    tweets = await mongodb.selectTwoTweets(req.body.userId);
  } catch (error) {
    res.writeHead(500, { 'Message': 'couldn\'t get two tweets for some reason!' });
    res.end();
    return;
  }
  res.send(tweets);
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