const express = require('express');
const app = express();

app.get('/', function(req, res) {
  /**
   * Here we will send the actual frontend ( index.html and its css with some js ) for the browser to run the app
   * but right now it is just a Hello Planet text that we are sending
   */
  res.send('<center>Hello Planet</center>')
});

app.post('/save-tweet', function(req, res) {
  /**
   * Here we will save tweet and some analysis should be done to the variable "req" to extract posted data
   */
});

app.get('/get-new-tweet', function(req, res) {
  /**
   * Here I will call your function that you will write and pass "req" to it and I should get a new tweet
   * 
   * maybe like so
   * 
   * let newTweetToShowItToUser = selectNextTweetCarefully(req);
   * 
   * your function is selectNextTweetCarefully
   */
});


function selectNextTweetCarefully(req) {

}

app.listen(4000);
console.log('APP IS LISTENING: http://localhost:4000');