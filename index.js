const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use('/', express.static('frontend'));

const sampeTweets = fs.readFileSync('sample-tweets.json.txt', 'UTF-8');
// let arrayOfJsons = sampeTweets.split('\n');
// console.log(JSON.parse(arrayOfJsons[0]));

app.post('/initial-tweet', function(req, res) {
  const userId = req.body.userId;
  let newTweet = selectNextTweetCarefully(userId);
  res.send(newTweet);
});

app.post('/save-choice', function(req, res) {
  const userId = req.body.userId;
  const tweetId = req.body.tweetId;
  const choice = req.body.choice; // 1 or 0 or -1
  
  let newTweet = {
    img: 'http://placehold.it/48',
    name: 'سالم فلطة',
    username: 'ok_nice@',
    body: 'إعلان لصابون #دوف يظهر إمرأة سمراء البشرة و ملابس غامقة تتحول إليّ إمرأة بيضاء بعد استعمال منتجاتهم !تعليقكم ؟ كيف ترون الفكرة ؟',
  };
  const sampeTweets = fs.readFileSync('sample-tweets.json.txt', 'UTF-8');
  let arrayOfJsons = sampeTweets.split('\n');
  console.log(req.body.choice);
  res.send(JSON.parse(arrayOfJsons[2]));
});

function selectNextTweetCarefully(userId) {
  return {
    hi: 'hello'
  };
}

app.listen(4000);
console.log('APP IS LISTENING: http://localhost:4000');