const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');

const collectIP = require('./ip').collectIP;
const mongodb = require('./mongodb');

app.use(bodyParser.json());

app.post('/initial-tweet', async (req, res) => {
  let tweet;
  try {
    tweet = await mongodb.selectTweet(req.body.userId);
  } catch (error) {
    res.writeHead(500, { 'Message': 'couldn\'t get tweet for some reason!' });
    res.end();
    return;
  }
  
  res.send(tweet);
});

app.post('/save-choice', async (req, res) => {
  
  let tweet;
  try {
    let { result } = await mongodb.addVote(
      req.body.tweetId,
      req.body.choice, 
      req.body.userId,
      req.body.device,
      collectIP(req.connection.remoteAddress)
    );

    console.log(result.nModified + " document(s) updated \n\ttweetId: ",req.body.tweetId,"\n\tvote: ",req.body.choice,"\n\t source: ",req.body.userId);
    
    tweet = await mongodb.selectTweet(req.body.userId);
  } catch (error) {
    res.writeHead(500, { 'Message': 'couldn\'t get tweet for some reason!' });
    res.end();
    return;
  }
  
  res.send(tweet);
});

app.post('/tweets-count', async (req, res) => {
  let count;
  try {
    count = await mongodb.getVotesCount(req.body.userId);
  } catch (error) {
    res.writeHead(500, { 'Message': 'couldn\'t get tweet for some reason!' });
    res.end();
    return;
  }
  
  res.send(JSON.stringify(count));
});

if (process.argv[2] === "prod" || process.argv[2] === "production") {
  // optimize frontend assets for production
  let gulp = require('gulp');
  require('./gulpfile');
  if (gulp.tasks.default) {
    gulp.start('default');
    app.use('/', express.static('frontend/build/'));
  } else {
    app.use('/', express.static('frontend/'));
  }

  mongodb.connectToServer( function( err ) {
      app.listen(80, _ => console.log('\n✓ APP IS LISTENING: http://arasense.net\n'));
  } );

} else {
  app.use('/', express.static('frontend/'));
  mongodb.connectToServer( function( err ) {
      app.listen(4000, _ => console.log('\n✓ APP IS LISTENING: http://localhost:4000\n'));
  } );
}


process.on('SIGINT', function() {
  if (mongodb.getDb())
    mongodb.getDb().close();
    process.exit();
});